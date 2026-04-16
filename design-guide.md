# DEINE QUELLE — Design Guide

> Palette: **Option G — Emerald Forest**
> Last updated: 2026-04-16

---

## 1. Brand Palette

The site uses a five-token brand palette plus a neutral system. All values are defined as CSS custom properties in `src/app/globals.css` and re-exported as JS constants in `src/theme/tokens.ts`.

### Brand colors

| Token | CSS var | Hex | RGB | Usage |
|---|---|---|---|---|
| Brand | `--brand` | `#1e6e48` | 30, 110, 72 | CTAs, links, primary buttons, step badges, blockquote borders |
| Brand Hover | `--brand-hover` | `#186040` | 24, 96, 64 | Hover state for brand-colored buttons |
| Brand Secondary | `--brand-secondary` | `#f2d5dc` | 242, 213, 220 | Soft blush — section washes, pill backgrounds, CtaStrip tint |
| Brand Complimentary | `--brand-complimentary` | `#c0708a` | 192, 112, 138 | Warm rose — eyebrow text, section accents, Wirkung card 4 |
| Brand Extra / Gold | `--brand-extra` | `#d4a843` | 212, 168, 67 | Real amber gold — decorative accents, Wirkung card 3 |

### Neutral system

| Token | CSS var | Hex | Usage |
|---|---|---|---|
| Paper | `--paper` | `#f6fdfb` | Page background (faint emerald-white) |
| Paper 2 | `--paper-2` | `#ffffff` | Card backgrounds |
| Ink | `--ink` | `#1d1d1f` | Body text, headings |
| Ink Muted | `--ink-muted` | `#6e6e73` | Secondary text, descriptions |
| Line | `--line` | `rgba(0,0,0,0.08)` | Subtle borders |
| Line Strong | `--line-strong` | `rgba(0,0,0,0.12)` | Stronger borders |

### Derived tokens (CSS `color-mix`)

| Token | Formula | Usage |
|---|---|---|
| `--brand-secondary-soft` | `brand-secondary` at 32% | Very faint blush wash |
| `--brand-soft` | `brand-secondary` at 45% + white | Hover background on light buttons |
| `--brand-muted` | `brand` at 26% | Subtle brand-tinted backgrounds |

### Shadows

| Token | Value |
|---|---|
| `--shadow` | `0 4px 24px rgba(0, 0, 0, 0.06)` |
| `--shadow-lg` | `0 16px 64px rgba(0, 0, 0, 0.1)` |

Colored shadows use the brand RGB: `rgba(30,110,72,N)` — keeps shadows from looking gray.

---

## 2. Tailwind Color Utilities

All brand tokens are exposed as Tailwind classes via `@theme inline` in `globals.css`:

```
bg-brand          text-brand          border-brand
bg-brand-hover    text-brand-hover
bg-brand-secondary  text-brand-secondary
bg-brand-complimentary  text-brand-complimentary
bg-brand-extra    text-brand-extra
bg-paper          bg-paper-2
text-ink          text-ink-muted
bg-brand-soft     bg-brand-muted      bg-brand-secondary-soft
text-gold         bg-gold
```

**Never hard-code hex values in components.** Use these Tailwind classes so the entire palette can be updated from `globals.css` alone.

---

## 3. Typography

**Font:** Inter (loaded via `next/font/google` in the root layout)

### Global utilities (defined in `globals.css`)

#### `.section-eyebrow`
Used above every section heading. Rose/complimentary color.
```css
font-size: 0.75rem;
font-weight: 600;
letter-spacing: 0.22em;
text-transform: uppercase;
color: var(--brand-complimentary);  /* #c0708a */
```

#### `.section-title`
Fluid-size section headings:
```css
font-size: clamp(1.5rem, 5vw + 0.35rem, 2.875rem);
font-weight: 600;
letter-spacing: -0.032em;
line-height: 1.08;
color: var(--ink);
text-wrap: balance;
```

### Inline patterns

