import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroReviewBanner } from "@/components/deinequelle/HeroReviewBanner";
import { heroReviewVariants } from "@/data/heroReviewVariants";

export const metadata: Metadata = {
  title: "Hero-Vorschau · DeineQuelle",
  description: "Interne Vorschau neuer Startseiten-Hero-Bilder.",
  robots: { index: false, follow: false },
};

export default function HeroReviewIndexPage() {
  return (
    <>
      <HeroReviewBanner />
      <main className="hero-review-index">
        <div className="hero-review-index-inner">
          <h1>Startseite — Hero-Bilder zum Review</h1>
          <p>
            Wähle eine Option. Jede Seite ist eine vollständige Kopie der
            Startseite — nur das Hero-Bild unter «Im Gleichgewicht…» ist
            ersetzt.
          </p>
          <ul className="hero-review-index-list">
            {heroReviewVariants.map((variant) => (
              <li key={variant.slug}>
                <Link href={`/hero-review/${variant.slug}`} className="hero-review-card">
                  <div className="hero-review-card-thumb">
                    <Image
                      src={variant.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>
                  <div className="hero-review-card-copy">
                    <h2>{variant.label}</h2>
                    <p>{variant.description}</p>
                    <span className="hero-review-card-url">
                      /hero-review/{variant.slug}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
