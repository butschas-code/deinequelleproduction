import type { Metadata } from "next";
import Image from "next/image";
import { pages } from "@/data/pages";
import { heroImages } from "@/data/heroImages";
import { wpOct2022 } from "@/data/wpOct2022Imagery";
import { PageHero } from "@/components/layout/PageHero";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { EmotionalSection } from "@/components/editorial/EmotionalSection";

export const metadata: Metadata = {
  title: "Über mich",
  description: pages.ueberMich.bioParas[0].slice(0, 160),
};

const ausbildungSections = [
  { title: "Grundausbildung", items: pages.ueberMich.ausbildung.grund },
  { title: "Yoga", items: pages.ueberMich.ausbildung.yoga },
  { title: "Kinesiologie KT", items: pages.ueberMich.ausbildung.kinesiologie },
] as const;

export default function UeberMichPage() {
  const u = pages.ueberMich;

  return (
    <>
      <PageHero
        eyebrow="Persönlich"
        title={u.h1}
        subtitle="Claudia Dimmler — Komplementärtherapeutin und Yogalehrerin."
        imageSrc={heroImages.ueberMich.src}
        imageAlt={heroImages.ueberMich.alt}
        imageClassName="object-cover object-[50%_28%]"
        contentAlign="right"
        priority
      />

      <EmotionalSection variant="dawn" className="py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-wide)]">
          <SectionReveal>
            <p className="section-eyebrow">Über mich</p>
            <h2 className="section-title mt-2 max-w-[28ch]">Kurzporträt</h2>
          </SectionReveal>

          <SectionReveal delay={0.08} className="mt-20 md:mt-28">
            <div className="grid gap-20 md:grid-cols-2 md:gap-16 lg:gap-24">
              <article className="flex flex-col">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-[28px] bg-[#f5f5f7] shadow-[0_2px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src="/images/legacy/photos/claudia-portrait-036.jpg"
                        alt="Claudia Dimmler"
                        fill
                        className="object-cover object-[50%_18%]"
                        sizes="(max-width: 768px) 100vw, 500px"
                        priority
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[22px] bg-[#f5f5f7] ring-1 ring-black/[0.05]">
                    <div className="relative aspect-[16/11] w-full">
                      <Image
                        src={wpOct2022.kinesiologieWannA}
                        alt="Claudia Dimmler — in der Praxis"
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-complimentary/75">
                    Stationen
                  </p>
                  <h3 className="mt-4 text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                    Werdegang &amp; Familie
                  </h3>
                  <div className="mt-6 space-y-5 border-t border-[#ebe3db]/90 pt-6 text-[15px] leading-[1.65] text-ink-muted md:text-[1.0625rem] md:leading-[1.62]">
                    <p>{u.bioParas[0]}</p>
                    <p>{u.bioParas[1]}</p>
                  </div>
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
              Komplementärtherapie
            </p>
            <h2 className="mt-4 text-[clamp(1.35rem,3.2vw,1.85rem)] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
              Kinesiologie &amp; Begleitung
            </h2>
            <div className="mt-8 rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6] p-7 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_8px_32px_-12px_rgba(89,94,73,0.08)] md:p-8">
              <p className="text-[17px] leading-[1.7] text-ink-muted md:text-[1.0625rem] md:leading-[1.68]">
                {u.bioParas[3]}
              </p>
            </div>
          </SectionReveal>
        </div>
      </EmotionalSection>

      <EmotionalSection variant="mist" className="py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-narrow)]">
          <SectionReveal>
            <p className="section-eyebrow">Qualifikation</p>
            <h2 className="section-title mt-2 max-w-[32ch]">{u.ausbildungTitle}</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-ink-muted">
              Aus- und Weiterbildungen in Gesundheitsberuf, Yoga und Komplementärtherapie Kinesiologie.
            </p>
          </SectionReveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:mt-16 lg:grid-cols-3 lg:gap-x-8">
            {ausbildungSections.map((block, i) => (
              <SectionReveal key={block.title} delay={0.06 + i * 0.05} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6] p-7 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_8px_32px_-12px_rgba(89,94,73,0.1)] md:p-8">
                  <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-lg">
                    {block.title}
                  </h3>
                  <ul className="mt-6 space-y-3.5 border-t border-[#ebe3db]/90 pt-6" role="list">
                    {block.items.map((item) => (
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