| Role | Classes |
|---|---|
| Section eyebrow | `section-eyebrow` or `text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-complimentary` |
| Section title | `section-title` |
| Body copy | `text-[15px] sm:text-[16px] leading-[1.75] text-ink-muted` |
| Large lead text | `text-[1.2rem] sm:text-[1.35rem] font-medium leading-[1.75] text-ink` |
| Card heading | `text-[1.075rem] font-semibold leading-snug tracking-[-0.02em] text-ink` |
| Card body | `text-[14.5px] leading-relaxed text-ink-muted` |
| Small label | `text-[13px] font-semibold text-brand` |
| Legal / prose | `.apple-read-column` or `.prose-practice` utility class |

---

## 4. Layout

### Max-width containers

| Token | Value | Usage |
|---|---|---|
| `--layout-max` | `61.25rem` (980px) | Standard content columns |
| `--layout-narrow` | `57.5rem` (920px) | Narrow reading columns, hero text |
| `--layout-wide` | `66.25rem` (1060px) | Wider feature sections |

Standard pattern:
```jsx
<div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
```

### `.page-gutter`
Responsive horizontal padding with iOS safe-area support:
- `< 640px`: `1rem`
- `≥ 640px`: `1.5rem`
- `≥ 768px`: `2rem`

---

## 5. Section Backgrounds

### EmotionalSection variants (`src/components/editorial/EmotionalSection.tsx`)

| Variant | Background | Usage |
|---|---|---|
| `dawn` | `165deg: #f2fdf8 → #e8f8f0 → #fdf5f8 → #f8f2f5` | Wirkungsbereiche, Stakes section |
| `meadow` | `160deg: #edf8f2 → #e2f5ec → #f6fdfb` | About Claudia, Testimonials |
| `mist` | `180deg: #f6fdfb → #eef8f4 → #fdf8fa` | Neutral separator sections |
| `warmWhite` | `180deg: #ffffff → #faf8f4` | Subtle warm white |
| `appleWhite` | `#ffffff` | Flat white |
| `appleGray` | `#f5f5f7` | Flat light gray |

`dawn` and `meadow` include soft radial accents: emerald top-right + blush bottom-left at low opacity.

### Final CTA section (S10, `src/app/page.tsx`)
Solid deep emerald background with blush blobs:
```jsx
<section style={{ background: '#1e6e48' }}>
  {/* Blush blob top-right: #f2d5dc at 32% opacity, 480px, blur-[90px] */}
  {/* Blush blob bottom-left: #f2d5dc at 18% opacity, 320px, blur-[70px] */}
  {/* White radial highlight: rgba(255,255,255,0.07) centered */}
</section>
```

### CtaStrip (`src/components/layout/CtaStrip.tsx`)
```
background: color-mix(in srgb, #f2d5dc 14%, #f4fcf8)
top overlay: from-[#1e6e48]/[0.06] to-transparent (gradient-to-b)
```

---

## 6. Wirkungsbereiche Card Colors

The 4 category cards use a nature gradient — deep emerald flowing to warm rose — applied as colored header bands:

| Card | Category | Accent color | Hex |
|---|---|---|---|
| 1 | Mental | Deep emerald | `#1e6e48` |
| 2 | Körperlich | Meadow green | `#5a8040` |
| 3 | Lebensphasen | Warm amber | `#b07838` |
| 4 | Emotionen | Rose | `#c0708a` |

Each card header uses:
```jsx
style={{ background: `linear-gradient(135deg, ${accentColor}f2 0%, ${accentColor}b8 100%)` }}
```
Icon container: `bg-white/22` — frosted white at 22% opacity, `rounded-xl`.

---

## 7. Service Card Image Overlays

Ultra-light emerald tints — photos should breathe; avoid heavy color washes.

```jsx
{/* Corner vignette */}
<div className="bg-gradient-to-br from-[#1e6e48]/14 via-transparent to-transparent" />
{/* Bottom fade */}
<div className="bg-gradient-to-t from-[#1e6e48]/40 via-[#1e6e48]/12 to-transparent" />
{/* Diagonal depth */}
<div className="bg-[linear-gradient(105deg,transparent_0%,rgba(192,112,138,0.04)_40%,rgba(30,110,72,0.14)_100%)]" />
```

