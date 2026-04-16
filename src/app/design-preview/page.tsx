/**
 * TEMPORARY INTERNAL PAGE — delete after palette decision is made.
 * Route: /design-preview
 */

import Image from 'next/image'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CardConfig {
  image: string
  title: string
  body: string
  overlay1: string
  overlay2: string
  overlay3: string
}

interface PaletteConfig {
  label: string
  tag: string
  brand: string
  secondary: string
  complimentary: string
  extra: string
  paper: string
  sectionBg: string
  ctaBg: string
  wirkungBg: string
  ctaGradient: string
  /** Four accent colors for the Wirkungsbereiche card headers, one per category */
  wirkungAccents: [string, string, string, string]
  cards: CardConfig[]
  swatchLabels: string[]
}

// ---------------------------------------------------------------------------
// Image sources
// ---------------------------------------------------------------------------

const IMAGES = [
  '/images/legacy/photos/hatha-yoga-preview.jpg',
  '/images/legacy/photos/claudia-347.jpg',
  '/images/legacy/hero-slides/DeinQuelle-2284-scaled.jpg',
]

const CARD_TITLES = ['Kinesiologie', 'Hatha Yoga', 'Sport-Kinesiologie']
const CARD_BODIES = [
  'Blockaden lösen, Energiefluss harmonisieren und dein Wohlbefinden nachhaltig stärken.',
  'Körper, Atem und Geist in Einklang bringen — in ruhiger Atmosphäre in Adligenswil.',
  'Leistungsfähigkeit verbessern, Verletzungen vorbeugen und Regeneration unterstützen.',
]

function makeCards(overlay1Fn: (i: number) => string, overlay2Fn: (i: number) => string, overlay3Fn: (i: number) => string): CardConfig[] {
  return IMAGES.map((image, i) => ({
    image,
    title: CARD_TITLES[i],
    body: CARD_BODIES[i],
    overlay1: overlay1Fn(i),
    overlay2: overlay2Fn(i),
    overlay3: overlay3Fn(i),
  }))
}

// ---------------------------------------------------------------------------
// Palette definitions
// ---------------------------------------------------------------------------

