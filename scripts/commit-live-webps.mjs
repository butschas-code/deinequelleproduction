#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");

const liveSourceFiles = [
  "src/data/site.ts",
  "src/data/deinequelleDesignPages.ts",
  "src/content/deinequelle-design/index.html",
  "src/lib/seo/jsonld.ts",
  "src/app/(design)/kontakt/page.tsx",
  "src/components/deinequelle/DesignPage.tsx",
  "src/components/deinequelle/DesignNav.tsx",
];

const rasterPattern =
  /(?:\/images\/|images\/)[^"'`)]+?\.(?:jpe?g|png|webp)/gi;

const originalExtensions = [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"];

function toWebpRef(ref) {
  return ref.replace(/\.(jpe?g|png)$/i, ".webp");
}

function fileFromRef(ref) {
  const normalized = ref.startsWith("/images/")
    ? ref.slice(1)
    : ref.startsWith("images/")
      ? ref
      : null;
  if (!normalized) return null;
  return path.join(publicDir, decodeURI(normalized));
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function looksLikeLogo(sourcePath, metadata) {
  const name = sourcePath.toLowerCase();
  if (/logo|brand|label|coin|emr|oda|zertifikat|badge/.test(name)) {
    return true;
  }
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  return Boolean(metadata.hasAlpha) && Math.max(width, height) <= 900;
}

async function findOriginal(webpOrSourcePath) {
  const base = webpOrSourcePath.replace(/\.(jpe?g|png|webp)$/i, "");
  const candidates = [];
  for (const extension of originalExtensions) {
    const candidate = `${base}${extension}`;
    if (await exists(candidate)) candidates.push(candidate);
  }
  if (candidates.length === 0) return null;
  const ranked = await Promise.all(
    candidates.map(async (candidate) => {
      const metadata = await sharp(candidate).metadata();
      const size = (await fs.stat(candidate)).size;
      return {
        candidate,
        pixels: (metadata.width ?? 0) * (metadata.height ?? 0),
        size,
      };
    }),
  );
  ranked.sort((a, b) => b.pixels - a.pixels || b.size - a.size);
  return ranked[0].candidate;
}

async function collectRefs() {
  const refs = new Set();
  for (const relativeFile of liveSourceFiles) {
    const source = await fs.readFile(path.join(projectRoot, relativeFile), "utf8");
    for (const match of source.matchAll(rasterPattern)) {
      refs.add(match[0]);
    }
  }
  return [...refs].sort();
}

async function convertToSiblingWebp(sourcePath) {
  const webpPath = sourcePath.replace(/\.(jpe?g|png)$/i, ".webp");
  const metadata = await sharp(sourcePath).metadata();
  const pipeline = sharp(sourcePath).rotate();
  const buffer = looksLikeLogo(sourcePath, metadata)
    ? await pipeline
        .webp({
          lossless: true,
          effort: 6,
        })
        .toBuffer()
    : await pipeline
        .webp({
          quality: 95,
          alphaQuality: 100,
          effort: 6,
          smartSubsample: false,
        })
        .toBuffer();
  await fs.writeFile(webpPath, buffer);
  const original = (await fs.stat(sourcePath)).size;
  return {
    sourcePath,
    webpPath,
    original,
    webp: buffer.length,
    mode: looksLikeLogo(sourcePath, metadata) ? "lossless" : "q95",
  };
}

const refs = await collectRefs();
const converted = [];
const skipped = [];
const missing = [];

const uniqueSources = new Set();
for (const ref of refs) {
  const livePath = fileFromRef(ref);
  if (!livePath) continue;
  const sourcePath = await findOriginal(livePath);
  if (!sourcePath) {
    missing.push(ref);
    continue;
  }
  if (uniqueSources.has(sourcePath)) continue;
  uniqueSources.add(sourcePath);
  converted.push(await convertToSiblingWebp(sourcePath));
}

for (const relativeFile of liveSourceFiles) {
  const filePath = path.join(projectRoot, relativeFile);
  let source = await fs.readFile(filePath, "utf8");
  const next = source.replace(rasterPattern, (match) =>
    /\.webp$/i.test(match) ? match : toWebpRef(match),
  );
  if (next !== source) {
    await fs.writeFile(filePath, next);
    console.log(`updated ${relativeFile}`);
  }
}

console.log("\nConverted:");
for (const item of converted) {
  const rel = path.relative(projectRoot, item.webpPath);
  console.log(
    `${item.mode.padEnd(9)} ${rel}  ${(item.original / 1024).toFixed(0)}KB -> ${(item.webp / 1024).toFixed(0)}KB`,
  );
}
if (skipped.length) {
  console.log("\nSkipped:");
  for (const item of skipped) console.log(item);
}
if (missing.length) {
  console.log("\nMissing sources:");
  for (const ref of missing) console.log(ref);
}
