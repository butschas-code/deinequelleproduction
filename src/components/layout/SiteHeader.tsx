"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { site } from "@/data/site";

const nav = [
  { href: "/leistungen/kinesiologie", label: "Kinesiologie" },
  { href: "/leistungen/kinderwunsch", label: "Kinderwunsch" },
  { href: "/leistungen/yoga", label: "Yoga" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

const leftNav = nav.slice(0, 3);
const rightNav = nav.slice(3);

const SCROLL_RANGE = 96;

const DESKTOP_FULL_HEIGHT = 158;
const DESKTOP_COMPACT_HEIGHT = 54;
const MOBILE_FULL_HEIGHT = 69;
const MOBILE_COMPACT_HEIGHT = 40;

type ScrollLogoProps = {
  fullHeight: number;
  compactHeight: number;
  widthClass: string;
  barHeightClass: string;
  align: "left" | "center";
};

function ScrollLogo({
  fullHeight,
  compactHeight,
  widthClass,
  barHeightClass,
  align,
}: ScrollLogoProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const end = reduceMotion ? 1 : SCROLL_RANGE;

  const fullWidth = Math.round(fullHeight * (site.logo.width / site.logo.height));
  const compactWidth = Math.round(
    compactHeight * (site.logoCompact.width / site.logoCompact.height),
  );

  const fullOpacity = useTransform(scrollY, [0, end * 0.55], [1, 0], { clamp: true });
  const compactOpacity = useTransform(scrollY, [end * 0.35, end], [0, 1], {
    clamp: true,
  });

  const fullPosition =
    align === "center"
      ? "absolute left-1/2 top-1 -translate-x-1/2"
      : "absolute left-0 top-1";

  const compactPosition =
    align === "center"
      ? "absolute inset-0 flex items-center justify-center"
      : "absolute inset-0 flex items-center justify-start";

  return (
    <Link
      href="/"
      aria-label={site.name}
      className={`relative z-[90] block shrink-0 overflow-visible ${widthClass} ${barHeightClass}`}
    >
      <motion.div
        className={`pointer-events-none ${fullPosition}`}
        style={{ opacity: fullOpacity }}
        aria-hidden
      >
        <Image
          src={site.logo.src}
          alt=""
          width={fullWidth}
          height={fullHeight}
          priority
          unoptimized
          className="block max-w-none object-contain"
          style={{ width: fullWidth, height: fullHeight }}
        />
      </motion.div>

      <motion.div
        className={`pointer-events-none ${compactPosition}`}
        style={{ opacity: compactOpacity }}
        aria-hidden
      >
        <Image
          src={site.logoCompact.src}
          alt=""
          width={compactWidth}
          height={compactHeight}
          priority
          unoptimized
          className="block max-w-none object-contain"
          style={{ width: compactWidth, height: compactHeight }}
        />
      </motion.div>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setPinned(value > SCROLL_RANGE * 0.72);
  });

  // Lock body scroll while the mobile menu is open. Avoids the "page scrolls
  // behind the menu" problem on iOS Safari.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[80] border-b border-black/[0.08] bg-[var(--paper)]/95 backdrop-blur-xl ${
        pinned ? "overflow-hidden" : "overflow-visible"
      }`}
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--layout-wide)] overflow-visible">
        {/* ── Mobile ── */}
        <div className="relative flex h-16 items-center justify-between gap-3 overflow-visible lg:hidden">
          <ScrollLogo
            fullHeight={MOBILE_FULL_HEIGHT}
            compactHeight={MOBILE_COMPACT_HEIGHT}
            widthClass="w-[min(210px,54vw)]"
            barHeightClass="h-16"
            align="left"
          />
          <div className="flex items-center gap-2">
            <Link
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[4px] bg-brand px-4 text-[13px] font-semibold tracking-[0.02em] text-white shadow-[0_4px_16px_-6px_rgba(58,92,61,0.45)] transition active:scale-[0.98]"
            >
              Termin
            </Link>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] border border-black/10 px-3 text-[14px] font-medium text-ink transition active:bg-black/[0.04]"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "Schliessen" : "Menü"}
            </button>
          </div>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden h-[78px] grid-cols-[1fr_auto_1fr] items-center gap-x-8 overflow-visible lg:grid">
          <nav
            className="flex items-center justify-end gap-1"
            aria-label="Hauptnavigation links"
          >
            {leftNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-[4px] px-2.5 py-2 text-[14px] font-medium text-ink-muted transition-colors hover:bg-black/[0.04] hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ScrollLogo
            fullHeight={DESKTOP_FULL_HEIGHT}
            compactHeight={DESKTOP_COMPACT_HEIGHT}
            widthClass="w-[min(420px,35vw)]"
            barHeightClass="h-[78px]"
            align="center"
          />

          <nav
            className="flex items-center justify-start gap-1"
            aria-label="Hauptnavigation rechts"
          >
            {rightNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-[4px] px-2.5 py-2 text-[14px] font-medium text-ink-muted transition-colors hover:bg-black/[0.04] hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 whitespace-nowrap rounded-[4px] bg-brand px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-hover"
            >
              Termin buchen
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile sheet — collapses from the top with a soft easing.
          Kept as a sibling of the header bar so the scroll-locked viewport
          beneath stays out of the way. */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`grid overflow-hidden border-t border-black/[0.06] bg-white/97 backdrop-blur-xl transition-[grid-template-rows,opacity] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease-cinematic)" }}
      >
        <nav
          className="page-gutter mx-auto flex w-full min-h-0 max-w-[var(--layout-wide)] flex-col py-2"
          aria-label="Mobile Navigation"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-[52px] items-center border-b border-black/[0.06] px-1 text-[16px] text-ink-muted transition active:bg-black/[0.03] active:text-ink last:border-b-0"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 mt-3 mb-3 inline-flex min-h-[52px] items-center justify-center rounded-[4px] bg-brand px-5 text-[14px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_8px_24px_-10px_rgba(58,92,61,0.55)]"
            onClick={() => setOpen(false)}
          >
            Termin online buchen
          </Link>
        </nav>
      </div>
    </header>
  );
}
