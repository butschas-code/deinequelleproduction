import type { CSSProperties } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import type { DesignPageData } from "@/data/deinequelleDesignPages";
import { DeineQuelleDesignRuntime } from "@/components/home/DeineQuelleDesignRuntime";
import { GuideSectionAccordion } from "@/components/deinequelle/GuideSectionAccordion";

const navItems = [
  { href: "/leistungen/kinesiologie", label: "Kinesiologie" },
  { href: "/leistungen/kinderwunsch", label: "Kinderwunsch" },
  { href: "/leistungen/yoga", label: "Yoga" },
  { href: "/ueber-mich", label: "Über mich" },
] as const;

export function DesignNav() {
  return (
    <>
      <div id="progress" aria-hidden="true" />
      <div id="mob-overlay" role="dialog" aria-modal="true" aria-label="Navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="mob-link">
            {item.label}
          </Link>
        ))}
        <Link href="/kontakt" className="mob-link">
          Kontakt
        </Link>
      </div>

      <nav id="nav" aria-label="Hauptnavigation">
        <div className="nav-logo-wrap">
          <Link href="/" className="nav-logo-link" aria-label="DeineQuelle">
            <img
              src={site.logo.src}
              alt="DeineQuelle Logo"
              className="nav-logo-img"
            />
          </Link>
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <Link href="/kontakt" className="nav-cta">
          Kontakt
          <span className="nav-cta-icon" aria-hidden>
            ↗
          </span>
        </Link>
        <button className="nav-ham" id="ham" aria-label="Menü öffnen" aria-expanded="false" type="button">
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
}

