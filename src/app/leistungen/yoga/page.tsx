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
import { EditorialParallaxBackdrop } from "@/components/editorial/EditorialParallaxBackdrop";
import { EmotionalSection } from "@/components/editorial/EmotionalSection";

export const metadata: Metadata = {
  title: "Yoga",
  description: pages.yoga.intro.slice(0, 155),
};

export default function YogaPage() {
  const y = pages.yoga;
  return (
    <>
      <PageHero
        eyebrow={y.subtitle}
        title={y.h1}
        subtitle={y.intro}
        imageSrc={heroImages.yoga.src}
        imageAlt={heroImages.yoga.alt}
        imageClassName="object-cover object-[50%_55%]"
        contentAlign="right"
        priority
      />

      <CtaStrip
        lead="Wenn du Yoga ausprobieren oder vertiefen willst: du bist herzlich willkommen — im Studio oder online."
        sub="Anmeldung per E-Mail oder telefonisch — ich freue mich auf deine Nachricht."
      />

      <EditorialQuoteBand
        quote={editorialQuotes.yogaPractice}
        imageSrc={wpOct2022.yogaQuoteParallax}
        imageAlt="Hatha Yoga — Praxis DEINE QUELLE"
        parallax="strong"
      />

      <EmotionalSection variant="dawn" className="py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-wide)]">
          <SectionReveal>
            <p className="section-eyebrow">Satyananda Yoga®</p>
            <h2 className="section-title mt-2 max-w-[32ch]">{y.satyanandaTitle}</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-ink-muted">{y.satyananda[0]}</p>
          </SectionReveal>

          <SectionReveal delay={0.08} className="mt-20 md:mt-28">
            <div className="grid gap-20 md:grid-cols-2 md:gap-16 lg:gap-24">
              <article className="flex flex-col">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-[28px] bg-[#f5f5f7] shadow-[0_2px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={wpOct2022.yogaKursraum}
                        alt="Yogaraum — Kursraum in der Praxis"
                        fill
                        className="object-cover object-[48%_22%] md:object-[46%_20%]"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[22px] bg-[#f5f5f7] ring-1 ring-black/[0.05]">
                    <div className="relative aspect-[16/11] w-full">
                      <Image
                        src={wpOct2022.yogaGanzheitlichStackB}
                        alt="Praxis DEINE QUELLE — Raum für Yoga"
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
                    Ganzheitlich üben
                  </h3>
                  <div className="mt-6 space-y-5 border-t border-[#ebe3db]/90 pt-6 text-[15px] leading-[1.65] text-ink-muted md:text-[1.0625rem] md:leading-[1.62]">
                    <p>{y.satyananda[1]}</p>
                    <p>{y.satyananda[2]}</p>
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
              Entspannung
            </p>
            <h2 className="mt-4 text-[clamp(1.35rem,3.2vw,1.85rem)] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
              {y.nidraTitle}
            </h2>
            <div className="mt-8 space-y-5 text-[17px] leading-[1.7] text-ink-muted md:text-[1.0625rem] md:leading-[1.68]">
              {y.nidra.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </SectionReveal>
        </div>
      </EmotionalSection>

      <EmotionalSection variant="mist" className="py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-wide)]">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <SectionReveal>
              <article className="h-full rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6] p-7 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_8px_32px_-12px_rgba(89,94,73,0.08)] md:p-8">
                <h3 className="text-lg font-medium tracking-[-0.015em] text-ink">{y.kurseTitle}</h3>
                <p className="mt-4 text-[15px] font-medium text-ink md:text-[1.0625rem]">{y.kurseIntro}</p>
                <ul className="mt-5 space-y-2.5 border-t border-[#ebe3db]/90 pt-5" role="list">
                  {y.kurseZeiten.map((z) => (
                    <li
                      key={z}
                      className="flex gap-3 text-[15px] leading-[1.55] text-ink-muted md:text-[1.0625rem]"
                    >
                      <span
                        className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/80"
                        aria-hidden
                      />
                      <span>{z}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[14px] leading-relaxed text-ink-muted md:text-[15px]">{y.kurseHinweis}</p>
              </article>
            </SectionReveal>

            <SectionReveal delay={0.06}>
              <article className="h-full rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6] p-7 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_8px_32px_-12px_rgba(89,94,73,0.08)] md:p-8">
                <h3 className="text-lg font-medium tracking-[-0.015em] text-ink">{y.fuerWenTitle}</h3>
                <ul className="mt-6 space-y-3 border-t border-[#ebe3db]/90 pt-6" role="list">
                  {y.fuerWen.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-[1.55] text-ink-muted md:text-[1.0625rem]"
                    >
                      <span
                        className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/80"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </SectionReveal>
          </div>
        </div>
      </EmotionalSection>

      <EditorialParallaxBackdrop
        imageSrc={wpOct2022.yogaNidraListeParallax}
        imageAlt="Yoga Nidra — Entspannung und tiefe Ruhe"
        parallax="strong"
      >
        <SectionReveal>
          <h2
            className="text-[clamp(1.25rem,3vw,1.65rem)] font-medium leading-snug tracking-[-0.02em] text-white"
            style={{ textShadow: "0 2px 28px rgba(0,0,0,0.4)" }}
          >
            {y.nidraListeTitle}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3" role="list">
            {y.nidraListe.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[15px] leading-[1.55] text-white/95 md:text-[1.0625rem]"
                style={{ textShadow: "0 1px 14px rgba(0,0,0,0.35)" }}
              >
                <span
                  className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#cdd9c7]/90"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </EditorialParallaxBackdrop>

      <EmotionalSection variant="mist" className="py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-narrow)]">
          <SectionReveal>
            <h2 className="text-[clamp(1.35rem,3.2vw,1.85rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
              {y.preiseTitle}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <article className="rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6] p-7 md:p-8">
                <h3 className="text-[1.0625rem] font-medium text-ink">{y.preise75.title}</h3>
                <ul className="mt-5 space-y-2 border-t border-[#ebe3db]/90 pt-5 text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
                  {y.preise75.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6] p-7 md:p-8">
                <h3 className="text-[1.0625rem] font-medium text-ink">{y.preise90.title}</h3>
                <ul className="mt-5 space-y-2 border-t border-[#ebe3db]/90 pt-5 text-[14px] leading-relaxed text-ink-muted md:text-[15px]">
                  {y.preise90.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </article>
            </div>
            <p className="mt-8 text-[14px] leading-relaxed text-ink-muted">{y.preiseFuss}</p>
            <p className="mt-4 text-[14px] font-medium leading-relaxed text-ink">{y.cssCoin}</p>
          </SectionReveal>

          <SectionReveal delay={0.06} className="mt-16 md:mt-20">
            <h2 className="text-[clamp(1.25rem,3vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
              {y.shavasanaTitle}
            </h2>
            <ul className="mt-6 space-y-3 border-t border-[#ebe3db]/80 pt-6" role="list">
              {y.shavasana.map((s) => (
                <li
                  key={s}
                  className="flex gap-3 text-[15px] leading-relaxed text-ink-muted md:text-[1.0625rem]"
                >
                  <span
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/80"
                    aria-hidden
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal delay={0.1} className="mt-14 flex flex-wrap gap-4 md:mt-16">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand px-8 text-[15px] font-semibold text-white shadow-[0_8px_30px_-8px_rgba(89,94,73,0.4)] transition duration-200 hover:bg-brand-hover"
            >
              E-Mail für Anmeldung
            </a>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-black/12 bg-white/90 px-8 text-[15px] font-semibold text-ink backdrop-blur-sm transition duration-200 hover:border-brand-extra hover:bg-brand-secondary/35"
            >
              Anrufen
            </a>
            <Link
              href="/leistungen/kinesiologie"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-black/12 bg-white/90 px-8 text-[15px] font-semibold text-ink backdrop-blur-sm transition duration-200 hover:border-brand-extra hover:bg-brand-secondary/35"
            >
              Zur Kinesiologie
            </Link>
          </SectionReveal>
        </div>
      </EmotionalSection>
    </>
  );
}