const PALETTES: PaletteConfig[] = [
  // ── Current ──────────────────────────────────────────────────────────────
  {
    label: 'Aktuell (Current)',
    tag: 'current',
    brand: '#595e49',
    secondary: '#cdd9c7',
    complimentary: '#4e3b44',
    extra: '#918a8f',
    paper: '#f5f5f7',
    sectionBg: 'linear-gradient(165deg, #fdfbf7 0%, #f5f0e8 35%, #eef4ef 70%, #f8f6f1 100%)',
    ctaBg: '#595e49',
    wirkungBg: 'linear-gradient(165deg, #fdfbf7 0%, #f5f0e8 35%, #eef4ef 70%, #f8f6f1 100%)',
    ctaGradient: 'linear-gradient(138deg, #575c47 0%, #595e49 28%, #544e51 58%, #4e3b44 100%)',
    wirkungAccents: ['#595e49', '#555347', '#524846', '#4e3b44'],
    swatchLabels: ['Brand', 'Akzent', 'Warm', 'Extra', 'Hintergrund'],
    cards: makeCards(
      () => 'linear-gradient(to bottom-right, rgba(78,59,68,0.50), transparent, transparent)',
      () => 'linear-gradient(to top, rgba(78,59,68,0.92) 0%, rgba(78,59,68,0.40) 45%, transparent 100%)',
      () => 'linear-gradient(105deg, transparent 0%, rgba(78,59,68,0.12) 40%, rgba(78,59,68,0.55) 100%)',
    ),
  },

  // ── Option A — Brighter Naturals ─────────────────────────────────────────
  {
    label: 'Option A — Brighter Naturals',
    tag: 'A',
    brand: '#4a7a55',
    secondary: '#9ecba8',
    complimentary: '#5c3d50',
    extra: '#b89a70',
    paper: '#f3faf5',
    sectionBg: 'linear-gradient(165deg, #edf8f0 0%, #d8f0e0 35%, #f0faf2 70%, #e8f6ec 100%)',
    ctaBg: '#4a7a55',
    wirkungBg: 'linear-gradient(165deg, #e8f5ec 0%, #d4eeda 35%, #ecf7ef 70%, #e4f4e8 100%)',
    ctaGradient: 'linear-gradient(138deg, #4a7a55 0%, #4a7a55 28%, #4d6350 58%, #5c3d50 100%)',
    wirkungAccents: ['#4a7a55', '#506f53', '#566452', '#5c3d50'],
    swatchLabels: ['Brand', 'Akzent', 'Warm', 'Extra', 'Hintergrund'],
    cards: makeCards(
      () => 'linear-gradient(to bottom-right, rgba(74,122,85,0.35), transparent, transparent)',
      () => 'linear-gradient(to top, rgba(74,122,85,0.65) 0%, rgba(74,122,85,0.28) 45%, transparent 100%)',
      () => 'linear-gradient(105deg, transparent 0%, rgba(74,122,85,0.06) 40%, rgba(74,122,85,0.30) 100%)',
    ),
  },

  // ── Option B — Light & Airy ───────────────────────────────────────────────
  {
    label: 'Option B — Light & Airy',
    tag: 'B',
    brand: '#3a7d52',
    secondary: '#b8e0c8',
    complimentary: '#78506c',
    extra: '#a8c4b8',
    paper: '#f7fdf9',
    sectionBg: 'linear-gradient(165deg, #f0fbf5 0%, #e2f5ea 35%, #f8fefb 70%, #f0fbf5 100%)',
    ctaBg: '#3a7d52',
    wirkungBg: 'linear-gradient(165deg, #eaf8f0 0%, #d8f2e6 35%, #f4fcf8 70%, #e6f9ef 100%)',
    ctaGradient: 'linear-gradient(138deg, #3a7d52 0%, #3a7d52 28%, #3d6558 58%, #78506c 100%)',
    wirkungAccents: ['#3a7d52', '#3a7a6a', '#5a6882', '#78506c'],
    swatchLabels: ['Brand', 'Akzent', 'Warm', 'Extra', 'Hintergrund'],
    cards: makeCards(
      () => 'linear-gradient(to bottom-right, rgba(58,125,82,0.18), transparent, transparent)',
      () => 'linear-gradient(to top, rgba(58,125,82,0.42) 0%, rgba(58,125,82,0.16) 45%, transparent 100%)',
      () => 'linear-gradient(105deg, transparent 0%, rgba(58,125,82,0.04) 40%, rgba(58,125,82,0.16) 100%)',
    ),
  },

  // ── Option C — Warm & Luminous ────────────────────────────────────────────
  {
    label: 'Option C — Warm & Luminous',
    tag: 'C',
    brand: '#4d7358',
    secondary: '#e8d5a0',
    complimentary: '#9b6b30',
    extra: '#c8a55a',
    paper: '#fdf9f3',
    sectionBg: 'linear-gradient(165deg, #fdf6e8 0%, #f7edce 35%, #faf4e4 70%, #f5f0e0 100%)',
    ctaBg: '#4d7358',
    wirkungBg: 'linear-gradient(165deg, #fdf3e0 0%, #f5e8c8 35%, #faf5e8 70%, #f8f0dc 100%)',
    ctaGradient: 'linear-gradient(138deg, #4d7358 0%, #4d7358 28%, #5a6848 58%, #9b6b30 100%)',
    wirkungAccents: ['#4d7358', '#677047', '#816e3e', '#9b6b30'],
    swatchLabels: ['Brand', 'Akzent', 'Warm', 'Gold', 'Hintergrund'],
    cards: makeCards(
      () => 'linear-gradient(to bottom-right, rgba(155,107,48,0.35), transparent, transparent)',
      () => 'linear-gradient(to top, rgba(155,107,48,0.65) 0%, rgba(155,107,48,0.28) 45%, transparent 100%)',
      () => 'linear-gradient(105deg, transparent 0%, rgba(155,107,48,0.08) 40%, rgba(155,107,48,0.38) 100%)',
    ),
  },

  // ── Option D — Sage & Terracotta ──────────────────────────────────────────
  {
    label: 'Option D — Sage & Terracotta',
    tag: 'D',
    brand: '#5a8a6a',
    secondary: '#d4ead8',
    complimentary: '#c4704a',
    extra: '#e8c9a0',
    paper: '#fefaf6',
    sectionBg: 'linear-gradient(165deg, #f4faf6 0%, #e8f5ec 30%, #fdf7f0 65%, #f9f4ee 100%)',
    ctaBg: '#5a8a6a',
    wirkungBg: 'linear-gradient(165deg, #edf8f0 0%, #e0f5e6 30%, #faf3ec 65%, #f5ede4 100%)',
    ctaGradient: 'linear-gradient(138deg, #5a8a6a 0%, #5a8a6a 28%, #6a7058 58%, #c4704a 100%)',
    wirkungAccents: ['#5a8a6a', '#7d815f', '#a07955', '#c4704a'],
    swatchLabels: ['Sage', 'Mint', 'Terrakotta', 'Sand', 'Hintergrund'],
    cards: makeCards(
      () => 'linear-gradient(to bottom-right, rgba(196,112,74,0.28), transparent, transparent)',
      () => 'linear-gradient(to top, rgba(90,138,106,0.58) 0%, rgba(90,138,106,0.22) 45%, transparent 100%)',
      () => 'linear-gradient(105deg, transparent 0%, rgba(196,112,74,0.06) 40%, rgba(196,112,74,0.28) 100%)',
    ),
  },

  // ── Option E — Jewel Emerald ──────────────────────────────────────────────
  {
    label: 'Option E — Jewel Emerald',
    tag: 'E',
    brand: '#2a7a52',
    secondary: '#a8dabb',
    complimentary: '#1a5e40',
    extra: '#d4a843',
    paper: '#f8fefb',
    sectionBg: 'linear-gradient(165deg, #f0fdf6 0%, #daf5e8 30%, #f2fdf7 65%, #eafaf1 100%)',
    ctaBg: '#2a7a52',
    wirkungBg: 'linear-gradient(165deg, #e8faf2 0%, #d0f0e2 30%, #edf8f4 65%, #e4f8ee 100%)',
    ctaGradient: 'linear-gradient(138deg, #2a7a52 0%, #2a7a52 28%, #2a5e48 58%, #1a5e40 100%)',
    wirkungAccents: ['#2a7a52', '#5e8446', '#928e3a', '#c8982e'],
    swatchLabels: ['Smaragd', 'Mint', 'Forst', 'Gold', 'Hintergrund'],
    cards: makeCards(
      () => 'linear-gradient(to bottom-right, rgba(26,94,64,0.18), transparent, transparent)',
      () => 'linear-gradient(to top, rgba(42,122,82,0.44) 0%, rgba(42,122,82,0.12) 45%, transparent 100%)',
      () => 'linear-gradient(105deg, transparent 0%, rgba(212,168,67,0.04) 40%, rgba(26,94,64,0.16) 100%)',
    ),
  },

  // ── Option F — Blush & Botanical ─────────────────────────────────────────
  {
    label: 'Option F — Blush & Botanical',
    tag: 'F',
    brand: '#4a7a62',
    secondary: '#f5d5d8',
    complimentary: '#b86878',
    extra: '#e8b0a0',
    paper: '#fdf8f7',
    sectionBg: 'linear-gradient(165deg, #fdf5f6 0%, #f8e8ea 30%, #f0faf4 65%, #faf5f6 100%)',
    ctaBg: '#4a7a62',
    wirkungBg: 'linear-gradient(165deg, #fceef0 0%, #f5e0e4 30%, #eef8f2 65%, #f8eef0 100%)',
    ctaGradient: 'linear-gradient(138deg, #4a7a62 0%, #4a7a62 28%, #5a6068 58%, #b86878 100%)',
    wirkungAccents: ['#4a7a62', '#6e7469', '#936e70', '#b86878'],
    swatchLabels: ['Grün', 'Blush', 'Rose', 'Pfirsich', 'Hintergrund'],
    cards: makeCards(
      () => 'linear-gradient(to bottom-right, rgba(184,104,120,0.14), transparent, transparent)',
      () => 'linear-gradient(to top, rgba(74,122,98,0.40) 0%, rgba(74,122,98,0.13) 45%, transparent 100%)',
      () => 'linear-gradient(105deg, transparent 0%, rgba(184,104,120,0.04) 40%, rgba(184,104,120,0.16) 100%)',
    ),
  },
  // ── Option G — Best of All ────────────────────────────────────────────────
  // Combines: jewel emerald depth (E) + blush-rose warmth (F) + real gold (E)
  {
    label: 'Option G — Best of All',
    tag: 'G',
    brand: '#1e6e48',
    secondary: '#f2d5dc',
    complimentary: '#c0708a',
    extra: '#d4a843',
    paper: '#f6fdfb',
    sectionBg: 'linear-gradient(165deg, #f2fdf8 0%, #e2f8ee 30%, #fdf5f8 65%, #f8f2f4 100%)',
    ctaBg: '#1e6e48',
    wirkungBg: 'linear-gradient(165deg, #eaf8f2 0%, #d8f0e6 30%, #faf0f4 65%, #f8eaf0 100%)',
    ctaGradient: '',
    // Deep emerald → meadow → warm amber → rose: a full nature journey
    wirkungAccents: ['#1e6e48', '#5a8040', '#b07838', '#c0708a'],
    swatchLabels: ['Smaragd', 'Blush', 'Rose', 'Gold', 'Hintergrund'],
    cards: makeCards(
      () => 'linear-gradient(to bottom-right, rgba(30,110,72,0.12), transparent, transparent)',
      () => 'linear-gradient(to top, rgba(30,110,72,0.38) 0%, rgba(30,110,72,0.10) 45%, transparent 100%)',
      () => 'linear-gradient(105deg, transparent 0%, rgba(192,112,138,0.04) 40%, rgba(30,110,72,0.12) 100%)',
    ),
  },
]