Card shadow: `shadow-[0_8px_40px_-12px_rgba(30,110,72,0.13)]`
Card hover shadow: `shadow-[0_20px_50px_-15px_rgba(30,110,72,0.18)]`

---

## 8. Buttons

### Primary (filled)
```jsx
<button className="inline-flex min-h-[48px] items-center justify-center rounded-full
  bg-brand px-8 text-[15px] font-semibold text-white
  shadow-[0_8px_30px_-8px_rgba(30,110,72,0.42)]
  transition duration-200 hover:bg-brand-hover">
```

### Secondary (outline / ghost)
```jsx
<button className="inline-flex min-h-[44px] items-center rounded-full
  border border-brand/30 bg-brand/7 px-5
  text-[13.5px] font-semibold text-brand
  transition hover:border-brand/50 hover:bg-brand/12">
```

### CTA large (hero / full-CTA section)
```jsx
<button className="inline-flex min-h-[54px] items-center justify-center rounded-full
  bg-white px-8 text-[15.5px] font-semibold text-brand
  shadow-[0_6px_32px_rgba(0,0,0,0.18)]
  transition hover:bg-brand-soft hover:shadow-[0_8px_40px_rgba(0,0,0,0.24)]
  active:scale-[0.98]">
```

---

## 9. Animation

### `<SectionReveal>` (`src/components/motion/SectionReveal.tsx`)
Wraps any block to fade + slide in on scroll. Use for all major content sections.
```jsx
<SectionReveal>…</SectionReveal>
<SectionReveal delay={0.08}>…</SectionReveal>  {/* staggered */}
```
Stagger pattern for grids: `delay={index * 0.07}` (e.g. 0, 0.07, 0.14, 0.21).

### `<ParallaxImage>` (`src/components/motion/ParallaxImage.tsx`)
Parallax background image. `strength` prop: `"subtle" | "moderate" | "strong" | "extreme"`.

### `AmbientShell` (`src/components/ambient/AmbientShell.tsx`)
Fixed full-page background with:
- Emerald mesh radial (top-left, 16% opacity)
- Blush mesh radial (top-right, 8% opacity)
- Two animated floating color blobs (28s + 32s loops, emerald + blush)
- Subtle film grain at 2.2% opacity

### Hero parallax
`StorybrandHero` uses Framer Motion `useScroll` + `useTransform` to apply 12% vertical parallax on the background image as the user scrolls down.

---

## 10. Cards

### `.card-apple`
Standard Apple-style card (used across site):
```css
border-radius: 1.25rem;
background: var(--paper-2);
box-shadow: var(--shadow);
border: 1px solid var(--line);
transition: transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1),
            box-shadow 0.45s ...;
```
Hover: `translateY(-2px)` + `shadow-lg`.

### `.card-service-home`
Service cards (homepage grid):
```css
border-radius: 1.5rem;
/* Same shadow/transition as card-apple */
/* Image overlays: ultra-light emerald tints (see §7) */
```

### Wirkung cards
Overflow-hidden, no border, white bg. Colored header band + ruled item list. See §6.

---

## 11. Prose / Legal Pages

Use `.apple-read-column` wrapper for all legal and editorial long-form text:
```jsx
<div className="apple-read-column">
  <p>…</p>
  <h2>…</h2>
</div>
```
Max-width `42.5rem`. Paragraph size `1.0625rem`, line-height `1.65`.

---

## 12. Key Files Reference

