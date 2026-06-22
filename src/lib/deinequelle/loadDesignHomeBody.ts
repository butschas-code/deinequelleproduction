import { readFileSync } from "node:fs";
import path from "node:path";
import { site } from "@/data/site";

type LoadDesignHomeBodyOptions = {
  /** Replaces the main #hero image (desktop + mobile) for review clones only. */
  heroImageSrc?: string;
  /**
   * Prefix relative `images/…` asset paths with `/` so nested routes
   * (e.g. /hero-review/[slug]) resolve the same as the homepage.
   */
  absoluteAssetPaths?: boolean;
};

function normalizeDesignAssetPaths(html: string) {
  return html
    .replace(/src="images\//g, 'src="/images/')
    .replace(/srcset="images\//g, 'srcset="/images/');
}

export function loadDesignHomeBody(options: LoadDesignHomeBodyOptions = {}) {
  const sourcePath = path.join(
    process.cwd(),
    "src/content/deinequelle-design/index.html",
  );
  const html = readFileSync(sourcePath, "utf8");
  const body = html.match(/<body[^>]*>([\s\S]*?)<script>/)?.[1];

  if (!body) {
    throw new Error("Could not load DeineQuelle design body.");
  }

  const bookingAttrs = `href="${site.bookingUrl}" target="_blank" rel="noopener noreferrer"`;

  const ghostAnchor = "__GHOST_KINESIOLOGIE__";

  const stripSection = (source: string, id: string) => {
    const start = source.indexOf(`<section id="${id}"`);
    if (start === -1) return source;
    const end = source.indexOf("</section>", start);
    if (end === -1) return source;
    return source.slice(0, start) + source.slice(end + "</section>".length);
  };

  const cleanedBody = stripSection(
    body.replace(/\s*<p class="hero-location"[^>]*>[\s\S]*?<\/p>/g, ""),
    "schritte",
  );

  let result = cleanedBody
    .replace('href="#kinesiologie" class="btn-ghost"', `href="${ghostAnchor}" class="btn-ghost"`)
    .replace('href="#" class="nav-logo-link"', 'href="/" class="nav-logo-link"')
    .replace(/images\/Logo\/Deine%20Quelle%20logo%206-2\.png/g, site.logo.src)
    .replace(/href="#kinesiologie"/g, 'href="/leistungen/kinesiologie"')
    .replace(/href="#kinderwunsch"/g, 'href="/leistungen/kinderwunsch"')
    .replace(/href="#yoga"/g, 'href="/leistungen/yoga"')
    .replace(/href="#claudia"/g, 'href="/ueber-mich"')
    .replace(/href="#cta-final"/g, bookingAttrs)
    .replace('href="#" class="btn btn-sage', 'href="/leistungen/kinesiologie" class="btn btn-sage')
    .replace('href="#" class="btn btn-wine', 'href="/leistungen/kinderwunsch" class="btn btn-wine')
    .replace('href="#" class="btn btn-accent', 'href="/leistungen/yoga" class="btn btn-accent')
    .replace('href="#" class="btn-dark"', `${bookingAttrs} class="btn-dark"`)
    .replace(/href="tel:\+41764138050"/g, `href="tel:${site.phoneTel}"`)
    .replace(/href="mailto:info@deinequelle.com"/g, `href="mailto:${site.email}"`)
    .replace(/076 413 80 50/g, site.phone)
    .replace(/info@deinequelle.com/g, site.email)
    .replace('href="#impressum"', 'href="/impressum"')
    .replace(`href="${ghostAnchor}" class="btn-ghost"`, 'href="#kinesiologie" class="btn-ghost"');

  if (options.absoluteAssetPaths) {
    result = normalizeDesignAssetPaths(result);
  }

  if (options.heroImageSrc) {
    const heroImage = options.heroImageSrc;
    result = result
      .replace(/srcset="\/images\/hero\/home-hero-mobile\.jpg"/g, `srcset="${heroImage}"`)
      .replace(/srcset="images\/hero\/home-hero-mobile\.jpg"/g, `srcset="${heroImage}"`)
      .replace(/src="\/images\/hero\/home-hero-new\.jpg"/g, `src="${heroImage}"`)
      .replace(/src="images\/hero\/home-hero-new\.jpg"/g, `src="${heroImage}"`);
  }

  return result;
}

export function splitDesignChrome(body: string) {
  const navClose = body.indexOf("</nav>");
  if (navClose === -1) {
    throw new Error("Could not split DeineQuelle design chrome.");
  }

  const splitAt = navClose + "</nav>".length;
  return {
    chrome: body.slice(0, splitAt),
    content: body.slice(splitAt),
  };
}
