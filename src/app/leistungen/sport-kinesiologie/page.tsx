import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { heroImages } from "@/data/heroImages";
import { editorialQuotes } from "@/data/editorial";
import { wpOct2022 } from "@/data/wpOct2022Imagery";
import { PageHero } from "@/components/layout/PageHero";
import { CtaStrip } from "@/components/layout/CtaStrip";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { EditorialQuoteBand } from "@/components/editorial/EditorialQuoteBand";
import { EmotionalSection } from "@/components/editorial/EmotionalSection";

export const metadata: Metadata = {
  title: "Sport-Kinesiologie",
  description: pages.sport.lead.slice(0, 160),
};

export default function SportKinesiologiePage() {
  const p = pages.sport;
  return (
    <>
      <PageHero
        eyebrow={p.sub}
        title={p.h1}
        subtitle="Leistung, Regeneration und ganzheitliche Balance im Sport."
        imageSrc={heroImages.sportKinesiologie.src}
        imageAlt={heroImages.sportKinesiologie.alt}
        imageClassName="object-cover object-[50%_45%]"
        contentAlign="right"
        priority
      />

      <CtaStrip
        lead="Im Sport zählen Körper, Kopf und Regeneration — Sport-Kinesiologie begleitet dich, wenn du Leistung und Wohlbefinden zusammenbringen willst."
        sub="Online Termin buchen — oder mich direkt anrufen."
      />

      <EditorialQuoteBand
        quote={editorialQuotes.sportAthlete}
        imageSrc={wpOct2022.sportBewegung}
        imageAlt="Bewegung und Sport — Sport-Kinesiologie"
        parallax="strong"
      />

      <EmotionalSection variant="dawn" className="py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-wide)]">
          <SectionReveal>
            <p className="section-eyebrow">Ganzheitlich</p>
            <h2 className="section-title mt-2 max-w-[28ch]">{p.leadTitle}</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-ink-muted">{p.lead}</p>
          </SectionReveal>

          <SectionReveal delay={0.08} className="mt-20 md:mt-28">
            <div className="grid gap-20 md:grid-cols-2 md:gap-16 lg:gap-24">
              <article className="flex flex-col">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-[28px] bg-[#f5f5f7] shadow-[0_2px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={wpOct2022.sportSchwerpunkteA}
                        alt="Praxis DEINE QUELLE — Bewegung und Sport"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[22px] bg-[#f5f5f7] ring-1 ring-black/[0.05]">
                    <div className="relative aspect-[16/11] w-full">
                      <Image
                        src={wpOct2022.sportSchwerpunkteB}
                        alt="Claudia Dimmler — Sport-Kinesiologie"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  </div>
                </div>
              </article>

              <article className="flex flex-col justify-center">
                <div className="rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6] p-7 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_8px_32px_-12px_rgba(89,94,73,0.1)] md:p-8">
                  <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                    Schwerpunkte
                  </h3>
                  <ul className="mt-6 space-y-3.5 border-t border-[#ebe3db]/90 pt-6" role="list">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-[15px] leading-[1.6] text-ink-muted md:text-[1.0625rem] md:leading-[1.62]"
                      >
                        <span
                          className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/80"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand px-8 text-[15px] font-semibold text-white shadow-[0_8px_30px_-8px_rgba(89,94,73,0.4)] transition duration-200 hover:bg-brand-hover"
                  >
                    Termin buchen
                  </Link>
                  <Link
                    href="/leistungen/kinesiologie"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-black/12 bg-white/90 px-8 text-[15px] font-semibold text-ink backdrop-blur-sm transition duration-200 hover:border-brand-extra hover:bg-brand-secondary/35"
                  >
                    Zur Kinesiologie
                  </Link>
                </div>
              </article>
            </div>
          </SectionReveal>
        </div>
      </EmotionalSection>
    </>
  );
}
