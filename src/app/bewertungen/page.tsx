import type { Metadata } from "next";
import {
  formatReviewDate,
  getAggregateFromReviews,
  getReviewsSorted,
  googleReviews,
} from "@/data/googleReviews";
import { heroImages } from "@/data/heroImages";
import { buildLocalBusinessJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { CtaStrip } from "@/components/layout/CtaStrip";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { EmotionalSection } from "@/components/editorial/EmotionalSection";

export const metadata: Metadata = {
  title: "Bewertungen",
  description: "Google-Bewertungen und Rückmeldungen zu DEINE QUELLE — Kinesiologie & Yoga.",
};

const cardClass =
  "rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6] p-7 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_8px_32px_-12px_rgba(89,94,73,0.1)] md:p-8";

function StarRow({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="inline-flex gap-0.5 text-[15px] leading-none text-brand" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

export default function BewertungenPage() {
  const reviewsSorted = getReviewsSorted(googleReviews);
  const reviewsWithText = reviewsSorted.filter((r) => r.reviewBody.trim().length > 0);
  const agg = getAggregateFromReviews(googleReviews);
  const ld = buildLocalBusinessJsonLd({
    reviews: reviewsSorted,
    aggregateRating: agg,
  });

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        eyebrow="Google"
        title="Bewertungen"
        subtitle="Die schönsten Worte über unsere Arbeit kommen von den Menschen, für die wir sie tun."
        imageSrc={heroImages.bewertungen.src}
        imageAlt={heroImages.bewertungen.alt}
        imageClassName="object-cover object-[50%_38%]"
        contentAlign="right"
        priority
      />

      <CtaStrip
        lead="Wenn du bereits bei mir warst: eine ehrliche Bewertung auf Google hilft anderen, die Praxis zu finden — herzlichen Dank."
        sub="Neu hier? Termin buchen oder Kontakt aufnehmen — ich freue mich auf dich."
      />

      <EmotionalSection variant="dawn" className="py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-wide)]">
          <SectionReveal>
            <p className="section-eyebrow">Stimmen</p>
            <h2 className="section-title mt-2 max-w-[28ch]">Was andere sagen</h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-ink-muted">
              Öffentliche Google-Rezensionen — dieselben Angaben erscheinen im strukturierten Markup für
              Suchmaschinen.
            </p>
          </SectionReveal>

          {agg ? (
            <SectionReveal delay={0.06} className="mt-12 md:mt-14">
              <article className={`max-w-md ${cardClass}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-complimentary/75">
                  Google Durchschnitt
                </p>
                <p className="mt-4 text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-ink">
                  {agg.ratingValue}
                  <span className="text-[1.25rem] font-medium text-ink-muted"> / 5</span>
                </p>
                <p className="mt-2 text-[15px] text-ink-muted">
                  Aus {agg.reviewCount} {agg.reviewCount === 1 ? "Bewertung" : "Bewertungen"}
                </p>
              </article>
            </SectionReveal>
          ) : null}

          {reviewsWithText.length === 0 ? (
            <SectionReveal delay={0.1} className="mt-12 md:mt-14">
              <article
                className={`${cardClass} border-dashed text-center`}
                aria-live="polite"
              >
                <p className="text-[15px] leading-relaxed text-ink-muted md:text-[1.0625rem]">
                  Noch keine Bewertungen in den Daten. Kopiere öffentliche Google-Rezensionen (Name, Datum im
                  Format JJJJ-MM-TT, Text, Sterne 1–5) nach{" "}
                  <code className="rounded border border-[#ebe3db] bg-white/80 px-1.5 py-0.5 font-mono text-[13px]">
                    googleReviews.ts
                  </code>
                  , oder führe{" "}
                  <code className="rounded border border-[#ebe3db] bg-white/80 px-1.5 py-0.5 font-mono text-[13px]">
                    npm run reviews:fetch
                  </code>{" "}
                  mit API-Key und Place-ID aus (siehe Kommentar in der Datei).
                </p>
              </article>
            </SectionReveal>
          ) : (
            <ul
              className="mt-12 grid list-none gap-8 p-0 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:mt-16 lg:gap-x-10"
              role="list"
            >
              {reviewsWithText.map((r, i) => (
                <li
                  key={`${r.authorName}-${r.datePublished}-${i}`}
                  className="h-full"
                >
                  <SectionReveal delay={0.06 + i * 0.04} className="h-full">
                    <article className={`flex h-full flex-col ${cardClass}`}>
                      <div className="flex flex-wrap items-center gap-2 border-b border-[#ebe3db]/90 pb-5">
                        <StarRow rating={r.reviewRating} />
                        <span className="sr-only">{r.reviewRating} von 5 Sternen</span>
                        <span className="text-[13px] font-medium text-ink-muted">
                          {r.reviewRating}/5
                        </span>
                      </div>
                      <blockquote className="mt-5 flex-1 text-[15px] leading-[1.65] text-ink-muted md:text-[1.0625rem] md:leading-[1.62]">
                        <p className="whitespace-pre-line">&ldquo;{r.reviewBody}&rdquo;</p>
                      </blockquote>
                      <footer className="mt-6 border-t border-[#ebe3db]/90 pt-5">
                        <p className="text-[15px] font-semibold text-ink md:text-[1.0625rem]">{r.authorName}</p>
                        <p className="mt-1.5 text-[13px] text-ink-muted md:text-[14px]">
                          <time dateTime={r.datePublished}>{formatReviewDate(r.datePublished)}</time>
                        </p>
                      </footer>
                    </article>
                  </SectionReveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </EmotionalSection>
    </>
  );
}
