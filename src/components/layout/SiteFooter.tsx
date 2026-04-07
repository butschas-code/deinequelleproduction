import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

const legal = [
  { href: "/impressum", label: "Impressum" },
  { href: "/agb", label: "AGB" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/ethik", label: "Schweigepflicht & Ethik" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-0">
      <div className="border-t border-black/[0.06] bg-paper-2">
        <div className="page-gutter mx-auto grid w-full max-w-[var(--layout-max)] gap-12 py-14 sm:gap-14 sm:py-16 md:grid-cols-2">
          <div>
            <Link
              href="/"
              className="mb-8 flex max-w-full items-center gap-3 focus-visible:outline-offset-4 md:gap-3.5"
            >
              <Image
                src={site.logo.src}
                alt=""
                width={site.logo.width}
                height={site.logo.height}
                aria-hidden
                className="h-11 w-auto shrink-0 object-contain md:h-[3.25rem]"
                sizes="(max-width: 768px) 130px, 150px"
              />
              <span className="min-w-0">
                <span className="block text-lg font-semibold tracking-[-0.02em] text-ink md:text-xl">
                  {site.name}
                </span>
                <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.28em] text-brand-complimentary">
                  {site.tagline}
                </span>
              </span>
            </Link>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">Praxis &amp; Kontakt</h2>
            <address className="mt-6 not-italic text-[15px] leading-relaxed text-ink-muted">
              <p className="font-semibold text-ink">{site.practitioner}</p>
              <p className="mt-1">{site.name}</p>
              <p className="mt-1">{site.address.street}</p>
              <p>
                {site.address.postalCode} {site.address.locality}
              </p>
              <p className="mt-5">
                <a className="text-ink underline decoration-black/20 underline-offset-2 transition hover:decoration-brand" href={`tel:${site.phoneTel}`}>
                  {site.phone}
                </a>
              </p>
              <p>
                <a
                  className="text-ink underline decoration-black/20 underline-offset-2 transition hover:decoration-brand"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </p>
              <p className="mt-1">
                <a
                  className="text-ink underline decoration-black/20 underline-offset-2 transition hover:decoration-brand"
                  href={`mailto:${site.emailAlt}`}
                >
                  {site.emailAlt}
                </a>
              </p>
            </address>
            <a
              href={site.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover"
            >
              Route planen
            </a>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-muted">{site.transit}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">Standort</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-black/[0.08] shadow-[var(--shadow-lg)]">
              <iframe
                title="Karte: DEINE QUELLE, Adligenswil"
                src={site.mapsEmbedUrl}
                className="aspect-[4/3] min-h-[220px] w-full grayscale-[15%] contrast-[0.97] sm:aspect-auto sm:h-72 sm:min-h-0 md:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand text-white">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)] py-8 sm:py-10">
          <div className="flex flex-col gap-1 text-[14px] font-medium sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2 sm:text-[13px]">
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex min-h-[44px] items-center py-1 text-white/85 transition hover:text-white sm:min-h-0 sm:py-0"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-xs leading-relaxed text-white/65">
            {site.practitioner} · {site.address.street} · {site.address.postalCode} {site.address.locality}
            <br />
            {site.phone} · {site.emailAlt} · {site.url.replace("https://", "www.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