export function Hero({ page }: { page: DesignPageData }) {
  const primaryAction = page.heroActions?.primary ?? {
    label: page.finalCta?.primaryLabel ?? "Kontakt aufnehmen",
    href: page.finalCta?.primaryHref ?? "/kontakt",
    external: page.finalCta?.primaryExternal,
  };
  const secondaryAction = page.heroActions?.secondary ?? {
    label: "Mehr erfahren",
    href: "#content",
  };
  const showSecondaryHeroAction = page.heroActions?.secondary !== undefined || !page.heroActions;

  return (
    <>
      <section
        id="hero"
        className={page.heroEmphasisTone === "wine" ? "hero-em-wine" : undefined}
        style={
          page.heroObjectPosition ||
          page.heroObjectPositionMobile ||
          page.heroImageHeight
            ? ({
                ...(page.heroObjectPosition
                  ? { "--hero-object-position": page.heroObjectPosition }
                  : {}),
                ...(page.heroObjectPositionMobile
                  ? { "--hero-object-position-mobile": page.heroObjectPositionMobile }
                  : {}),
                ...(page.heroImageHeight
                  ? { "--hero-image-height": page.heroImageHeight }
                  : {}),
              } as React.CSSProperties)
            : undefined
        }
      >
        <div className="hero-bg">
          <img
            id="hero-img"
            src={page.heroImage}
            alt={page.heroAlt}
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="dq-kicker">{page.eyebrow}</p>
          <h1 className="hero-h1">
            {page.title.split("\n").map((line, index) => (
              <span key={index}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
            {page.titleEmphasis ? (
              <>
                <br />
                <em>{page.titleEmphasis}</em>
              </>
            ) : null}
          </h1>
          <p className="hero-sub">{page.intro}</p>
          <div className="hero-actions">
            <a
              href={primaryAction.href}
              className="btn-primary"
              target={primaryAction.external ? "_blank" : undefined}
              rel={primaryAction.external ? "noopener noreferrer" : undefined}
            >
              {primaryAction.label}
              <span className="btn-pi" aria-hidden>
                ↗
              </span>
            </a>
            {showSecondaryHeroAction ? (
              <a
                href={secondaryAction.href}
                className="btn-ghost"
                target={secondaryAction.external ? "_blank" : undefined}
                rel={secondaryAction.external ? "noopener noreferrer" : undefined}
              >
                {secondaryAction.label}
                {secondaryAction.href.startsWith("#") ? "" : " ↗"}
              </a>
            ) : null}
          </div>
          <p className="hero-location">Adligenswil bei Luzern</p>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <div className="scroll-line" />
        </div>
      </section>

      {page.trustItems ? (
        <div id="trust">
          <div className="trust-row">
            {page.trustItems.map((item, index) => (
              <span key={item}>
                {index > 0 ? <span className="trust-dot">•</span> : null}
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

function QuoteSection({
  quote,
  theme = "beige",
}: {
  quote?: string;
  theme?:
    | "beige"
    | "sage-soft"
    | "sage"
    | "warm-soft"
    | "warm"
    | "warm-deep"
    | "wine-soft"
    | "wine";
}) {
  if (!quote) return null;

  const themeClass =
    theme === "sage-soft"
      ? "erkl-sage-soft"
      : theme === "sage"
        ? "erkl-sage"
        : theme === "warm-soft"
          ? "erkl-warm-soft"
          : theme === "warm"
            ? "erkl-warm"
            : theme === "warm-deep"
              ? "erkl-warm-deep"
              : theme === "wine-soft"
              ? "erkl-wine-soft"
              : theme === "wine"
                ? "erkl-wine"
                : undefined;

  return (
    <section id="erklaert" className={themeClass}>
      <div className="erkl-inner">
        <blockquote className="erkl-quote reveal">„{quote}”</blockquote>
      </div>
    </section>
  );
}

function guideSurfaceClass(theme?: NonNullable<DesignPageData["guideSection"]>["theme"]) {
  switch (theme) {
    case "sage":
      return " begl-sage";
    case "sage-soft":
      return " begl-sage-soft";
    case "sage-deep":
      return " begl-sage-deep";
    case "warm":
      return " begl-warm";
    case "warm-soft":
      return " begl-warm-soft";
    case "warm-deep":
      return " begl-warm-deep";
    default:
      return "";
  }
}

function GuideSection({ guide }: { guide: NonNullable<DesignPageData["guideSection"]> }) {
  const surfaceClass = guideSurfaceClass(guide.theme);

  if (guide.layout === "accordion") {
    return <GuideSectionAccordion guide={guide} surfaceClass={surfaceClass} />;
  }

  return (
    <section id="begleitung" className={surfaceClass.trim() || undefined}>
      <div className="wrap">
        <div className="begl-head reveal">
          <h2 className="begl-h2">
            {guide.title}
            {guide.titleEmphasis ? (
              <>
                <br />
                {guide.titleEmphasis}
              </>
            ) : null}
          </h2>
          <p className="begl-intro">{guide.intro}</p>
        </div>
        <div className="begl-rows">
          {guide.categories.map((row) => (
            <article key={row.number} className="begl-row begl-row-rich reveal">
              <span className="begl-num">{row.number}</span>
              <div className="begl-rich-body">
                <h3 className="begl-cat">{row.category}</h3>
                <p className="begl-lead">{row.lead}</p>
                <ul className="begl-list">
                  {row.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {row.goal ? <p className="begl-goal">{row.goal}</p> : null}
              </div>
            </article>
          ))}
        </div>
        {guide.footnote ? <p className="begl-footnote reveal">{guide.footnote}</p> : null}
      </div>
    </section>
  );
}

function GuideRowsLegacy({ rows }: { rows: NonNullable<DesignPageData["guideRows"]> }) {
  return (
    <section id="begleitung">
      <div className="wrap">
        <div className="begl-head reveal">
          <h2 className="begl-h2">
            Wobei ich
            <br />
            dich begleite
          </h2>
          <p className="begl-intro">
            Beschwerden werden als Ausdruck einer verminderten Selbstregulation betrachtet. Die ganzheitliche
            Sichtweise von Körper, Geist und Seele öffnet den Blick für Ressourcen und nächste Schritte.
          </p>
        </div>
        <div className="begl-rows">
          {rows.map((row) => (
            <div key={row.number} className="begl-row reveal">
              <span className="begl-num">{row.number}</span>
              <span className="begl-cat">{row.category}</span>
              <span className="begl-items">{row.items}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuideRows({ page }: { page: DesignPageData }) {
  if (page.guideSection) return null;
  if (!page.guideRows) return null;
  return <GuideRowsLegacy rows={page.guideRows} />;
}

function SectionHeading({
  section,
  className = "",
}: {
  section: DesignPageData["sections"][number];
  className?: string;
}) {
  return (
    <div className={className}>
      {section.kicker ? <p className="dq-kicker">{section.kicker}</p> : null}
      <h2 className="spread-h2">
        {section.title}
        {section.titleEmphasis ? (
          <>
            <br />
            <em>{section.titleEmphasis}</em>
          </>
        ) : null}
      </h2>
    </div>
  );
}

function sectionImageStyle(
  section: DesignPageData["sections"][number],
): CSSProperties {
  const style: Record<string, string> = {};

  if (section.imageObjectPosition) {
    style["--img-object-position"] = section.imageObjectPosition;
  }
  if (section.imageObjectPositionMobile) {
    style["--img-object-position-mobile"] = section.imageObjectPositionMobile;
  }
  if (section.imageFlipHorizontal) {
    style.transform = "scaleX(-1)";
  }

  return style as CSSProperties;
}

function ContentSection({
  section,
  dense,
}: {
  section: DesignPageData["sections"][number];
  dense?: boolean;
}) {
  const spreadClass = {
    sage: "sage-spread",
    "sage-soft": "sage-soft-spread",
    "sage-deep": "sage-deep-spread",
    wine: "wine-spread",
    "wine-soft": "wine-soft-spread",
    "wine-deep": "wine-deep-spread",
    warm: "warm-spread",
    "warm-soft": "warm-soft-spread",
    "warm-deep": "warm-deep-spread",
    light: "light-spread",
  }[section.theme];
  const bgClass = {
    sage: "sage-bg",
    "sage-soft": "sage-soft-bg",
    "sage-deep": "sage-deep-bg",
    wine: "blush-bg",
    "wine-soft": "wine-soft-bg",
    "wine-deep": "wine-deep-bg",
    warm: "warm-bg",
    "warm-soft": "warm-soft-bg",
    "warm-deep": "warm-deep-bg",
    light: "beige-bg",
  }[section.theme];
  const buttonTone =
    section.cta?.tone ??
    (section.theme === "wine" ||
    section.theme === "wine-soft" ||
    section.theme === "wine-deep"
      ? "wine"
      : section.theme === "warm" ||
          section.theme === "warm-soft" ||
          section.theme === "warm-deep" ||
          section.theme === "light"
        ? "accent"
        : "sage");
  const presentation =
    section.presentation ?? (section.hideSpread ? "head" : "spread");
  const splitMediaRight = section.splitMedia === "right";
  const splitBodyFullWidth = presentation === "split" && section.splitBodyFullWidth;
  const hasItems = Boolean(section.items?.length);
  const itemsAsTopics = section.itemsVariant === "topics";
  let editorialLayout: "single" | "editorial" | "prose" =
    section.layout ?? (hasItems && !itemsAsTopics ? "editorial" : "single");
  if (itemsAsTopics || presentation === "split" || presentation === "cover") {
    editorialLayout = "single";
  }
  if (
    dense &&
    !hasItems &&
    editorialLayout === "single" &&
    presentation !== "split" &&
    presentation !== "cover"
  ) {
    editorialLayout = "prose";
  }
  const proseColumns =
    (presentation === "cover" || dense) && section.body.length >= 2 && !hasItems;
  const noteVariant = section.noteVariant ?? "editorial";
  const isCallout = noteVariant === "callout";
  const isTagline = noteVariant === "tagline";
  const isEditorialNote = noteVariant === "editorial";
  const inlineNote =
    !isCallout && (isTagline || (itemsAsTopics && isEditorialNote));
  const tight = section.density === "tight";

  const noteEl = section.note ? (
    <p
      className={`svc-note${
        inlineNote ? " svc-note-inline" : " svc-note-full"
      }${
        isCallout
          ? ""
          : isTagline
            ? " svc-note-tagline"
            : " svc-note-editorial"
      } reveal d3`}
    >
      {section.note}
    </p>
  ) : null;

  const itemsBlock = section.items ? (
    <div
      className={`svc-items-col reveal d1${
        itemsAsTopics ? " svc-items-topics" : ""
      }`}
    >
      {section.itemsIntro ? (
        <p className="svc-items-intro">{section.itemsIntro}</p>
      ) : null}
      {itemsAsTopics ? (
        <div className="svc-items-matrix">
          {section.items.map((item) => (
            <div key={item} className="svc-item">
              {item}
            </div>
          ))}
        </div>
      ) : (
        section.items.map((item) => (
          <div key={item} className="svc-item">
            {item}
          </div>
        ))
      )}
    </div>
  ) : null;

  const featuresBlock = section.features?.length ? (
    <div className="svc-features reveal d2">
      {section.features.map((feature, index) => (
        <article key={feature.title} className="svc-feature">
          <p className="svc-feature-num">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="svc-feature-title">{feature.title}</h3>
          <p className="svc-feature-body">{feature.body}</p>
        </article>
      ))}
    </div>
  ) : null;

  const hasFeatures = Boolean(section.features?.length);
  const proseBody =
    section.body.length > 0 ? (
      <div className={proseColumns ? "svc-prose-columns reveal" : undefined}>
        {section.body.map((paragraph, index) => (
          <p
            key={paragraph}
            className={`svc-body reveal d${Math.min(index + 1, 3)}${
              index === section.body.length - 1 ? " svc-body-last" : ""
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    ) : null;

  const editorialBlock = (
    <div
      className={`svc-editorial${
        editorialLayout === "single"
          ? ` svc-editorial-single${
              itemsAsTopics || hasFeatures
                ? " svc-editorial-flow svc-editorial-topics"
                : ""
            }${inlineNote ? " svc-editorial-closer" : ""}${tight ? " svc-editorial-tight" : ""}${
              hasFeatures ? " svc-editorial-features" : ""
            }`
          : editorialLayout === "prose"
            ? " svc-editorial-prose"
            : ""
      }`}
    >
      <div className="svc-prose-block">
        <p className="svc-lead reveal">{section.lead}</p>
        {splitBodyFullWidth ? null : proseBody}
        {section.cta ? (
          <a
            href={section.cta.href}
            className={`btn btn-${buttonTone} reveal d3`}
            target={section.cta.external ? "_blank" : undefined}
            rel={section.cta.external ? "noopener noreferrer" : undefined}
          >
            {section.cta.label}
            <span className="btn-icon" aria-hidden>
              ↗
            </span>
          </a>
        ) : null}
      </div>

      {itemsBlock}
      {featuresBlock}
      {inlineNote ? noteEl : null}
    </div>
  );

  const coverBlock =
    presentation === "cover" ? (
      <div className="svc-cover-content">
        {section.lead ? (
          <p className="svc-lead svc-cover-lead reveal">{section.lead}</p>
        ) : null}
        {section.body.length > 0 ? (
          <div className={proseColumns ? "svc-prose-columns reveal d1" : undefined}>
            {section.body.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`svc-body${
                  proseColumns ? "" : ` reveal d${Math.min(index + 1, 3)}`
                }${index === section.body.length - 1 ? " svc-body-last" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    ) : null;

  return (
    <section id={section.id}>
      {presentation === "spread" || presentation === "compact" ? (
        <div
          className={`spread ${spreadClass}${
            presentation === "compact" ? " spread-compact" : ""
          }`}
        >
          <div
            className="spread-inner"
            data-parallax
            style={section.imageInset ? ({ inset: section.imageInset } as CSSProperties) : undefined}
          >
            {section.image ? (
              <img
                src={section.image}
                alt={section.imageAlt ?? ""}
                style={sectionImageStyle(section)}
              />
            ) : null}
          </div>
          <div className="spread-intro reveal">
            <SectionHeading section={section} />
          </div>
        </div>
      ) : null}

      <div
        className={`svc ${bgClass}${
          presentation === "head" ? " svc-with-head" : ""
        }${presentation === "split" ? " svc-with-split" : ""}${
          presentation === "cover" ? " svc-with-cover" : ""
        }${tight ? " svc-density-tight" : ""}`}
      >
        <div className="wrap">
          {presentation === "cover" ? (
            <>
              <SectionHeading
                section={section}
                className="svc-section-head svc-section-head-cover reveal"
              />
              {coverBlock}
            </>
          ) : null}

          {presentation === "head" ? (
            <SectionHeading section={section} className="svc-section-head reveal" />
          ) : null}

          {presentation === "split" ? (
            <>
              <div
                className={`svc-split${
                  splitMediaRight ? " svc-split-media-right" : ""
                }`}
              >
                <div className="svc-split-media reveal">
                  {section.image ? (
                    <img
                      src={section.image}
                      alt={section.imageAlt ?? ""}
                      style={sectionImageStyle(section)}
                    />
                  ) : null}
                </div>
                <div className="svc-split-content">
                  <SectionHeading
                    section={section}
                    className="svc-section-head svc-section-head-split reveal"
                  />
                  {editorialBlock}
                </div>
              </div>
              {splitBodyFullWidth && proseBody ? (
                <div className="svc-split-body-full">{proseBody}</div>
              ) : null}
            </>
          ) : presentation !== "cover" ? (
            editorialBlock
          ) : null}

          {section.note && !inlineNote ? noteEl : null}

        </div>
      </div>
    </section>
  );
}

function Process({ process }: { process?: DesignPageData["process"] }) {
  if (!process) return null;

  return (
    <section
      id="schritte"
      className={
        process.theme === "light"
          ? "schritte-light"
          : process.theme === "wine"
            ? "schritte-wine"
            : process.theme === "warm"
              ? "schritte-warm"
              : undefined
      }
    >
      <div className="wrap">
        <h2 className="schritte-h2 reveal">
          {process.title} <em>{process.emphasis}</em>
        </h2>
        <div className="schritte-cols">
          {process.steps.map((step, index) => (
            <div key={step.title} className={`schritt reveal d${index}`}>
              <p className="schritt-num">{index + 1}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ cta }: { cta?: DesignPageData["finalCta"] }) {
  if (!cta) return null;

  return (
    <section id="cta-final">
      <div className="wrap">
        <div className="cta-grid">
          <div>
            <h2 className="cta-h2 reveal">
              {cta.title}
              <br />
              <em>{cta.emphasis}</em>
            </h2>
            <p className="cta-sub reveal d1">{cta.body}</p>
          </div>
          <div className="cta-right reveal d2">
            <div className="cta-actions">
              <a
                href={cta.primaryHref}
                className="btn-dark"
                target={cta.primaryExternal ? "_blank" : undefined}
                rel={cta.primaryExternal ? "noopener noreferrer" : undefined}
              >
                {cta.primaryLabel}
                <span className="btn-pi" aria-hidden>
                  ↗
                </span>
              </a>
              {cta.secondaryLabel && cta.secondaryHref ? (
                <a
                  href={cta.secondaryHref}
                  className="btn-ghost cta-secondary"
                  target={cta.secondaryExternal ? "_blank" : undefined}
                  rel={cta.secondaryExternal ? "noopener noreferrer" : undefined}
                >
                  {cta.secondaryLabel}
                </a>
              ) : null}
            </div>
            <div className="cta-contact">
              <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DesignFooter() {
  return (
    <footer>
      <div className="footer-wrap">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <img src={site.logo.src} alt="DeineQuelle Logo" className="footer-logo" />
            <p className="footer-desc">Ganzheitliche Begleitung mit Kinesiologie und Yoga für Körper, Geist und Seele.</p>
            <div className="footer-partner-logos">
              <img src="/images/other/emr_zertifiziert_gs.png" alt="EMR zertifiziert" className="partner-logo" />
              <img src="/images/other/css coin.png" alt="CSS Coin Partnerin" className="partner-logo" />
            </div>
          </div>
          <div className="footer-col links-col">
            <h4>Navigation</h4>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/kontakt">Kontakt</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col contact-col">
            <h4>Kontakt</h4>
            <address>
              <strong>DeineQuelle · Claudia Dimmler</strong>
              <br />
              Meggerstrasse 4a
              <br />
              6043 Adligenswil
              <br />
              <span className="contact-methods">
                <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </span>
            </address>
          </div>
          <div className="footer-col map-col">
            <h4>Standort</h4>
            <div className="footer-map-container">
              <iframe
                title="Karte: DeineQuelle, Adligenswil"
                src={site.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) sepia(0.2) contrast(0.9) brightness(0.95)", borderRadius: 4 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 DeineQuelle · Claudia Dimmler, Adligenswil. Alle Rechte vorbehalten.</p>
          <p>
            <Link href="/impressum">Impressum</Link> · <Link href="/datenschutz">Datenschutz</Link> · <Link href="/agb">AGB</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function DesignPage({ page }: { page: DesignPageData }) {
  const dense = page.contentLayout === "dense";
  const showQuoteAfterHero = page.quote && !page.quoteAfterSectionId;

  return (
    <>
      <main className={`deinequelle-design-page${dense ? " design-page-longform" : ""}`}>
        <DesignNav />
        <Hero page={page} />
        {showQuoteAfterHero ? (
          <QuoteSection quote={page.quote} theme={page.quoteTheme} />
        ) : null}
        <div id="content">
          <GuideRows page={page} />
          {page.sections.map((section) => (
            <div key={section.id}>
              <ContentSection section={section} dense={dense} />
              {page.quote && page.quoteAfterSectionId === section.id ? (
                <QuoteSection quote={page.quote} theme={page.quoteTheme} />
              ) : null}
              {page.guideSection && page.guideAfterSectionId === section.id ? (
                <GuideSection guide={page.guideSection} />
              ) : null}
            </div>
          ))}
          <Process process={page.process} />
          <FinalCta cta={page.finalCta} />
        </div>
        <DesignFooter />
      </main>
      <DeineQuelleDesignRuntime />
    </>
  );
}
