import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import { site } from "@/data/site";
import { DeineQuelleDesignRuntime } from "@/components/home/DeineQuelleDesignRuntime";
export const metadata: Metadata = {
  title: "DeineQuelle · Kinesiologie & Yoga · Adligenswil",
  description:
    "Claudia Dimmler begleitet Kinder, Jugendliche und Erwachsene mit Kinesiologie und Yoga in Adligenswil zu mehr innerer Balance.",
};

function loadDesignBody() {
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

  return body
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
    .replace('href="#impressum"', 'href="/impressum"');
}

export default function HomePage() {
  return (
    <>
      <main
        className="deinequelle-design-page"
        dangerouslySetInnerHTML={{ __html: loadDesignBody() }}
      />
      <DeineQuelleDesignRuntime />
    </>
  );
}
