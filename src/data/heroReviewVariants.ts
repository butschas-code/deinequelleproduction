export type HeroReviewVariant = {
  slug: string;
  label: string;
  description: string;
  image: string;
};

export const heroReviewVariants: HeroReviewVariant[] = [
  {
    slug: "poetic-premium",
    label: "Option 1 — Poetic Premium",
    description: "Poetic premium homepage hero, complementary therapy",
    image: "/images/hero/review/01-poetic-premium.jpg",
  },
  {
    slug: "editorial-therapy",
    label: "Option 2 — Editorial Therapy",
    description: "Premium editorial hero, Swiss complementary therapy practice",
    image: "/images/hero/review/02-editorial-therapy.jpg",
  },
  {
    slug: "poetic-realistic",
    label: "Option 3 — Poetic Realistic",
    description: "Poetic but realistic kinesiology and yoga hero",
    image: "/images/hero/review/03-poetic-realistic.jpg",
  },
  {
    slug: "editorial-kinesiology-yoga",
    label: "Option 4 — Editorial Kinesiology & Yoga",
    description: "Premium editorial hero, kinesiology and yoga practice",
    image: "/images/hero/review/04-editorial-kinesiology-yoga.jpg",
  },
  {
    slug: "swiss-lake",
    label: "Option 5 — Swiss Lake",
    description: "Cinematic still Swiss lake at early morning",
    image: "/images/hero/review/05-swiss-lake.jpg",
  },
  {
    slug: "premium-practice",
    label: "Option 6 — Premium Practice",
    description: "Premium homepage hero photo, Swiss practice",
    image: "/images/hero/review/06-premium-practice.jpg",
  },
  {
    slug: "warm-indoor-no-person",
    label: "Option 7 — Warm Indoor (no person)",
    description:
      "Large warm indoor hero — same setting as current hero, person removed",
    image: "/images/hero/review/07-face-replacement-warm-indoor.jpg",
  },
];

export function getHeroReviewVariant(slug: string) {
  return heroReviewVariants.find((variant) => variant.slug === slug);
}
