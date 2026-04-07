import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { pages } from "@/data/pages";
import { heroImages } from "@/data/heroImages";
import { PageHero } from "@/components/layout/PageHero";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { EmotionalSection } from "@/components/editorial/EmotionalSection";

const d = pages.documents;

export const metadata: Metadata = {
  title: "Kontakt & Infos",
  description: `Kontakt ${site.practitioner} — ${site.address.formatted}. Sitzungen, Tarife, Krankenkasse, Anfahrt und Dokumente.`,
};

const cardClass =
  "rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6] p-7 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_8px_32px_-12px_rgba(89,94,73,0.1)] md:p-8";

export default function KontaktPage() {
  const p = pages.infos;

  return (
    <>
      <PageHero
        eyebrow="Praxis"
        title="Kontakt & Infos"
        subtitle={`${site.contactChannels} — Sitzungen, Tarife, Krankenkasse, Anfahrt und Downloads.`}
        imageSrc={heroImages.kontakt.src}
        imageAlt={heroImages.kontakt.alt}
        imageClassName="object-cover object-[50%_45%]"
        contentAlign="right"
        priority
      />

      <EmotionalSection variant="dawn" className="py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-wide)]">
          <SectionReveal>
            <p className="section-eyebrow">Erreichbarkeit</p>
            <h2 className="section-title mt-2 max-w-[28ch]">So erreichst du mich</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-ink-muted">{site.responseExpectation}</p>
          </SectionReveal>

          <SectionReveal delay={0.08} className="mt-14 md:mt-16">
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <article className={cardClass}>
                <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                  Direkt
                </h3>
                <div className="mt-6 space-y-3 border-t border-[#ebe3db]/90 pt-6 text-[15px] leading-relaxed text-ink-muted md:text-[1.0625rem]">
                  <p>
                    <a className="font-semibold text-brand hover:underline" href={`tel:${site.phoneTel}`}>
                      {site.phone}
                    </a>
                  </p>
                  <p>
                    <a className="font-semibold text-brand hover:underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </p>
                  <p>
                    <a className="font-semibold text-brand hover:underline" href={`mailto:${site.emailAlt}`}>
                      {site.emailAlt}
                    </a>
                  </p>
                </div>
              </article>

              <article className={cardClass}>
                <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                  Termin
                </h3>
                <p className="mt-6 border-t border-[#ebe3db]/90 pt-6 text-[15px] leading-relaxed text-ink-muted md:text-[1.0625rem]">
                  Online-Anmeldung für kinesiologische Termine.
                </p>
                <Link
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand px-8 text-[15px] font-semibold text-white shadow-[0_8px_30px_-8px_rgba(89,94,73,0.4)] transition duration-200 hover:bg-brand-hover"
                >
                  Zum Buchungstool
                </Link>
              </article>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} className="mt-14 md:mt-16">
            <article className={cardClass}>
              <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                Anfahrt
              </h3>
              <p className="mt-6 border-t border-[#ebe3db]/90 pt-6 text-[15px] leading-relaxed text-ink-muted md:text-[1.0625rem] md:leading-[1.62]">
                {site.transit}
              </p>
              <a
                href={site.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full border border-black/12 bg-white/90 px-8 text-[15px] font-semibold text-ink backdrop-blur-sm transition duration-200 hover:border-brand-extra hover:bg-brand-secondary/35"
              >
                Route planen
              </a>
            </article>
          </SectionReveal>
        </div>
      </EmotionalSection>

      <EmotionalSection variant="dawn" className="border-y border-[#ebe3db]/80 py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-wide)]">
          <SectionReveal>
            <p className="section-eyebrow">Ablauf &amp; Formalien</p>
            <h2 className="section-title mt-2 max-w-[32ch]">Praxisinformationen</h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-ink-muted">
              Sitzungsdauer, Tarife, Krankenkasse, Absagen und Zahlung — auf einen Blick.
            </p>
          </SectionReveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:mt-16">
            <SectionReveal delay={0.06} className="h-full">
              <article className={`flex h-full flex-col ${cardClass}`}>
                <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                  {p.sitzungTitle}
                </h3>
                <p className="mt-6 flex-1 border-t border-[#ebe3db]/90 pt-6 text-[15px] leading-[1.65] text-ink-muted md:text-[1.0625rem] md:leading-[1.62]">
                  {p.sitzung}
                </p>
              </article>
            </SectionReveal>

            <SectionReveal delay={0.08} className="h-full">
              <article className={`flex h-full flex-col ${cardClass}`}>
                <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                  {p.krankenkasseTitle}
                </h3>
                <p className="mt-6 border-t border-[#ebe3db]/90 pt-6 text-[15px] leading-[1.65] text-ink-muted md:text-[1.0625rem] md:leading-[1.62]">
                  {p.krankenkasse}
                </p>
                <div className="mt-6 border-t border-[#ebe3db]/90 pt-6">
                  <Image
                    src="/images/legacy/logos/emr-zertifiziert.png"
                    alt="EMR zertifiziert"
                    width={220}
                    height={62}
                    className="opacity-90"
                  />
                </div>
              </article>
            </SectionReveal>

            <SectionReveal delay={0.1} className="h-full">
              <article className={`flex h-full flex-col ${cardClass}`}>
                <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                  {p.absageTitle}
                </h3>
                <p className="mt-6 flex-1 border-t border-[#ebe3db]/90 pt-6 text-[15px] leading-[1.65] text-ink-muted md:text-[1.0625rem] md:leading-[1.62]">
                  {p.absage}
                </p>
              </article>
            </SectionReveal>

            <SectionReveal delay={0.12} className="h-full">
              <article className={`flex h-full flex-col ${cardClass}`}>
                <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                  {p.zahlungTitle}
                </h3>
                <p className="mt-6 flex-1 border-t border-[#ebe3db]/90 pt-6 text-[15px] leading-[1.65] text-ink-muted md:text-[1.0625rem] md:leading-[1.62]">
                  {p.zahlung}
                </p>
              </article>
            </SectionReveal>
          </div>
        </div>
      </EmotionalSection>

      <EmotionalSection variant="mist" className="py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-narrow)]">
          <SectionReveal>
            <article className={cardClass}>
              <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                {p.downloadsTitle}
              </h3>
              <p className="mt-6 border-t border-[#ebe3db]/90 pt-6 text-[15px] text-ink-muted">{p.downloadsIntro}</p>
              <ul className="mt-6 space-y-3.5 text-[15px] md:text-[1.0625rem]" role="list">
                <li className="flex gap-3">
                  <span
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/80"
                    aria-hidden
                  />
                  <a
                    href={d.agb}
                    className="font-medium text-brand underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AGB (PDF)
                  </a>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/80"
                    aria-hidden
                  />
                  <a
                    href={d.impressum}
                    className="font-medium text-brand underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Impressum (PDF)
                  </a>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/80"
                    aria-hidden
                  />
                  <span>
                    <a
                      href={d.ethik}
                      className="font-medium text-brand underline-offset-2 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Schweigepflicht &amp; Ethik-Richtlinien (PDF)
                    </a>
                    <span className="text-ink-muted"> · </span>
                    <Link href="/ethik" className="text-ink-muted underline-offset-2 hover:underline">
                      Seite
                    </Link>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/80"
                    aria-hidden
                  />
                  <span>
                    <a
                      href={d.datenschutz}
                      className="font-medium text-brand underline-offset-2 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Datenschutzerklärung (PDF)
                    </a>
                    <span className="text-ink-muted"> · </span>
                    <Link href="/datenschutz" className="text-ink-muted underline-offset-2 hover:underline">
                      Seite
                    </Link>
                  </span>
                </li>
              </ul>
            </article>
          </SectionReveal>
        </div>
      </EmotionalSection>
    </>
  );
}
