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
  const hasAlpha = Boolean(metadata.hasAlpha);
  const pipeline = sharp(sourcePath).rotate();
  const buffer = hasAlpha
    ? await pipeline.webp({ quality: 88, effort: 5, alphaQuality: 90 }).toBuffer()
    : await pipeline.webp({ quality: 80, effort: 5 }).toBuffer();
  await fs.writeFile(webpPath, buffer);
  const original = (await fs.stat(sourcePath)).size;
  return {
    sourcePath,
    webpPath,
    original,
    webp: buffer.length,
  };
}

const refs = await collectRefs();
const converted = [];
const missing = [];

for (const ref of refs) {
  if (/\.webp$/i.test(ref)) continue;
  const sourcePath = fileFromRef(ref);
  if (!sourcePath) continue;
  if (!(await exists(sourcePath))) {
    missing.push(ref);
    continue;
  }
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
    `${rel}  ${(item.original / 1024).toFixed(0)}KB -> ${(item.webp / 1024).toFixed(0)}KB`,
  );
}
if (missing.length) {
  console.log("\nMissing sources:");
  for (const ref of missing) console.log(ref);
}