| Purpose | File |
|---|---|
| CSS custom properties + Tailwind theme | `src/app/globals.css` |
| JS color token exports | `src/theme/tokens.ts` |
| Root layout (fonts, meta, shell) | `src/app/layout.tsx` |
| Homepage | `src/app/page.tsx` |
| Business data (address, phone, booking URL) | `src/data/site.ts` |
| All page copy (German) | `src/data/pages.ts` |
| Hero image pool | `src/data/heroImages.ts` |
| SiteHeader + nav | `src/components/layout/SiteHeader.tsx` |
| SiteFooter | `src/components/layout/SiteFooter.tsx` |
| PageHero | `src/components/layout/PageHero.tsx` |
| CtaStrip | `src/components/layout/CtaStrip.tsx` |
| EmotionalSection | `src/components/editorial/EmotionalSection.tsx` |
| StorybrandHero | `src/components/home/StorybrandHero.tsx` |
| AmbientShell | `src/components/ambient/AmbientShell.tsx` |
| SectionReveal | `src/components/motion/SectionReveal.tsx` |
| JSON-LD schema | `src/components/JsonLd.tsx` |

---

## 13. Do / Don't

| Do | Don't |
|---|---|
| Use Tailwind color utilities (`text-brand`, `bg-brand-secondary`) | Hard-code hex values in component className strings |
| Keep all copy in `src/data/pages.ts` and `src/data/site.ts` | Write German text strings directly in page components |
| Wrap animated sections in `<SectionReveal>` | Add raw `opacity-0` / JS scroll listeners |
| Use `next/image` with `fill` + `sizes` for all photos | Use `<img>` tags |
| Keep service overlays light — photos should breathe | Stack multiple high-opacity color gradients on images |
| Use `.page-gutter` + `max-w-[var(--layout-max)]` for all content columns | Use fixed `px-4` or `max-w-screen-lg` |
| Write new legal/policy text in `src/content/legal/*.txt` | Hardcode legal text in components |

---

## 14. Adding a New Section

1. Wrap content in `<SectionReveal>` for scroll animation.
2. Choose a background: `<EmotionalSection variant="dawn|meadow|mist">` or plain `<section>`.
3. Use `<p className="section-eyebrow">` + `<h2 className="section-title">` for the heading pair.
4. Constrain width: `<div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">`.
5. End sections with `<CtaStrip>` where a booking prompt is appropriate.

---

## 15. Navigation (`SiteHeader`)

**File:** `src/components/layout/SiteHeader.tsx`

### Structure
- Sticky, `z-[60]`
- Transparent / blurred glass when at top: `bg-white/72 backdrop-blur-2xl backdrop-saturate-150`
- Solid white on scroll (`window.scrollY > 8`): `bg-white border-b border-black/[0.08]`
- Transition: `duration-300 ease-out` on background and backdrop-filter

### Nav items (edit in the `nav` array at the top of the file)
```
Angebote (dropdown)
  └─ Kinesiologie          /leistungen/kinesiologie
  └─ Sport-Kinesiologie    /leistungen/sport-kinesiologie
  └─ Hatha Yoga            /leistungen/yoga
Über mich                  /ueber-mich
Bewertungen                /bewertungen
Kontakt                    /kontakt
```

To add a top-level link: `{ href: '/neue-seite', label: 'Label' }`.
To add to the "Angebote" dropdown: add a child to `children: [...]`.

### Desktop CTA button (top-right)
```jsx
<Link className="rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white
  shadow-sm transition duration-200 hover:bg-brand-hover">
  Termin buchen
```

### Mobile nav
Animated expand/collapse (`AnimatePresence`, `height: 0 → auto`). Touch target minimum `min-h-[48px]`. Group labels use `text-brand-complimentary` (rose). Background: `bg-white/95 backdrop-blur-xl`.

---

## 16. Footer (`SiteFooter`)

**File:** `src/components/layout/SiteFooter.tsx`

### Structure
Two-column grid (`md:grid-cols-2`) on a `bg-paper-2` background:
- **Left:** Logo, practitioner address, "Route planen" button, transit note
- **Right:** Embedded Google Maps iframe (grayscale-15%, contrast-97%)

Legal bar at the bottom: `bg-brand text-white` — links at `text-white/85`, small print at `text-white/65`.

### Legal links (edit `legal` array at top of file)
```
/impressum · /agb · /datenschutz · /ethik
```

