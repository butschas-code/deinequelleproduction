@AGENTS.md

# DEINE QUELLE — Project Reference

## What this site is

Marketing / booking website for **Claudia Dimmler**, a complementary therapist and yoga teacher based in Adligenswil (Luzern), Switzerland. She offers:

- Kinesiologie (complementary therapy, EMR-certified, KineSuisse member)
- Sport-Kinesiologie
- Hatha Yoga with Pratyahara meditation (Satyananda tradition)

Online booking is handled externally at `https://booking.masuyo.ch/dimmler`.

All copy is **German (de-CH)** — keep that language and register (warm, personal "du" form) when writing any new text.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-native config, no tailwind.config.js) |
| Animation | Framer Motion 12 |
| Font | Inter (next/font/google) |
| Images | next/image throughout |

No database, no auth, no CMS. Content lives entirely in `src/data/` and `src/content/`.

---

## Project structure

```
src/
  app/                    # Next.js App Router pages
    page.tsx              # Home
    ueber-mich/           # About Claudia
    bewertungen/          # Google reviews
    kontakt/              # Contact + map
    leistungen/
      kinesiologie/       # Kinesiologie service page
      sport-kinesiologie/ # Sport-Kinesiologie service page
      yoga/               # Hatha Yoga service page
    agb/                  # AGB (terms)
    datenschutz/          # Privacy policy
    ethik/                # Ethics guidelines
    impressum/            # Legal notice
    layout.tsx            # Root layout (SiteHeader, SiteFooter, AmbientShell, CookieBanner)
    globals.css           # CSS custom properties + Tailwind v4 @theme

  components/
    layout/               # SiteHeader, SiteFooter, PageHero, CtaStrip, AppleSplitFeature
    editorial/            # EditorialQuoteBand, EditorialDiptych, EmotionalSection, etc.
    home/                 # ImpressionsSlideshow, ProcessSteps, ServiceIcons
    motion/               # SectionReveal (scroll reveal), ParallaxImage
    ambient/              # AmbientShell (background gradient layer)
    consent/              # CookieBanner
    legal/                # LegalDocumentPage (shared wrapper for legal pages)
    JsonLd.tsx            # JSON-LD script injector

  data/                   # All site content as typed TypeScript constants
    site.ts               # Business info: name, address, phone, email, booking URL, geo
    pages.ts              # Page copy for every route (German text, structured by page key)
    editorial.ts          # Editorial imagery + quote strings
    heroImages.ts         # Hero image pool
    heroMedia.ts          # Hero video source
    impressionsSlides.ts  # Slideshow image list
    googleReviews.ts      # Static Google review data
    legacyWpImages.ts     # Images migrated from old WordPress site
    wpOct2022Imagery.ts   # Additional legacy imagery

  content/
    legal/                # Plain-text source for all legal documents (AGB, DSE, Impressum, Ethik)

  lib/
    seo/jsonld.ts         # LocalBusiness JSON-LD builder
    legal/loadLegalText.ts# Reads legal .txt files at build time
    consent.ts            # Cookie consent helpers

  theme/
    tokens.ts             # Brand colour constants (mirrors CSS vars, use for JS contexts)
```

---

## Design system

### Brand colours

| Token | Hex | Usage |
|---|---|---|
| `brand` / `text-brand` | `#595e49` | Primary green — CTAs, links, accent |
| `brand-hover` | `#484c3d` | Hover state for brand |
| `brand-secondary` | `#cdd9c7` | Soft mint — backgrounds, pills |
| `brand-complimentary` | `#4e3b44` | Mauve/plum — eyebrows, contrast |
| `brand-extra` / `gold` | `#918a8f` | Warm grey — decorative |
| `paper` | `#f5f5f7` | Page background (Apple-style) |
| `ink` | `#1d1d1f` | Body text |
| `ink-muted` | `#6e6e73` | Secondary text |

