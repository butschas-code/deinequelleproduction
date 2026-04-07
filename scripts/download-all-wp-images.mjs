#!/usr/bin/env node
/**
 * Lädt alle Bilder aus der WordPress-Mediathek (deinequelle.com) nach
 * public/images/legacy/wp/<Jahr>/<Monat>/… (gleiche Pfade wie unter /wp-content/uploads/).
 *
 * Schreibt anschließend src/data/legacyWpImages.ts (Manifest zum Importieren).
 *
 *   node scripts/download-all-wp-images.mjs
 */
import { createWriteStream, mkdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_ROOT = join(ROOT, "public/images/legacy/wp");
const MANIFEST = join(ROOT, "src/data/legacyWpImages.ts");

const API = "https://deinequelle.com/wp-json/wp/v2/media?per_page=100&page=";

function uploadsRelFromUrl(url) {
  const u = url.replace(/^https?:\/\/[^/]+/i, "");
  const idx = u.indexOf("/uploads/");
  if (idx === -1) return null;
  return u.slice(idx + "/uploads/".length).replace(/^\/+/, "");
}

function escStr(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, " ");
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function main() {
  const entries = [];
  let page = 1;
  for (;;) {
    const data = await fetchJson(API + page);
    if (!data.length) break;
    for (const item of data) {
      const mime = item.mime_type || "";
      if (!mime.startsWith("image/")) continue;
      const url = item.source_url;
      if (!url) continue;
      const rel = uploadsRelFromUrl(url);
      if (!rel) {
        console.warn("skip (no /uploads/):", url);
        continue;
      }
      const alt = (item.title && item.title.rendered) || rel.split("/").pop() || "Bild";
      entries.push({ id: item.id, url, rel, alt });
    }
    if (data.length < 100) break;
    page += 1;
  }

  // Neueste zuerst (wie API), für Manifest umdrehen optional — alphabetisch nach rel für stabile Diffs
  entries.sort((a, b) => a.rel.localeCompare(b.rel, "en"));

  mkdirSync(OUT_ROOT, { recursive: true });
  console.log("Downloading", entries.length, "images…");

  for (const { url, rel } of entries) {
    const dest = join(OUT_ROOT, rel);
    mkdirSync(dirname(dest), { recursive: true });
    if (existsSync(dest)) {
      const st = await import("node:fs/promises").then((fs) => fs.stat(dest));
      if (st.size > 200) {
        continue;
      }
    }
    process.stdout.write(rel + " … ");
    await download(url, dest);
    console.log("ok");
  }

  const lines = [
    "/**",
    " * Alle Bilder aus der WordPress-Mediathek von deinequelle.com (lokal gespiegelt).",
    " * Neu erzeugen: `node scripts/download-all-wp-images.mjs`",
    " */",
    "export const legacyWpImages = [",
  ];
  for (const e of entries) {
    const segs = e.rel.split("/");
    const srcPath = "/images/legacy/wp/" + segs.map(encodeURIComponent).join("/");
    lines.push(`  { id: ${e.id}, src: "${srcPath}", alt: "${escStr(e.alt)}" },`);
  }
  lines.push("] as const;", "", 'export type LegacyWpImage = (typeof legacyWpImages)[number];', "");
  writeFileSync(MANIFEST, lines.join("\n"), "utf8");
  console.log("Wrote", MANIFEST);
  console.log("Done.", entries.length, "entries.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
