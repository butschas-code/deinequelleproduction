import Link from "next/link";
import Image from "next/image";
import { pages } from "@/data/pages";
import { homeHeroVideo } from "@/data/heroMedia";
import { editorial, editorialQuotes } from "@/data/editorial";
import { PageHero } from "@/components/layout/PageHero";
import { CtaStrip } from "@/components/layout/CtaStrip";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ImpressionsSlideshow } from "@/components/home/ImpressionsSlideshow";
import { EditorialQuoteBand } from "@/components/editorial/EditorialQuoteBand";
import { EmotionalSection } from "@/components/editorial/EmotionalSection";
import { impressionsSlides } from "@/data/impressionsSlides";

export default function HomePage() {
  const h = pages.home;

  return (
    <>
      <PageHero
        eyebrow={h.heroEyebrow}
        title={h.heroTitle}
        subtitle={h.intro}
        videoSrc={homeHeroVideo.src}
        contentAlign="right"
        reduceGreenOverlay
        videoPlaybackRate={0.7}
        overlayTint="#718973"
      />

      <CtaStrip />

      <EditorialQuoteBand
        quote={editorialQuotes.breath}
        imageSrc={editorial.handsHeart.src}
        imageAlt={editorial.handsHeart.alt}
      />

      <EmotionalSection variant="dawn" className="py-16 sm:py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="section-eyebrow">Leistungen</p>
            <h2 className="section-title mt-2 max-w-[22ch]">Räume, in denen du wieder spüren darfst</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-ink-muted">
              Körper, Atem und innere Ruhe — Komplementärtherapie und Yoga, die dich dort abholen, wo du
              stehst.
            </p>
          </SectionReveal>

          <div className="mt-12 grid auto-rows-fr gap-5 sm:mt-16 sm:gap-6 md:grid-cols-3">
            {[
              {
                title: h.kinesiologieTeaser.heading,
                body: h.kinesiologieTeaser.body,
                href: "/leistungen/kinesiologie",
                linkLabel: h.kinesiologieTeaser.linkLabel,
                imageSrc: "/images/legacy/photos/claudia-347.jpg",
                imageAlt: "Claudia Dimmler — Kinesiologie",
              },
              {
                title: "Sport-Kinesiologie",
                body: pages.kinesiologie.sportBlock.body,
                href: "/leistungen/sport-kinesiologie",
                linkLabel: pages.kinesiologie.sportBlock.linkLabel,
                imageSrc: "/images/legacy/hero-slides/DeinQuelle-2284-scaled.jpg",
                imageAlt: "Bewegung und Sport — Sport-Kinesiologie",
              },
              {
                title: h.yogaTeaser.heading,
                body: h.yogaTeaser.body,
                href: "/leistungen/yoga",
                linkLabel: h.yogaTeaser.linkLabel,
                imageSrc: "/images/legacy/photos/hatha-yoga-preview.jpg",
                imageAlt: "Hatha Yoga — Praxis",
              },
            ].map((card, i) => (
              <SectionReveal key={card.href} delay={i * 0.07} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-black/[0.07] bg-white/90 shadow-[0_8px_40px_-12px_rgba(89,94,73,0.14)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(78,59,68,0.2)]">
                  <div className="relative aspect-[25/18] w-full shrink-0 overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
                      priority={i === 0}
                    />
                    {/* Bild-Overlay: komplementär (#4e3b44) */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4e3b44]/50 via-transparent to-transparent opacity-95"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4e3b44]/92 via-[#4e3b44]/40 to-transparent"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(78,59,68,0.12)_40%,rgba(78,59,68,0.55)_100%)]"
                      aria-hidden
                    />
                  </div>
                  <div className="relative flex min-h-0 flex-1 flex-col px-5 pb-7 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
                    <div
                      className="pointer-events-none absolute -right-6 top-2 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(78,59,68,0.1),transparent_70%)]"
                      aria-hidden
                    />
                    <h3 className="min-h-[3.5rem] text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-ink md:min-h-[4rem]">
                      {card.title}
                    </h3>
                    <p className="mt-4 min-h-[5.25rem] flex-1 text-[15px] leading-relaxed text-ink-muted md:min-h-[5.75rem]">
                      {card.body}
                    </p>
                    <Link
                      href={card.href}
                      className="relative mt-6 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-brand transition hover:gap-1 sm:mt-8"
                    >
                      {card.linkLabel}
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5" aria-hidden>
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </EmotionalSection>

      <EditorialQuoteBand
        quote={editorialQuotes.path}
        imageSrc="/images/new/yoga-raum-claudia-dimmler.jpg"
        imageAlt="Therapieraum — ruhige Begleitung"
        align="right"
        parallax="strong"
        overlay="primaryShade"
      />

      <EmotionalSection variant="meadow" className="border-y border-black/[0.05] py-16 sm:py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="section-eyebrow">Ablauf</p>
            <h2 className="section-title mt-2">So begleite ich dich</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-muted">
              Kein starres Programm — sondern ein klares Gefühl dafür, was als Nächstes Sinn macht für dich.
            </p>
          </SectionReveal>
          <ProcessSteps />
        </div>
      </EmotionalSection>

      <section className="relative overflow-hidden py-16 text-white sm:py-20 md:py-28">
        <div className="absolute inset-0 isolate">
          <div className="absolute inset-0 opacity-35" aria-hidden>
            <ParallaxImage
              src={editorial.forestLight.src}
              alt=""
              className="absolute inset-0 h-full w-full"
              strength="extreme"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 transform-gpu"
            style={{
              background: `
                linear-gradient(
                  118deg,
                  color-mix(in srgb, #595e49 92%, #4e3b44) 0%,
                  #595e49 18%,
                  color-mix(in srgb, #595e49 72%, #4e3b44) 42%,
                  color-mix(in srgb, #595e49 48%, #4e3b44) 58%,
                  color-mix(in srgb, #595e49 28%, #4e3b44) 74%,
                  color-mix(in srgb, #595e49 12%, #4e3b44) 88%,
                  #4e3b44 100%
                ),
                linear-gradient(205deg, transparent 0%, transparent 40%, rgba(30, 22, 26, 0.22) 100%)
              `,
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(255,255,255,0.08),transparent)]" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [transform:translateZ(0)]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
        </div>
        <div className="page-gutter relative z-[1] mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-white/65">Vertrauen</p>
            <h2 className="mt-3 max-w-[22ch] text-balance text-3xl font-semibold tracking-[-0.03em] md:text-4xl lg:text-[2.75rem]">
              Qualität, die du spüren kannst
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/78">
              Anbindung an anerkannte Verbände — damit du weisst: hier geht es professionell und herzlich zu.
            </p>
            <div className="mt-10 flex flex-col items-center gap-10 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-12">
              <Image
                src="/images/legacy/logos/kinesuisse.png"
                alt="KineSuisse"
                width={200}
                height={62}
                className="brightness-0 invert opacity-90"
              />
              <Image
                src="/images/legacy/logos/emr-zertifiziert.png"
                alt="EMR zertifiziert"
                width={220}
                height={62}
                className="brightness-0 invert opacity-90"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      <EmotionalSection variant="dawn" className="border-t border-black/[0.05] py-16 sm:py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="section-eyebrow">Stimmung &amp; Raum</p>
            <h2 className="section-title mt-2">Weitere Eindrücke</h2>
            <p className="mt-4 max-w-2xl text-[15px] text-ink-muted">
              Bilder, die die Atmosphäre aus Praxis und Kursraum andeuten.
            </p>
          </SectionReveal>
          <SectionReveal className="mt-14">
            <ImpressionsSlideshow slides={impressionsSlides} />
          </SectionReveal>
        </div>
      </EmotionalSection>
    </>
  );
}