All colours are CSS custom properties in `globals.css` and also exposed as Tailwind utilities via `@theme inline`. Use Tailwind classes (`text-brand`, `bg-paper`, etc.) in components — never hard-code hex values.

### Layout utilities (CSS vars)

- `--layout-max: 61.25rem` (980px) — standard content max-width
- `--layout-narrow: 57.5rem` — narrow reading columns
- `--layout-wide: 66.25rem` — wider sections

Pattern: `mx-auto w-full max-w-[var(--layout-max)] page-gutter`

### Typography patterns

- Eyebrow: `text-[12px] font-semibold uppercase tracking-[0.28em] text-brand-complimentary` (or `.section-eyebrow` utility)
- Section title: `.section-title` utility
- Body: `text-[15px] leading-relaxed text-ink-muted`

### Animation

- `<SectionReveal>` — wraps any block to fade/slide in on scroll. Accepts `delay` prop (seconds).
- `<ParallaxImage>` — parallax background image. `strength` prop: `"subtle" | "moderate" | "strong" | "extreme"`.
- `<EmotionalSection>` — tinted full-bleed section. `variant` prop: `"dawn" | "meadow"`.

---

## Adding a new page

1. Create `src/app/<slug>/page.tsx` (Server Component by default).
2. Add page copy to `src/data/pages.ts` under a new key.
3. Export `metadata` (title + description) from the page file — the root layout template is `%s | DEINE QUELLE`.
4. Add the route to the nav in `src/components/layout/SiteHeader.tsx` if it should appear in navigation.
5. Use `<PageHero>` for the top hero, `<SectionReveal>` for animated sections, `<CtaStrip>` before the footer when relevant.

---

## Adding a new service (Leistungen)

Services live under `/leistungen/<slug>`. Follow the pattern of the existing pages:

- [src/app/leistungen/kinesiologie/page.tsx](src/app/leistungen/kinesiologie/page.tsx)
- [src/app/leistungen/yoga/page.tsx](src/app/leistungen/yoga/page.tsx)

Add a child entry to the `"Angebote"` nav group in `SiteHeader.tsx`.

---

## Updating business info or copy

**Never hard-code strings in components.** All business data (address, phone, email, booking URL) lives in [`src/data/site.ts`](src/data/site.ts). All page copy lives in [`src/data/pages.ts`](src/data/pages.ts). Update those files and components pick it up automatically.

---

## Legal documents

Raw text in `src/content/legal/*.txt`. The `loadLegalText` helper reads them at build time. The `<LegalDocumentPage>` component renders them. Pages: `/agb`, `/datenschutz`, `/ethik`, `/impressum`. PDF versions are served from `public/documents/`.

---

## SEO

- JSON-LD LocalBusiness schema is injected in the root layout via `buildLocalBusinessJsonLd` + `<JsonLd>`.
- Each page exports its own `metadata` object.
- `metadataBase` is set to `https://deinequelle.com`.
- Language is `de-CH` (set on `<html lang="de-CH">`).

---

## Key business facts (for copy/content work)

- Practitioner: **Claudia Dimmler**
- Location: Meggerstrasse 4a, 6043 Adligenswil (near Luzern)
- Phone: 076 413 80 50
- Email: info@deinequelle.com / claudia@deinequelle.com
- Booking: https://booking.masuyo.ch/dimmler (external, kinesiologie only)
- Transport: Postauto Nr. 73, Haltestelle Sagi; free parking available
- Certifications: EMR-zertifiziert, KineSuisse, AKT
- CSS Coin accepted as payment
- Yoga classes run Monday and Wednesday evenings + Monday morning; min. 3 participants
- Cancellation policy: free up to 24h before appointment
- Session rate: CHF 132/60 min (kinesiology), billed in 5-min increments

---

## Scripts

```bash
npm run dev               # local dev server
npm run build             # production build
npm run lint              # ESLint
npm run reviews:fetch     # fetch Google reviews (requires API key)
npm run reviews:resolve-place-id  # resolve Google Place ID
```
