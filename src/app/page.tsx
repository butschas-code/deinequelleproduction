import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { googleReviews, getReviewsSorted, formatReviewDate } from "@/data/googleReviews";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { EmotionalSection } from "@/components/editorial/EmotionalSection";
import { StorybrandHero } from "@/components/home/StorybrandHero";

/* ─── Inline SVG icons for Wirkungsbereiche ─── */
function IconZap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconActivity() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* ─── Star row for review cards ─── */
function StarRow({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="inline-flex gap-0.5 text-[14px] leading-none text-brand" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

/* ─── Shared service card ─── */
function ServiceCard({
  title, body, href, linkLabel, imageSrc, imageAlt, priority = false,
}: {
  title: string; body: string; href: string; linkLabel: string;
  imageSrc: string; imageAlt: string; priority?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-black/[0.07] bg-white/90 shadow-[0_8px_40px_-12px_rgba(30,110,72,0.13)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(30,110,72,0.18)]">
      <div className="relative aspect-[25/18] w-full shrink-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
          priority={priority}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1e6e48]/14 via-transparent to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1e6e48]/40 via-[#1e6e48]/12 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(192,112,138,0.04)_40%,rgba(30,110,72,0.14)_100%)]" aria-hidden />
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col px-5 pb-7 pt-5 sm:px-7 sm:pb-8 sm:pt-6">
        <div className="pointer-events-none absolute -right-6 top-2 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(30,110,72,0.07),transparent_70%)]" aria-hidden />
        <h3 className="text-[1.075rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{body}</p>
        <Link
          href={href}
          className="mt-6 inline-flex min-h-[44px] items-center text-[13.5px] font-semibold text-brand transition hover:gap-1"
        >
          {linkLabel}
          <span className="ml-1 transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

/* ─── Wirkungsbereich card ─── */
function WirkungCard({
  icon, label, items, accentColor,
}: {
  icon: ReactNode; label: string; items: string[]; accentColor: string;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.2rem] bg-white shadow-[0_6px_28px_rgba(30,110,72,0.09)] transition duration-200 hover:shadow-[0_10px_36px_rgba(30,110,72,0.14)]">
      {/* Colored header band */}
      <div
        style={{ background: `linear-gradient(135deg, ${accentColor}f2 0%, ${accentColor}b8 100%)` }}
        className="px-5 pb-4 pt-5"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/22 text-white">
          {icon}
        </div>
        <h3 className="mt-3 text-[0.9rem] font-bold tracking-[-0.01em] text-white">
          {label}
        </h3>
      </div>
      {/* Items as clean ruled rows */}
      <div className="flex flex-col px-5 py-3">
        {items.map((item, i) => (
          <div
            key={item}
            className="flex items-center gap-3 py-2.5"
            style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}
          >
            <div
              style={{ background: accentColor }}
              className="h-1.5 w-1.5 shrink-0 rounded-full opacity-55"
            />
            <span className="text-[13px] leading-snug text-ink">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PAGE
════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* ── S1: HERO ────────────────────────────── */}
      <StorybrandHero />

      {/* ── S2: STAKES ─────────────────────────────
          Atmospheric background image at very low opacity
          behind the dawn-gradient to add warmth.
      ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 sm:py-24 md:py-32"
        style={{
          background:
            "linear-gradient(165deg,#fdfbf7 0%,#f5f0e8 35%,#eef4ef 70%,#f8f6f1 100%)",
        }}
      >
        {/* Very faint atmospheric photo */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.055]" aria-hidden>
          <Image
            src="/images/legacy/wp/2022/10/claudia_dimmler_cj_2022-140_klein.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Soft radial mask so text stays readable */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(253,251,247,0.96), rgba(253,251,247,0.76))",
          }}
          aria-hidden
        />
        {/* Existing radial accents from EmotionalSection "dawn" */}
        <div className="pointer-events-none absolute -right-[20%] top-0 h-[min(400px,50vh)] w-[min(500px,55vw)] rounded-full bg-[radial-gradient(circle,rgba(30,110,72,0.06),transparent_70%)] blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute -left-[15%] bottom-0 h-[min(350px,45vh)] w-[min(450px,50vw)] rounded-full bg-[radial-gradient(circle,rgba(242,213,220,0.14),transparent_68%)] blur-2xl" aria-hidden />

        <div className="page-gutter relative z-[1] mx-auto w-full max-w-[var(--layout-narrow)]">
          <SectionReveal>
            <p className="section-eyebrow text-center">Die Ausgangslage</p>
            <p className="mt-8 text-center text-[1.2rem] font-medium leading-[1.75] tracking-[-0.01em] text-ink sm:text-[1.35rem] md:text-[1.5rem] md:leading-[1.7]">
              Unser Alltag ist voller Reize. Das Tempo ist hoch. Viele Menschen spüren, dass Körper und Geist aus dem Gleichgewicht geraten sind — oft äussert sich dies als Verspannung, Erschöpfung oder eine anhaltende innere Unruhe.
            </p>
            <p className="mt-6 text-center text-[1.05rem] leading-[1.75] text-ink-muted sm:text-[1.125rem]">
              Der erste Schritt zurück beginnt damit, sich bewusst Zeit zu nehmen und den Fokus wieder nach innen zu richten.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── S3: ANGEBOT ─────────────────────────── */}
      <section id="angebot" className="py-16 sm:py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="section-eyebrow">Das Angebot</p>
            <h2 className="section-title mt-2 max-w-[26ch]">Was ich für dich bereithabe</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-ink-muted">
              Drei Wege zurück zu dir — du wählst, was zu deinem Anliegen passt.
            </p>
          </SectionReveal>

          <div className="mt-12 grid auto-rows-fr gap-5 sm:mt-16 sm:gap-6 md:grid-cols-3">
            {[
              {
                title: "Hatha Yoga mit Pratyahara-Meditation",
                body: "Ein ganzheitliches System aus sanften Körperübungen, Atemtechniken und Yoga Nidra. Es hilft dabei, die Sinne von äusseren Reizen zurückzuziehen und tiefe Entspannung zu finden.",
                href: "/leistungen/yoga",
                linkLabel: "→ Details & Kurszeiten",
                imageSrc: "/images/legacy/photos/hatha-yoga-preview.jpg",
                imageAlt: "Hatha Yoga — Praxis in Adligenswil",
              },
              {
                title: "Kinesiologie — Komplementärtherapie",
                body: "Durch gezielte Therapieeinheiten und den kinesiologischen Muskeltest werden physische, mentale und emotionale Blockaden gelöst. Ziel ist es, die Selbstregulation des Körpers zu stärken.",
                href: "/leistungen/kinesiologie",
                linkLabel: "→ Mehr zur Methode",
                imageSrc: "/images/legacy/photos/claudia-347.jpg",
                imageAlt: "Claudia Dimmler — Kinesiologie Adligenswil",
              },
              {
                title: "Sportkinesiologie",
                body: "Optimierung von Bewegungsabläufen und mentaler Stärke. Zur Leistungssteigerung, schnelleren Regeneration oder zur Vorbereitung auf Wettkämpfe.",
                href: "/leistungen/sport-kinesiologie",
                linkLabel: "→ Details für Sportler",
                imageSrc: "/images/legacy/wp/2022/10/DeinQuelle-1561-scaled.jpg",
                imageAlt: "Sportkinesiologie — Bewegung und Leistung",
              },
            ].map((card, i) => (
              <SectionReveal key={card.href} delay={i * 0.07} className="h-full">
                <ServiceCard {...card} priority={i === 0} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: GUIDE (Claudia) — layered photo composition ─ */}
      <EmotionalSection
        variant="meadow"
        className="border-y border-black/[0.05] py-16 sm:py-20 md:py-28"
      >
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">

            {/* ── Layered photo composition ── */}
            <SectionReveal className="order-2 md:order-1">
              {/*
                Outer container: extra padding-bottom on mobile so the
                overlapping secondary photo isn't clipped.
              */}
              <div className="relative mx-auto max-w-[420px] pb-16 md:max-w-none md:pb-0">

                {/* Primary portrait */}
                <div className="relative aspect-[3/4] w-[88%] overflow-hidden rounded-[1.5rem] shadow-[0_24px_72px_-16px_rgba(30,110,72,0.26)] md:ml-auto">
                  <Image
                    src="/images/legacy/photos/claudia-portrait-036.jpg"
                    alt="Claudia Dimmler — Komplementärtherapeutin und Yogalehrerin"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 78vw, 380px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent" aria-hidden />
                </div>

                {/* Secondary overlapping photo — bottom-left, white border, slight rotation, intrinsic ratio */}
                <div
                  className="absolute -bottom-6 left-0 w-[52%] overflow-hidden rounded-[1.1rem] border-[4px] border-white shadow-[0_12px_48px_rgba(30,110,72,0.20)]"
                  style={{ transform: "rotate(-2deg)" }}
                >
                  <Image
                    src="/images/legacy/photos/claudia-149.jpg"
                    alt="Claudia Dimmler in der Praxis"
                    width={1920}
                    height={929}
                    className="w-full h-auto"
                    sizes="220px"
                  />
                </div>

                {/* Decorative soft glow behind the composition */}
                <div
                  className="pointer-events-none absolute -right-4 top-10 h-32 w-32 rounded-full bg-brand-secondary/40 blur-3xl"
                  aria-hidden
                />
              </div>
            </SectionReveal>

            {/* ── Text ── */}
            <SectionReveal className="order-1 md:order-2" delay={0.08}>
              <p className="section-eyebrow">Deine Begleitung</p>
              <h2 className="section-title mt-2">Über Claudia Dimmler</h2>

              <p className="mt-6 text-[16px] leading-[1.78] text-ink-muted">
                Als diplomierte Komplementärtherapeutin und Yogalehrerin verbinde ich medizinisches Fachwissen mit feinstofflicher Arbeit. Ursprünglich als medizinische Praxisassistentin tätig, fand ich über Yoga Nidra und die Kinesiologie meinen eigenen Weg zu neuer Kraft und innerer Ruhe.
              </p>

              <blockquote className="mt-7 border-l-2 border-brand/45 pl-5">
                <p className="text-[15.5px] italic leading-[1.72] text-ink">
                  «Yoga und Kinesiologie haben mir gezeigt, wie viel Energie wir freisetzen können, wenn wir unsere eigene Quelle wiederentdecken. Dieses Wissen gebe ich heute in meiner Praxis in Adligenswil weiter.»
                </p>
              </blockquote>

              <ul className="mt-8 space-y-2.5">
                {[
                  "Dipl. Komplementärtherapeutin Kinesiologie AKT",
                  "Zertifizierte Satyananda Yoga® Lehrerin",
                  "Langjährige Erfahrung als MPA",
                  "Mitglied KineSuisse & EMR-anerkannt",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14.5px] leading-snug text-ink-muted">
                    <span className="mt-0.5 flex-none font-semibold text-brand" aria-hidden>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </div>
      </EmotionalSection>

      {/* ── S5: PLAN (3 Schritte) — step circles + connector ─ */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="section-eyebrow">In 3 Schritten</p>
            <h2 className="section-title mt-2">So einfach geht es los</h2>
          </SectionReveal>

          {/*
            Connector: a dashed line sitting behind the grid at badge-center
            height (~53px from grid top). Visible only in the 24px column gaps.
            Cards have bg-white which hides the line inside them — creating a
            subtle dotted "path" between steps.
          */}
          <div className="relative mt-12 sm:mt-14">
            <div
              className="pointer-events-none absolute inset-x-0 hidden md:block"
              style={{
                top: "53px",
                height: "1px",
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(30,110,72,0.20) 0px, rgba(30,110,72,0.20) 6px, transparent 6px, transparent 14px)",
              }}
              aria-hidden
            />

            <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
              {[
                {
                  num: "1",
                  title: "Termin wählen",
                  body: "Buche deine erste Sitzung oder Yogalektion unkompliziert über das Online-Tool.",
                  cta: { label: "Hier online buchen", href: site.bookingUrl, external: true },
                },
                {
                  num: "2",
                  title: "Ankommen & Analysieren",
                  body: "In der ersten Begegnung besprechen wir dein Anliegen und definieren gemeinsam den Weg.",
                  cta: null,
                },
                {
                  num: "3",
                  title: "Gleichgewicht finden",
                  body: "Durch gezielte Übungen oder Therapie lösen wir Blockaden und stärken deine Ressourcen nachhaltig.",
                  cta: null,
                },
              ].map((step, i) => (
                <SectionReveal key={step.num} delay={i * 0.09}>
                  <div className="flex h-full flex-col rounded-[1.25rem] border border-black/[0.07] bg-white p-7 shadow-[0_8px_40px_-12px_rgba(30,110,72,0.10)] sm:p-8">
                    {/* Step badge: ring-4 ring-white visually separates it from the connector */}
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-[1.0625rem] font-bold text-brand ring-4 ring-white">
                      {step.num}
                    </div>
                    <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-muted">
                      {step.body}
                    </p>
                    {step.cta && (
                      <a
                        href={step.cta.href}
                        target={step.cta.external ? "_blank" : undefined}
                        rel={step.cta.external ? "noopener noreferrer" : undefined}
                        className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-brand px-5 text-[13.5px] font-semibold text-white transition hover:bg-brand-hover"
                      >
                        {step.cta.label}
                      </a>
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S6: WIRKUNGSBEREICHE — cards with icons + pill items ─ */}
      <EmotionalSection
        variant="dawn"
        className="border-y border-black/[0.05] py-16 sm:py-20 md:py-28"
      >
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="section-eyebrow">Wirkungsbereiche</p>
            <h2 className="section-title mt-2">Wo Yoga & Kinesiologie helfen</h2>
            <p className="mt-4 max-w-lg text-[16px] leading-[1.65] text-ink-muted">
              Von Stressbewältigung bis Lebensübergängen — die Methoden sind vielseitig einsetzbar.
            </p>
          </SectionReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-14 md:grid-cols-4">
            {[
              {
                icon: <IconZap />,
                label: "Mental",
                items: ["Konzentration", "Motivation", "Selbstwert", "Stressbewältigung"],
                accentColor: "#1e6e48",
              },
              {
                icon: <IconActivity />,
                label: "Körperlich",
                items: ["Schmerzen", "Verspannungen", "Schlafstörungen", "Erschöpfung"],
                accentColor: "#5a8040",
              },
              {
                icon: <IconClock />,
                label: "Lebensphasen",
                items: ["Kinderwunsch", "Schwangerschaft", "Pubertät", "Wechseljahre", "Neuorientierung"],
                accentColor: "#b07838",
              },
              {
                icon: <IconHeart />,
                label: "Emotionen",
                items: ["Ängste", "Stimmungsschwankungen", "Trauerverarbeitung"],
                accentColor: "#c0708a",
              },
            ].map((col, i) => (
              <SectionReveal key={col.label} delay={i * 0.07}>
                <WirkungCard {...col} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </EmotionalSection>

      {/* ── S7: ERFOLG — split layout: text left, photo right ─── */}
      <section className="overflow-hidden py-16 sm:py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">

            {/* Text left */}
            <SectionReveal>
              <p className="section-eyebrow">Was sich verändert</p>
              <h2 className="section-title mt-2">Dein Leben nach der Behandlung</h2>

              <ul className="mt-8 space-y-5 sm:mt-10">
                {[
                  "Du gewinnst an Klarheit und innerer Ruhe.",
                  "Dein Körper fühlt sich geschmeidiger und belastbarer an.",
                  "Du schläfst besser und startest mit mehr Energie in den Tag.",
                  "Du kennst Werkzeuge, um im Alltag gelassen zu bleiben.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white shadow-sm">
                      ✓
                    </span>
                    <p className="text-[16.5px] leading-[1.65] text-ink">{item}</p>
                  </li>
                ))}
              </ul>
            </SectionReveal>

            {/* Photo right — layered composition */}
            <SectionReveal delay={0.09}>
              <div className="relative mx-auto max-w-[400px] pb-16 md:max-w-none md:pb-0">
                {/* Primary photo */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[0_24px_72px_-16px_rgba(30,110,72,0.24)]">
                  <Image
                    src="/images/legacy/photos/claudia-302.jpg"
                    alt="Claudia Dimmler — Wohlbefinden und Gleichgewicht"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 90vw, 420px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" aria-hidden />
                </div>

                {/* Floating overlay — bottom-right, intrinsic ratio, slight rotation */}
                <div
                  className="absolute -bottom-12 right-0 w-[54%] overflow-hidden rounded-[1.1rem] border-[4px] border-white shadow-[0_12px_48px_rgba(30,110,72,0.20)]"
                  style={{ transform: "rotate(2deg)" }}
                >
                  <Image
                    src="/images/legacy/wp/2022/10/20200419_131335101_iOS-scaled.jpg"
                    alt="Kinesiologie — Instrumente und Notizbücher"
                    width={2560}
                    height={1920}
                    className="w-full h-auto"
                    sizes="240px"
                  />
                </div>

                {/* Decorative glow */}
                <div
                  className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-brand-secondary/35 blur-3xl"
                  aria-hidden
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── S8: TESTIMONIALS — real Google reviews ──────── */}
      {(() => {
        const reviewsWithText = getReviewsSorted(googleReviews).filter(
          (r) => r.reviewBody.trim().length > 5,
        );
        // Feature the longest (most detailed) review; rest sorted newest-first
        const featured = [...reviewsWithText].sort(
          (a, b) => b.reviewBody.length - a.reviewBody.length,
        )[0];
        const rest = reviewsWithText.filter((r) => r !== featured);

        if (!featured) return null;

        return (
          <EmotionalSection
            variant="meadow"
            className="border-y border-black/[0.05] py-16 sm:py-20 md:py-28"
          >
            <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
              <SectionReveal>
                <p className="section-eyebrow">Kundenstimmen</p>
                <h2 className="section-title mt-2">Was meine Klientinnen sagen</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                  Echte Stimmen von Google — ungekürzt und unverändert.
                </p>
              </SectionReveal>

              <div className="mt-12 space-y-5 sm:space-y-6">
                {/* Featured review — full width */}
                <SectionReveal>
                  <figure className="relative overflow-hidden rounded-[1.35rem] border border-black/[0.06] bg-white/88 p-8 shadow-[0_8px_40px_-12px_rgba(30,110,72,0.12)] backdrop-blur-sm sm:p-10 md:p-12">
                    <div
                      className="pointer-events-none absolute right-6 top-2 select-none text-[9rem] font-bold leading-none text-brand/[0.065] sm:right-10 sm:top-4"
                      aria-hidden
                    >
                      &ldquo;
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                      <StarRow rating={featured.reviewRating} />
                      <span className="sr-only">{featured.reviewRating} von 5 Sternen</span>
                    </div>
                    <blockquote className="relative">
                      <p className="max-w-3xl whitespace-pre-line text-[1.05rem] italic leading-[1.82] text-ink sm:text-[1.15rem] md:text-[1.2rem]">
                        {featured.reviewBody}
                      </p>
                    </blockquote>
                    <figcaption className="mt-7 flex items-center gap-3">
                      <div className="h-px w-8 bg-brand/35" aria-hidden />
                      <div>
                        <p className="text-[13.5px] font-semibold text-ink">{featured.authorName}</p>
                        <p className="text-[12px] text-ink-muted">
                          <time dateTime={featured.datePublished}>{formatReviewDate(featured.datePublished)}</time>
                          {" · Google"}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </SectionReveal>

                {/* Remaining reviews in grid */}
                {rest.length > 0 && (
                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                    {rest.map((r, i) => (
                      <SectionReveal key={`${r.authorName}-${r.datePublished}`} delay={(i + 1) * 0.07}>
                        <figure className="flex h-full flex-col rounded-[1.25rem] border border-black/[0.06] bg-white/80 p-7 shadow-[0_4px_24px_rgba(30,110,72,0.07)] backdrop-blur-sm sm:p-8">
                          <div className="mb-3 flex items-center gap-2">
                            <StarRow rating={r.reviewRating} />
                            <span className="sr-only">{r.reviewRating} von 5 Sternen</span>
                          </div>
                          <blockquote className="flex-1">
                            <p className="whitespace-pre-line text-[15px] italic leading-[1.78] text-ink">
                              {r.reviewBody}
                            </p>
                          </blockquote>
                          <figcaption className="mt-5 border-t border-black/[0.06] pt-4">
                            <p className="text-[13px] font-semibold text-ink">{r.authorName}</p>
                            <p className="mt-0.5 text-[12px] text-ink-muted">
                              <time dateTime={r.datePublished}>{formatReviewDate(r.datePublished)}</time>
                              {" · Google"}
                            </p>
                          </figcaption>
                        </figure>
                      </SectionReveal>
                    ))}
                  </div>
                )}
              </div>

              <SectionReveal delay={0.15} className="mt-10 text-center">
                <Link
                  href="/bewertungen"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-brand/30 bg-brand/7 px-6 text-[13.5px] font-semibold text-brand transition hover:border-brand/50 hover:bg-brand/12"
                >
                  Alle Bewertungen ansehen
                  <span aria-hidden>→</span>
                </Link>
              </SectionReveal>
            </div>
          </EmotionalSection>
        );
      })()}

      {/* ── S9: PRAKTISCHE INFOS ────────────────── */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="section-eyebrow">Praktische Infos</p>
            <h2 className="section-title mt-2">Krankenkasse & Anreise</h2>
          </SectionReveal>

          <div className="mt-12 grid gap-8 sm:mt-14 md:grid-cols-2 md:gap-12">
            <SectionReveal delay={0.04}>
              <div className="rounded-[1.25rem] border border-black/[0.07] bg-white p-7 shadow-[0_4px_24px_rgba(30,110,72,0.06)] sm:p-8">
                <h3 className="text-[1rem] font-semibold tracking-[-0.02em] text-ink">
                  Krankenkasse & Abrechnung
                </h3>
                <p className="mt-4 text-[14.5px] leading-[1.78] text-ink-muted">
                  Die Kinesiologie ist eine anerkannte Methode der Komplementärtherapie. Ich bin EMR-zertifiziert, weshalb die Kosten in der Regel über die Zusatzversicherung abgerechnet werden können. Bitte kläre dies vorab mit deiner Kasse.
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.78] text-ink-muted">
                  Als Partnerin von CSS Coin biete ich entsprechende Vorteile für CSS-Versicherte.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-6">
                  <Image src="/images/legacy/logos/emr-zertifiziert.png" alt="EMR zertifiziert" width={130} height={40} className="opacity-65" />
                  <Image src="/images/legacy/logos/kinesuisse.png" alt="KineSuisse" width={120} height={38} className="opacity-65" />
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.09}>
              <div className="rounded-[1.25rem] border border-black/[0.07] bg-white p-7 shadow-[0_4px_24px_rgba(30,110,72,0.06)] sm:p-8">
                <h3 className="text-[1rem] font-semibold tracking-[-0.02em] text-ink">
                  Anreise & Standort
                </h3>
                <p className="mt-4 text-[14.5px] leading-[1.78] text-ink-muted">
                  Praxis an der{" "}
                  <strong className="font-semibold text-ink">Meggerstrasse 4a in Adligenswil.</strong>{" "}
                  Kostenlose Parkplätze direkt vor dem Haus.
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.78] text-ink-muted">
                  Mit dem ÖV: Postauto 73 bis Haltestelle <em>«Sagi»</em>.
                </p>
                <a
                  href={site.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brand/30 bg-brand/7 px-5 text-[13.5px] font-semibold text-brand transition hover:border-brand/50 hover:bg-brand/12"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  Route planen
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── S10: FINAL CTA — with Claudia portrait ────────────── */}
      <section className="relative overflow-hidden py-20 text-white sm:py-24 md:py-32" style={{ background: '#1e6e48' }}>
        {/* Large blush blob — top right */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full blur-[90px]"
          style={{ background: '#f2d5dc', opacity: 0.32 }}
          aria-hidden
        />
        {/* Smaller blush blob — bottom left */}
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full blur-[70px]"
          style={{ background: '#f2d5dc', opacity: 0.18 }}
          aria-hidden
        />
        {/* Soft white radial highlight behind text */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,rgba(255,255,255,0.07),transparent)]"
          aria-hidden
        />

        <div className="page-gutter relative z-[1] mx-auto w-full max-w-[var(--layout-narrow)] text-center">
          <SectionReveal>
            {/* Claudia portrait — personal closing touch */}
            <div className="flex justify-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-[3px] border-white/42 shadow-[0_4px_32px_rgba(0,0,0,0.28),0_0_0_6px_rgba(255,255,255,0.08)]">
                <Image
                  src="/images/legacy/wp/2022/10/claudia_dimmler_cj_2022-140_klein.jpg"
                  alt="Claudia Dimmler"
                  fill
                  className="object-cover object-top"
                  sizes="96px"
                />
              </div>
            </div>

            <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/58">
              Nächster Schritt
            </p>
            <h2 className="mt-4 text-balance text-[1.8rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.4rem] md:text-[3rem]">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.72] text-white/80">
              Egal ob du Entspannung suchst oder gezielt an einem gesundheitlichen Thema arbeiten möchtest — ich freue mich auf dich.
            </p>

            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex min-h-[54px] items-center justify-center rounded-full bg-white px-8 text-[15.5px] font-semibold text-brand shadow-[0_6px_32px_rgba(0,0,0,0.22)] transition hover:bg-brand-soft hover:shadow-[0_8px_40px_rgba(0,0,0,0.28)] active:scale-[0.98]"
            >
              Ersten Termin online buchen
            </a>

            <p className="mt-7 text-[14px] text-white/62">
              <a href={`tel:${site.phoneTel}`} className="transition hover:text-white/90">
                {site.phone}
              </a>
              {" "}&middot;{" "}
              <a href={`mailto:${site.email}`} className="transition hover:text-white/90">
                {site.email}
              </a>
            </p>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