### Map styling
```jsx
<iframe className="aspect-[4/3] w-full grayscale-[15%] contrast-[0.97]" />
```
Contained in `rounded-2xl border border-black/[0.08] shadow-[var(--shadow-lg)]`.

---

## 17. PageHero Component

**File:** `src/components/layout/PageHero.tsx`

Used on all inner pages (Kinesiologie, Yoga, Über mich, Kontakt, etc.). Supports photos, video, or gradient-only mode.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | required | Main H1 |
| `eyebrow` | `string` | — | Small label above title |
| `subtitle` | `string` | — | Lead sentence below title |
| `imageSrc` | `string` | — | Background photo path |
| `imageAlt` | `string` | `""` | Alt text for photo |
| `imageClassName` | `string` | `"object-cover object-center"` | Tailwind classes for image focal point |
| `videoSrc` | `string` | — | Background video (autoplay/loop/muted) |
| `posterSrc` | `string` | — | Poster image for video / fallback for `prefers-reduced-motion` |
| `gradientOnly` | `boolean` | `false` | No media — renders brand gradient |
| `contentAlign` | `"left" \| "right"` | `"left"` | Text alignment inside hero |
| `reduceGreenOverlay` | `boolean` | `false` | Halve the emerald bottom-fade (use when photo is very dark) |
| `overlayTint` | `string` | — | Custom hex — overrides default emerald overlay color |
| `videoPlaybackRate` | `number` | `1` | e.g. `0.7` for slow-motion effect |
| `priority` | `boolean` | `false` | Passes to `next/image` for LCP images |

### Heights
Slightly shorter than the home hero:
```
mobile:  min-h-[min(64vh,560px)]
sm:      min-h-[min(70vh,680px)]
md:      min-h-[min(78vh,820px)]
lg:      min-h-[min(80vh,900px)]
```

### Overlay stack (photo/video mode)
1. Parallax image/video (11% travel on scroll)
2. Bottom-up emerald fade: `from-[#1e6e48] via-[#1e6e48]/52 to-black/25`
   - With `reduceGreenOverlay`: `from-[#1e6e48]/50 via-[#1e6e48]/26 to-black/25`
3. Horizontal vignette: `from-black/45 via-transparent to-black/25`
4. Film grain at 7% opacity (`mix-blend-overlay`)

### Text styles (inside hero)
- Eyebrow: `text-[12px] font-semibold uppercase tracking-[0.32em] text-white/72`
- Title (H1): fluid from `1.85rem` to `4.6rem`, `font-semibold tracking-[-0.035em] leading-[1.08] text-white`
- Subtitle: `text-[1rem] sm:text-[1.0625rem] md:text-xl font-medium leading-[1.55] text-white/90`
- Both have `text-shadow: 0 2px 48px rgba(0,0,0,0.4)` for legibility over photos

### Usage example
```jsx
<PageHero
  eyebrow="Komplementärtherapie"
  title="Kinesiologie"
  subtitle="Blockaden lösen, Gleichgewicht finden."
  imageSrc="/images/legacy/photos/claudia-347.jpg"
  imageClassName="object-cover object-center"
  priority
/>
```

---

## 18. Responsive Breakpoints

The site uses standard Tailwind breakpoints:

| Prefix | Min-width | Typical use |
|---|---|---|
| (none) | 0px | Mobile-first base styles |
| `sm:` | 640px | Larger phones, landscape |
| `md:` | 768px | Tablet / small laptop |
| `lg:` | 1024px | Laptop — desktop nav appears here |
| `xl:` | 1280px | Wide desktop |
| `2xl:` | 1536px | Very wide — layout-max expands |

Mobile navigation (hamburger) is visible below `lg` (1024px). Desktop nav appears at `lg:flex`.

---

## 19. Image Conventions

All images use `next/image`. Key patterns:

### Fill layout (section photos, cards)
```jsx
<div className="relative aspect-[25/18] w-full overflow-hidden rounded-[1.35rem]">
  <Image src="…" alt="…" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
</div>
```

### Portrait / tall photos
```jsx
<div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.5rem]">
  <Image src="…" alt="…" fill className="object-cover object-top" sizes="380px" />
</div>
```

