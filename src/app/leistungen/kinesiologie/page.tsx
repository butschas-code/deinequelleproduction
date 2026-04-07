import type { Metadata } from "next";
import Image from "next/image";
import { pages } from "@/data/pages";
import { heroImages } from "@/data/heroImages";
import { editorialQuotes } from "@/data/editorial";
import { wpOct2022 } from "@/data/wpOct2022Imagery";
import { PageHero } from "@/components/layout/PageHero";
import { CtaStrip } from "@/components/layout/CtaStrip";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { EditorialQuoteBand } from "@/components/editorial/EditorialQuoteBand";
import { EmotionalSection } from "@/components/editorial/EmotionalSection";

export const metadata: Metadata = {
  title: "Kinesiologie",
  description: pages.kinesiologie.intro.slice(0, 155),
};

export default function KinesiologiePage() {
  const p = pages.kinesiologie;
  return (
    <>
      <PageHero
        eyebrow={p.sub}
        title={p.h1}
        subtitle="Die Lehre der Bewegung — anerkannte Komplementär-Therapie, die Körper und Innenwelt zusammenbringt."
        imageSrc={heroImages.kinesiologie.src}
        imageAlt={heroImages.kinesiologie.alt}
        imageClassName="object-cover object-[50%_22%]"
        contentAlign="right"
        priority
      />

      <CtaStrip
        lead="Die Lehre der Bewegung verbindet Körper und Innenwelt — wenn du Unterstützung suchst, gehen wir deinen Weg in einem Tempo, das zu dir passt."
        sub="Online Termin für Kinesiologie buchen — oder mich direkt anrufen."
      />

      <EditorialQuoteBand
        quote={editorialQuotes.return}
        imageSrc={wpOct2022.kinesiologieQuoteParallax}
        imageAlt="Claudia Dimmler — Kinesiologie"
        parallax="strong"
      />

      <EmotionalSection variant="dawn" className="py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-wide)]">
          <SectionReveal>
            <p className="section-eyebrow">Über die Methode</p>
            <h2 className="section-title mt-2 max-w-[28ch]">{p.introTitle}</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-ink-muted">{p.intro}</p>
          </SectionReveal>

          <SectionReveal delay={0.08} className="mt-20 md:mt-28">
            <div className="grid gap-20 md:grid-cols-2 md:gap-16 lg:gap-24">
              <article className="flex flex-col">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-[28px] bg-[#f5f5f7] shadow-[0_2px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={wpOct2022.kinesiologieWannA}
                        alt="Claudia Dimmler — Praxisstimmung"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[22px] bg-[#f5f5f7] ring-1 ring-black/[0.05]">
                    <div className="relative aspect-[16/11] w-full">
                      <Image
                        src={wpOct2022.kinesiologieWannB}
                        alt="Claudia Dimmler — im Gespräch"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-12 md:mt-14">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Wann</p>
                  <h3 className="mt-3 max-w-[20ch] text-[1.625rem] font-semibold leading-[1.12] tracking-[-0.03em] text-ink md:text-[1.875rem]">
                    {p.wannHeading}
                  </h3>
                  <p className="mt-5 max-w-[38rem] text-[17px] leading-[1.5] text-ink-muted md:text-[19px] md:leading-[1.45]">
                    {p.wann}
                  </p>
                </div>
              </article>

              <article className="flex flex-col">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-[28px] bg-[#f5f5f7] shadow-[0_2px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={wpOct2022.kinesiologieWieA}
                        alt="Claudia Dimmler — Kinesiologie-Session"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[22px] bg-[#f5f5f7] ring-1 ring-black/[0.05]">
                    <div className="relative aspect-[16/11] w-full">
                      <Image
                        src={wpOct2022.kinesiologieWieB}
                        alt="Claudia Dimmler — achtsame Begleitung"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-12 md:mt-14">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Wie</p>
                  <h3 className="mt-3 max-w-[20ch] text-[1.625rem] font-semibold leading-[1.12] tracking-[-0.03em] text-ink md:text-[1.875rem]">
                    {p.wieHeading}
                  </h3>
                  <p className="mt-5 max-w-[38rem] text-[17px] leading-[1.5] text-ink-muted md:text-[19px] md:leading-[1.45]">
                    {p.wie}
                  </p>
                </div>
              </article>
            </div>
          </SectionReveal>
        </div>
      </EmotionalSection>

      <EmotionalSection variant="dawn" className="border-y border-[#ebe3db]/80 py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-narrow)]">
          <SectionReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-complimentary/75">
              Wirkung
            </p>
            <h2 className="mt-4 max-w-[20ch] text-[clamp(1.65rem,3.8vw,2.35rem)] font-medium leading-[1.18] tracking-[-0.02em] text-ink">
              {p.wirkungHeading}
            </h2>
            <p className="mt-6 max-w-[40rem] text-[17px] leading-[1.7] text-ink-muted md:text-[1.0625rem] md:leading-[1.68]">
              Jeder Körper erzählt anders — hier sind Bereiche, in denen Kinesiologie häufig unterstützt.
            </p>
          </SectionReveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:mt-16 md:gap-x-10 md:gap-y-12">
            {p.wirkungGroups.map((g, i) => (
              <SectionReveal key={g.title} delay={0.06 + i * 0.05} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6] p-7 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_8px_32px_-12px_rgba(89,94,73,0.1)] md:p-8">
                  <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                    {g.title}
                  </h3>
                  <ul className="mt-6 space-y-3.5 border-t border-[#ebe3db]/90 pt-6" role="list">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[15px] leading-[1.6] text-ink-muted md:text-[1.0625rem] md:leading-[1.62]"
                      >
                        <span
                          className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/80"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </EmotionalSection>
    </>
  );
}
