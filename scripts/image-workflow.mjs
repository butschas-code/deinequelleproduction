#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const optimizedRoot = path.join(publicDir, "images", "optimized");
const reportDir = path.join(projectRoot, "reports");
const auditReportPath = path.join(reportDir, "image-audit.json");
const optimizationReportPath = path.join(reportDir, "image-optimization.json");
const manifestPath = path.join(reportDir, "image-manifest.json");

const liveSourceFiles = [
  "src/data/site.ts",
  "src/data/deinequelleDesignPages.ts",
  "src/content/deinequelle-design/index.html",
  "src/lib/seo/jsonld.ts",
  "src/app/(design)/kontakt/page.tsx",
];

const rasterExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const vectorExtensions = new Set([".svg"]);
const widths = [
  { suffix: "sm", width: 640 },
  { suffix: "md", width: 1024 },
  { suffix: "lg", width: 1600 },
  { suffix: "xl", width: 2400 },
];
const minPhotoPsnr = 50;

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unit = units.shift();
  while (size >= 1024 && units.length) {
    size /= 1024;
    unit = units.shift();
  }
  return `${size.toFixed(size >= 10 ? 1 : 2)} ${unit}`;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizeImageRef(rawRef) {
  if (!rawRef) return null;
  let ref = rawRef.trim();
  ref = ref.replace(/^https?:\/\/[^/]+/, "");
  ref = ref.replace(/&quot;.*/, "");
  ref = ref.replace(/[?#].*$/, "");
  if (!ref.includes("images/")) return null;
  const imageIndex = ref.indexOf("images/");
  if (imageIndex >= 0 && !ref.startsWith("/")) {
    ref = `/${ref.slice(imageIndex)}`;
  }
  if (!ref.startsWith("/images/")) return null;
  return decodeURI(ref);
}

async function collectLiveRefs() {
  const refs = new Map();
  const patterns = [
    /["'`]([^"'`]*(?:\/images\/|images\/)[^"'`]*?\.(?:jpe?g|png|webp|gif|svg))["'`]/gi,
    /url\((?:["']?)([^"')]*(?:\/images\/|images\/)[^"')]*?\.(?:jpe?g|png|webp|gif|svg))(?:["']?)\)/gi,
  ];

  for (const relativeFile of liveSourceFiles) {
    const filePath = path.join(projectRoot, relativeFile);
    const source = await fs.readFile(filePath, "utf8");
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(source))) {
        const ref = normalizeImageRef(match[1]);
        if (!ref) continue;
        if (!refs.has(ref)) refs.set(ref, new Set());
        refs.get(ref).add(relativeFile);
      }
    }
  }

  return refs;
}

async function imageInfo(ref, sources = new Set()) {
  const filePath = path.join(publicDir, ref.replace(/^\//, ""));
  const ext = path.extname(filePath).toLowerCase();
  const exists = await fileExists(filePath);
  const stat = exists ? await fs.stat(filePath) : null;
  let metadata = null;
  let error = null;

  if (exists && rasterExtensions.has(ext)) {
    try {
      const { width, height, format, hasAlpha } = await sharp(filePath).metadata();
      metadata = { width, height, format, hasAlpha };
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
    }
  }

  return {
    ref,
    sources: [...sources].sort(),
    ext,
    exists,
    bytes: stat?.size ?? 0,
    size: formatBytes(stat?.size ?? 0),
    kind: rasterExtensions.has(ext)
      ? "raster"
      : vectorExtensions.has(ext)
        ? "vector"
        : "other",
    metadata,
    error,
  };
}

async function audit() {
  const refs = await collectLiveRefs();
  const liveImages = [];
  for (const [ref, sources] of [...refs].sort()) {
    liveImages.push(await imageInfo(ref, sources));
  }

  const allImageFiles = (await walk(path.join(publicDir, "images"))).filter((file) =>
    rasterExtensions.has(path.extname(file).toLowerCase()) &&
    !toPosix(path.relative(path.join(publicDir, "images"), file)).startsWith("optimized/"),
  );
  const allPublicImages = await Promise.all(
    allImageFiles.map(async (file) => {
      const stat = await fs.stat(file);
      return {
        ref: `/${toPosix(path.relative(publicDir, file))}`,
        bytes: stat.size,
        size: formatBytes(stat.size),
      };
    }),
  );
  allPublicImages.sort((a, b) => b.bytes - a.bytes);

  const rasterLiveImages = liveImages.filter((item) => item.kind === "raster" && item.exists);
  const vectorLiveImages = liveImages.filter((item) => item.kind === "vector" && item.exists);
  const missingLiveImages = liveImages.filter((item) => !item.exists);
  const totalPublicBytes = allPublicImages.reduce((sum, item) => sum + item.bytes, 0);
  const totalLiveRasterBytes = rasterLiveImages.reduce((sum, item) => sum + item.bytes, 0);

  const report = {
    generatedAt: new Date().toISOString(),
    scope: {
      note: "Live image references discovered from the current public design pages, shared site data, homepage HTML source, JSON-LD image, and contact page.",
      sourceFiles: liveSourceFiles,
    },
    summary: {
      publicRasterImageCount: allPublicImages.length,
      publicRasterBytes: totalPublicBytes,
      publicRasterSize: formatBytes(totalPublicBytes),
      liveRasterImageCount: rasterLiveImages.length,
      liveRasterBytes: totalLiveRasterBytes,
      liveRasterSize: formatBytes(totalLiveRasterBytes),
      liveVectorImageCount: vectorLiveImages.length,
      missingLiveImageCount: missingLiveImages.length,
    },
    liveImages,
    largestPublicImages: allPublicImages.slice(0, 50),
  };

  await fs.mkdir(reportDir, { recursive: true });
  await fs.writeFile(auditReportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`Public raster images: ${report.summary.publicRasterImageCount} (${report.summary.publicRasterSize})`);
  console.log(`Live raster images: ${report.summary.liveRasterImageCount} (${report.summary.liveRasterSize})`);
  console.log(`Live vector images kept as-is: ${report.summary.liveVectorImageCount}`);
  if (missingLiveImages.length) {
    console.log(`Missing live image references: ${missingLiveImages.length}`);
  }
  console.log(`Audit written to ${path.relative(projectRoot, auditReportPath)}`);

  return report;
}

function outputRefFor(inputRef, suffix) {
  const parsed = path.posix.parse(inputRef);
  return path.posix.join("/images/optimized", parsed.dir.replace(/^\/images\/?/, ""), `${parsed.name}-${suffix}.webp`);
}

async function sourceRefForOptimizedRef(ref) {
  if (!ref.startsWith("/images/optimized/")) return ref;

  const relative = ref
    .replace(/^\/images\/optimized\//, "")
    .replace(/-(?:sm|md|lg|xl)\.webp$/i, "");

  for (const extension of [".png", ".jpg", ".jpeg", ".webp"]) {
    const sourceRef = `/images/${relative}${extension}`;
    if (await fileExists(path.join(publicDir, sourceRef.replace(/^\//, "")))) {
      return sourceRef;
    }
  }

  return null;
}

async function candidateBuffer(inputPath, originalFormat, targetWidth) {
  const pipeline = sharp(inputPath).rotate();
  const metadata = await pipeline.metadata();
  const effectiveWidth = Math.min(metadata.width ?? targetWidth, targetWidth);
  const resized = pipeline.resize({
    width: effectiveWidth,
    withoutEnlargement: true,
  });

  if (originalFormat === "png") {
    return resized.webp({ lossless: true, effort: 6 }).toBuffer();
  }

  return resized.webp({
    quality: 96,
    effort: 6,
    smartSubsample: true,
  }).toBuffer();
}

async function psnrAgainstResizedOriginal(inputPath, candidate, targetWidth) {
  const original = sharp(inputPath).rotate();
  const metadata = await original.metadata();
  const effectiveWidth = Math.min(metadata.width ?? targetWidth, targetWidth);
  const originalRaw = await original
    .resize({ width: effectiveWidth, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const candidateRaw = await sharp(candidate)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const sameDimensions =
    originalRaw.info.width === candidateRaw.info.width &&
    originalRaw.info.height === candidateRaw.info.height &&
    originalRaw.info.channels === candidateRaw.info.channels;

  if (!sameDimensions) {
    return { psnr: 0, width: candidateRaw.info.width, height: candidateRaw.info.height };
  }

  let sumSquares = 0;
  for (let index = 0; index < originalRaw.data.length; index += 1) {
    const delta = originalRaw.data[index] - candidateRaw.data[index];
    sumSquares += delta * delta;
  }

  if (sumSquares === 0) {
    return {
      psnr: Infinity,
      width: candidateRaw.info.width,
      height: candidateRaw.info.height,
    };
  }

  const mse = sumSquares / originalRaw.data.length;
  return {
    psnr: 20 * Math.log10(255 / Math.sqrt(mse)),
    width: candidateRaw.info.width,
    height: candidateRaw.info.height,
  };
}

async function optimize({ dryRun = false } = {}) {
  const auditReport = await audit();
  await fs.mkdir(optimizedRoot, { recursive: true });

  const results = [];
  const liveRasterImagesBySource = new Map();
  for (const item of auditReport.liveImages.filter((image) => image.kind === "raster" && image.exists)) {
    const sourceRef = await sourceRefForOptimizedRef(item.ref);
    if (!sourceRef) continue;
    if (!liveRasterImagesBySource.has(sourceRef)) {
      liveRasterImagesBySource.set(sourceRef, await imageInfo(sourceRef, new Set(item.sources)));
      continue;
    }
    const existing = liveRasterImagesBySource.get(sourceRef);
    existing.sources = [...new Set([...existing.sources, ...item.sources])].sort();
  }
  const liveRasterImages = [...liveRasterImagesBySource.values()];

  for (const item of liveRasterImages) {
    const inputPath = path.join(publicDir, item.ref.replace(/^\//, ""));
    const originalFormat = item.metadata?.format;
    const variants = [];

    for (const variant of widths) {
      const outputRef = outputRefFor(item.ref, variant.suffix);
      const outputPath = path.join(publicDir, outputRef.replace(/^\//, ""));
      const buffer = await candidateBuffer(inputPath, originalFormat, variant.width);
      const quality = await psnrAgainstResizedOriginal(inputPath, buffer, variant.width);
      const smaller = buffer.length < item.bytes;
      const passesQuality =
        originalFormat === "png" ? quality.psnr === Infinity : quality.psnr >= minPhotoPsnr;
      const accepted = smaller && passesQuality;

      if (accepted && !dryRun) {
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, buffer);
      }

      variants.push({
        suffix: variant.suffix,
        requestedWidth: variant.width,
        width: quality.width,
        height: quality.height,
        outputRef,
        bytes: accepted ? buffer.length : null,
        size: accepted ? formatBytes(buffer.length) : null,
        originalBytes: item.bytes,
        originalSize: item.size,
        smaller,
        psnr: quality.psnr === Infinity ? "Infinity" : Number(quality.psnr.toFixed(2)),
        accepted,
        rejectionReason: accepted
          ? null
          : !smaller
            ? "candidate-not-smaller"
            : "quality-gate-failed",
      });

      const status = accepted ? "created" : "skipped";
      console.log(`${status}: ${outputRef} (${accepted ? formatBytes(buffer.length) : "not used"})`);
    }

    results.push({
      ref: item.ref,
      originalBytes: item.bytes,
      originalSize: item.size,
      width: item.metadata?.width,
      height: item.metadata?.height,
      format: item.metadata?.format,
      sources: item.sources,
      variants,
    });
  }

  const acceptedVariants = results.flatMap((item) => item.variants.filter((variant) => variant.accepted));
  const report = {
    generatedAt: new Date().toISOString(),
    dryRun,
    qualityGate: {
      png: "lossless WebP only",
      photos: `PSNR >= ${minPhotoPsnr} dB against the same resized original`,
      note: "A generated file is accepted only when it is smaller than the original and passes the quality gate.",
    },
    summary: {
      processedImages: results.length,
      acceptedVariants: acceptedVariants.length,
      originalLiveRasterBytes: auditReport.summary.liveRasterBytes,
      originalLiveRasterSize: auditReport.summary.liveRasterSize,
    },
    images: results,
  };

  await fs.mkdir(reportDir, { recursive: true });
  await fs.writeFile(optimizationReportPath, `${JSON.stringify(report, null, 2)}\n`);
  if (!dryRun) {
    await fs.writeFile(manifestPath, `${JSON.stringify(report, null, 2)}\n`);
  }

  console.log(`Optimization report written to ${path.relative(projectRoot, optimizationReportPath)}`);
  if (!dryRun) console.log(`Manifest written to ${path.relative(projectRoot, manifestPath)}`);

  return report;
}

const command = process.argv[2] ?? "audit";
const dryRun = process.argv.includes("--dry-run");

if (command === "audit") {
  await audit();
} else if (command === "optimize") {
  await optimize({ dryRun });
} else {
  console.error("Usage: node scripts/image-workflow.mjs <audit|optimize> [--dry-run]");
  process.exitCode = 1;
}