### Hero backgrounds (full-bleed)
```jsx
<Image src="…" alt="" fill priority className="object-cover object-center" sizes="100vw" quality={92} />
```

### Common aspect ratios used

| Context | Ratio |
|---|---|
| Service cards | `25/18` |
| Portrait photos | `3/4` |
| About photo | `4/5` |
| Maps iframe | `4/3` |

### `sizes` guidance
- Full-bleed hero: `"100vw"`
- 3-column grid card: `"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"`
- 2-column layout: `"(max-width: 768px) 90vw, 420px"`
- Fixed small portrait: `"180px"` or `"96px"` etc.

---

## 20. SEO & Metadata

**File:** `src/lib/seo/jsonld.ts` — builds the `LocalBusiness` JSON-LD schema.
**File:** `src/app/layout.tsx` — sets `metadataBase`, root `<html lang="de-CH">`, injects JSON-LD.

### Per-page metadata pattern
Every page exports:
```ts
export const metadata: Metadata = {
  title: 'Kinesiologie',          // appended to template: "Kinesiologie | DEINE QUELLE"
  description: 'German description (155 chars max)',
}
```

### Template
```ts
title: { template: '%s | DEINE QUELLE', default: 'DEINE QUELLE' }
```

### `metadataBase`
```ts
metadataBase: new URL('https://deinequelle.com')
```

---

## 21. Cookie Consent (`CookieBanner`)

**File:** `src/components/consent/CookieBanner.tsx`
**Helpers:** `src/lib/consent.ts`

The banner appears on first visit. Consent is stored in `localStorage`. Components that depend on consent (e.g. analytics) read from `src/lib/consent.ts` before activating.

---

## 22. Vertical Rhythm

Section vertical padding follows a consistent scale:

| Screen | Padding |
|---|---|
| Mobile | `py-16` (4rem) |
| `sm:` | `py-20` (5rem) |
| `md:` | `py-28` (7rem) |
| `lg:` (CtaStrip) | `py-32` (8rem) |
| `xl:` (CtaStrip) | `py-36` (9rem) |

Standard section class:
```jsx
<section className="py-16 sm:py-20 md:py-28">
```

Between sections that share a background, use `border-y border-black/[0.05]` rather than padding alone to add a crisp visual separator.

---

## 23. Focus & Accessibility

- `:focus-visible` outline: `2px solid var(--brand)` at `offset: 3px` (set globally in `globals.css`)
- All interactive elements use semantic HTML (`<button>`, `<a>`, `<Link>`)
- Touch targets: minimum `min-h-[44px] min-w-[44px]` on all mobile controls
- Mobile nav has `aria-expanded`, `aria-controls` on the toggle button; dropdown has `role="menu"` / `role="menuitem"`
- `prefers-reduced-motion`: parallax and Framer Motion animations are disabled via `useReducedMotion()`; `scroll-behavior: auto` applied to `<html>`
- Decorative images use `aria-hidden` and empty `alt=""`
- `::selection` uses `color-mix(in srgb, var(--brand) 28%, transparent)` — emerald tint on text selection

---

## 24. Updating the Palette

All color decisions live in two places only:

1. **`src/app/globals.css`** — five `:root` CSS vars (`--brand`, `--brand-hover`, `--brand-secondary`, `--brand-complimentary`, `--brand-extra`) plus `--paper`
2. **`src/theme/tokens.ts`** — mirrors the same values as JS constants (used in Framer Motion styles and any non-CSS contexts)

Changing those two files updates ~90% of the site automatically via Tailwind utilities. The remaining ~10% are hardcoded `rgba(r,g,b,a)` values in component `className` strings (shadows, overlays). When changing the palette, search for the old RGB triplet:

| Color | RGB triplet to search |
|---|---|
| Brand green | `30,110,72` |
| Brand complimentary | `192,112,138` |
| Brand secondary | `242,213,220` |

Use `Grep pattern="rgba\(30,110,72" glob="src/**/*.tsx"` to find all instances.
