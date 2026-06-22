import Link from "next/link";
import type { HeroReviewVariant } from "@/data/heroReviewVariants";
import { heroReviewVariants } from "@/data/heroReviewVariants";

export function HeroReviewBanner({
  variant,
}: {
  variant?: HeroReviewVariant;
}) {
  return (
    <div
      className="hero-review-banner"
      role="region"
      aria-label="Hero-Bild Vorschau"
    >
      <div className="hero-review-banner-inner">
        <p className="hero-review-banner-kicker">Intern · Hero-Vorschau</p>
        <p className="hero-review-banner-title">
          {variant ? variant.label : "Startseite — Hero-Bilder zum Review"}
        </p>
        {variant ? (
          <p className="hero-review-banner-desc">{variant.description}</p>
        ) : (
          <p className="hero-review-banner-desc">
            Jeder Link öffnet eine Kopie der Startseite mit einem anderen Hero-Bild.
            Die Live-Startseite bleibt unverändert.
          </p>
        )}
        <div className="hero-review-banner-links">
          <Link href="/hero-review">Alle Optionen</Link>
          <Link href="/">Live-Startseite</Link>
          {variant ? (
            <>
              {heroReviewVariants
                .filter((item) => item.slug !== variant.slug)
                .map((item) => (
                  <Link key={item.slug} href={`/hero-review/${item.slug}`}>
                    {item.label.replace(/^Option \d+ — /, "")}
                  </Link>
                ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
