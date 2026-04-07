#!/usr/bin/env node
/**
 * Lädt Legacy-Hintergrundbilder von deinequelle.com (WordPress-Mediathek) nach
 * public/images/legacy/hero-slides/ — nur Asset-Download, kein UI.
 * Filter: DeinQuelle-*, tropfen, bg_home3, DSCN074*, IMG_091*.
 */
import { createWriteStream, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "public/images/legacy/hero-slides");

const BASE = "https://deinequelle.com/wp-json/wp/v2/media?per_page=100&page=";

function pickHeroUrls(items) {
  const out = [];
  for (const item of items) {
    const u = item.source_url;
    const mime = item.mime_type || "";
    if (!u || !mime.startsWith("image/")) continue;
    const fn = u.split("/").pop().toLowerCase();
    if (!fn.match(/\.(jpe?g|webp)$/)) continue;
    if (fn.includes("cropped-tropfen")) continue;
    if (
      fn.includes("tropfen") ||
      fn.includes("bg_home") ||
      fn.includes("deinquelle") ||
      /^dscn074/.test(fn) ||
      /^img_091[89]/.test(fn)
    ) {
      out.push(u);
    }
  }
  return out;
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
  const all = [];
  let page = 1;
  for (;;) {
    const data = await fetchJson(BASE + page);
    if (!data.length) break;
    all.push(...pickHeroUrls(data));
    if (data.length < 100) break;
    page += 1;
  }
  const urls = [...new Set(all)].sort((a, b) => {
    const fa = a.split("/").pop();
    const fb = b.split("/").pop();
    if (fa.includes("tropfen") && !fb.includes("tropfen")) return -1;
    if (fb.includes("tropfen") && !fa.includes("tropfen")) return 1;
    if (fa.includes("bg_home") && !fb.includes("bg_home")) return -1;
    if (fb.includes("bg_home") && !fa.includes("bg_home")) return 1;
    return fa.localeCompare(fb, undefined, { sensitivity: "base" });
  });

  mkdirSync(OUT, { recursive: true });
  console.log("Downloading", urls.length, "files to", OUT);
  for (const url of urls) {
    const name = url.split("/").pop();
    const dest = join(OUT, name);
    if (existsSync(dest)) {
      const st = await import("node:fs/promises").then((fs) => fs.stat(dest));
      if (st.size > 1000) {
        console.log("skip exists", name);
        continue;
      }
    }
    process.stdout.write(name + " … ");
    await download(url, dest);
    console.log("ok");
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