// ---------------------------------------------------------------------------
// Wirkungsbereiche data (shared across all palettes)
// ---------------------------------------------------------------------------

const WIRKUNG_ITEMS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: 'Mental',
    items: ['Konzentration', 'Motivation', 'Selbstwert', 'Stressbewältigung'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    label: 'Körperlich',
    items: ['Schmerzen', 'Verspannungen', 'Schlafstörungen', 'Erschöpfung'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Lebensphasen',
    items: ['Kinderwunsch', 'Schwangerschaft', 'Pubertät', 'Wechseljahre', 'Neuorientierung'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    label: 'Emotionen',
    items: ['Ängste', 'Stimmungsschwankungen', 'Trauerverarbeitung'],
  },
]

// ---------------------------------------------------------------------------
// PaletteSection component
// ---------------------------------------------------------------------------

function PaletteSection({ palette }: { palette: PaletteConfig }) {
  const swatchColors = [palette.brand, palette.secondary, palette.complimentary, palette.extra, palette.paper]

  return (
    <section style={{ background: palette.sectionBg }} className="py-16 border-b-4 border-black/10">
      <div className="mx-auto w-full max-w-[61.25rem] px-6">

        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <span
            style={{ background: palette.brand, color: '#fff' }}
            className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
          >
            {palette.label}
          </span>
        </div>

        {/* Heading sample */}
        <div className="mb-10">
          <p style={{ color: palette.complimentary }} className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em]">
            Kinesiologie · Yoga · Sport
          </p>
          <h2 style={{ color: '#1d1d1f' }} className="text-[2rem] font-semibold tracking-[-0.03em] leading-tight">
            Dein Weg zu mehr Wohlbefinden
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6e6e73]">
            Erlebe ganzheitliche Begleitung durch Kinesiologie und Yoga — in ruhiger Atmosphäre in Adligenswil bei Luzern.
          </p>
        </div>

        {/* Swatches */}
        <div className="mb-10 flex flex-wrap gap-5">
          {swatchColors.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                style={{ background: color, border: '1.5px solid rgba(0,0,0,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                className="h-10 w-10 rounded-full"
              />
              <span className="text-center font-mono text-[9.5px] text-[#999]">{palette.swatchLabels[i]}</span>
              <span className="font-mono text-[8.5px] text-[#bbb]">{color}</span>
            </div>
          ))}
        </div>

        {/* Service cards */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {palette.cards.map((card, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-[1.35rem] border border-black/[0.07] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
            >
              {/* Image + overlays */}
              <div className="relative aspect-[25/18] w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0" style={{ background: card.overlay1 }} />
                <div className="pointer-events-none absolute inset-0" style={{ background: card.overlay2 }} />
                <div className="pointer-events-none absolute inset-0" style={{ background: card.overlay3 }} />
              </div>

              {/* Card body */}
              <div className="px-5 pb-6 pt-5">
                <h3 className="text-[1rem] font-semibold tracking-[-0.02em] text-[#1d1d1f]">{card.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#6e6e73]">{card.body}</p>
                <div style={{ color: palette.brand }} className="mt-5 text-[13px] font-semibold">
                  Mehr erfahren →
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* ── Wirkungsbereiche section ── */}
      <div style={{ background: palette.wirkungBg }} className="py-14 border-t border-black/[0.05]">
        <div className="mx-auto w-full max-w-[61.25rem] px-6">
          <p style={{ color: palette.complimentary }} className="text-[11px] font-semibold uppercase tracking-[0.28em]">
            Wirkungsbereiche
          </p>
          <h2 className="mt-2 text-[1.6rem] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
            Wo Yoga &amp; Kinesiologie helfen
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-[1.65] text-[#6e6e73]">
            Von Stressbewältigung bis Lebensübergängen — die Methoden sind vielseitig einsetzbar.
          </p>

          {/* Gradient bar + cards — connected as one visual unit */}
          <div className="mt-10">
            <div
              className="h-[3px] w-full rounded-t-sm"
              style={{
                background: `linear-gradient(to right, ${palette.wirkungAccents[0]}, ${palette.wirkungAccents[1]}, ${palette.wirkungAccents[2]}, ${palette.wirkungAccents[3]})`,
              }}
            />
          <div className="grid gap-5 pt-0 sm:grid-cols-2 md:grid-cols-4">
            {WIRKUNG_ITEMS.map((col, colIdx) => {
              const accent = palette.wirkungAccents[colIdx]
              return (
                <div
                  key={col.label}
                  className="flex flex-col overflow-hidden rounded-[1.2rem] bg-white shadow-[0_6px_28px_rgba(0,0,0,0.09)]"
                >
                  {/* Colored header band */}
                  <div
                    style={{ background: `linear-gradient(135deg, ${accent}f0 0%, ${accent}b0 100%)` }}
                    className="px-5 pt-5 pb-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/22 text-white">
                      {col.icon}
                    </div>
                    <h3 className="mt-3 text-[0.9rem] font-bold tracking-[-0.01em] text-white">
                      {col.label}
                    </h3>
                  </div>
                  {/* Items as clean rows */}
                  <div className="flex flex-col px-5 py-3">
                    {col.items.map((item, itemIdx) => (
                      <div
                        key={item}
                        style={{ borderColor: itemIdx < col.items.length - 1 ? 'rgba(0,0,0,0.06)' : 'transparent' }}
                        className="flex items-center gap-3 border-b py-2.5"
                      >
                        <div
                          style={{ background: accent }}
                          className="h-1.5 w-1.5 shrink-0 rounded-full opacity-60"
                        />
                        <span className="text-[13px] leading-snug text-[#1d1d1f]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          </div>
        </div>
      </div>

      {/* ── Bereit für den nächsten Schritt? ── */}
      <div className="relative overflow-hidden py-20 text-white" style={{ background: palette.brand }}>
        {/* Large secondary-color blob — top right */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full blur-[80px]"
          style={{ background: palette.secondary, opacity: 0.38 }}
          aria-hidden
        />
        {/* Smaller secondary blob — bottom left */}
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-[280px] w-[280px] rounded-full blur-[60px]"
          style={{ background: palette.secondary, opacity: 0.22 }}
          aria-hidden
        />
        {/* Soft white radial highlight behind text */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(255,255,255,0.07), transparent)' }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-[57.5rem] px-6 text-center">
          <div
            style={{ borderColor: 'rgba(255,255,255,0.36)', boxShadow: '0 4px 32px rgba(0,0,0,0.18), 0 0 0 6px rgba(255,255,255,0.10)' }}
            className="mx-auto mb-7 h-20 w-20 overflow-hidden rounded-full border-[3px]"
          >
            <Image
              src="/images/legacy/wp/2022/10/claudia_dimmler_cj_2022-140_klein.jpg"
              alt="Claudia Dimmler"
              width={80}
              height={80}
              className="object-cover object-top"
            />
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/55">
            Nächster Schritt
          </p>
          <h2 className="mt-4 text-[1.8rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.4rem]">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15.5px] leading-[1.72] text-white/80">
            Egal ob du Entspannung suchst oder gezielt an einem gesundheitlichen Thema arbeiten möchtest — ich freue mich auf dich.
          </p>
          <button
            style={{ background: '#fff', color: palette.brand }}
            className="mt-9 inline-flex min-h-[54px] items-center justify-center rounded-full px-8 text-[15px] font-semibold shadow-[0_6px_32px_rgba(0,0,0,0.18)]"
          >
            Ersten Termin online buchen
          </button>
          <p className="mt-6 text-[13.5px] text-white/52">
            076 413 80 50 · info@deinequelle.com
          </p>
        </div>
      </div>

      {/* Section footer label */}
      <div className="bg-white py-4 text-center text-[11px] uppercase tracking-widest text-[#bbb]">
        ↑ {palette.label}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DesignPreviewPage() {
  return (
    <main>
      {/* Banner */}
      <div className="sticky top-0 z-50 bg-yellow-400 px-6 py-2 text-center text-[12px] font-semibold text-yellow-900">
        INTERN · Design-Vorschau — Seite nach Entscheidung löschen (/design-preview)
      </div>

      {/* Nav anchors */}
      <div className="flex justify-center gap-6 bg-white px-6 py-4 text-[13px] font-medium shadow-sm">
        {PALETTES.map((p) => (
          <a key={p.tag} href={`#palette-${p.tag}`} className="text-[#595e49] hover:underline">
            {p.tag === 'current' ? 'Aktuell' : `Option ${p.tag}`}
          </a>
        ))}
      </div>

      {/* Palette sections */}
      {PALETTES.map((p) => (
        <div key={p.tag} id={`palette-${p.tag}`}>
          <PaletteSection palette={p} />
        </div>
      ))}
    </main>
  )
}
