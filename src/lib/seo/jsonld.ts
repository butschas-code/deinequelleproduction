import { site } from "@/data/site";
import type { GoogleReview } from "@/data/googleReviews";

type ReviewJson = {
  "@type": "Review";
  author: { "@type": "Person"; name: string };
  datePublished: string;
  reviewBody?: string;
  reviewRating: {
    "@type": "Rating";
    ratingValue: number;
    bestRating: number;
    worstRating: number;
  };
};

export function buildLocalBusinessJsonLd(opts: {
  reviews: GoogleReview[];
  aggregateRating: { ratingValue: number; reviewCount: number } | null;
}) {
  const review: ReviewJson[] = opts.reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.authorName },
    datePublished: r.datePublished,
    ...(r.reviewBody.trim() ? { reviewBody: r.reviewBody } : {}),
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.reviewRating,
      bestRating: 5,
      worstRating: 1,
    },
  }));

  const base = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: `${site.name} – ${site.practitioner}`,
    description: site.description,
    url: site.url,
    telephone: site.phoneTel,
    email: site.email,
    image: `${site.url}/images/legacy/photos/claudia-portrait-036.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    priceRange: "$$",
  };

  if (opts.aggregateRating && opts.reviews.length > 0) {
    return {
      ...base,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: opts.aggregateRating.ratingValue,
        reviewCount: opts.aggregateRating.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
      review,
    };
  }

  if (review.length > 0) {
    return { ...base, review };
  }

  return base;
}
