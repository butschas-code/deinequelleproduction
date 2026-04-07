"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data/site";

type NavChild = { href: string; label: string };

type NavItem =
  | { href: string; label: string }
  | { label: string; children: readonly NavChild[] };

const nav: NavItem[] = [
  {
    label: "Angebote",
    children: [
      { href: "/leistungen/kinesiologie", label: "Kinesiologie" },
      { href: "/leistungen/sport-kinesiologie", label: "Sport-Kinesiologie" },
      { href: "/leistungen/yoga", label: "Hatha Yoga" },
    ],
  },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/bewertungen", label: "Bewertungen" },
  { href: "/kontakt", label: "Kontakt" },
];

function isGroup(item: NavItem): item is { label: string; children: readonly NavChild[] } {
  return "children" in item;
}

export function SiteHeader() {
  const leistungenMenuId = useId();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClass =
    scrolled
      ? "sticky top-0 z-[60] border-b border-black/[0.08] bg-white transition-colors duration-300 ease-out"
      : "sticky top-0 z-[60] border-b border-black/[0.06] bg-white/72 backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,backdrop-filter] duration-300 ease-out supports-[backdrop-filter]:bg-white/64";

  return (
    <header className={headerClass}>
      <div className="page-gutter mx-auto flex w-full max-w-[var(--layout-max)] items-center justify-between gap-3 py-3 sm:gap-4">
        <Link
          href="/"
          className="group flex min-w-0 max-w-[min(100%,420px)] shrink-0 items-center gap-3 focus-visible:outline-offset-4 md:gap-3.5"
        >
          <Image
            src={site.logo.src}
            alt=""
            width={site.logo.width}
            height={site.logo.height}
            priority
            aria-hidden
            className="h-10 w-auto shrink-0 object-contain md:h-12"
            sizes="(max-width: 1024px) 120px, 140px"
          />
          <span className="min-w-0">
            <span className="block truncate text-[1rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.0625rem] md:text-lg">
              {site.name}
            </span>
            <span className="mt-0.5 hidden min-[360px]:block text-[10px] font-medium uppercase tracking-[0.22em] text-brand-complimentary sm:tracking-[0.28em]">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-end gap-x-5 gap-y-2 xl:gap-x-7 2xl:gap-x-8 lg:flex"
          aria-label="Hauptnavigation"
        >
          {nav.map((item) =>
            isGroup(item) ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="-my-1 inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-muted transition-colors duration-200 hover:bg-black/[0.04] hover:text-ink"
                  aria-haspopup="menu"
                  aria-controls={leistungenMenuId}
                >
                  {item.label}
                  <span className="sr-only">— Untermenü öffnen mit Maus oder Tab</span>
                  <svg
                    className="h-3 w-3 opacity-50 transition-transform duration-200 group-hover:translate-y-px group-focus-within:translate-y-px"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <path d="M3 4.5 6 7.5 9 4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  id={leistungenMenuId}
                  className="pointer-events-none invisible absolute left-1/2 top-full z-[70] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
                  role="menu"
                  aria-label={`${item.label} — Unterseiten`}
                >
                  <ul className="min-w-[220px] rounded-xl border border-black/[0.08] bg-white py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]">
                    {item.children.map((sub) => (
                      <li key={sub.href} role="none">
                        <Link
                          href={sub.href}
                          role="menuitem"
                          className="block px-4 py-3 text-[13px] font-medium text-ink-muted transition-colors hover:bg-brand-soft hover:text-ink"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="-my-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-muted transition-colors duration-200 hover:bg-black/[0.04] hover:text-ink"
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition duration-200 hover:bg-brand-hover"
          >
            Termin buchen
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-brand px-3.5 text-xs font-semibold text-white sm:min-w-0 sm:px-4"
          >
            Termin
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-black/10 px-3 text-[13px] font-medium text-ink transition hover:bg-black/[0.03] sm:min-w-0 sm:px-4"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Schliessen" : "Menü"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-black/[0.06] bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="page-gutter flex flex-col py-4" aria-label="Mobile Navigation">
              {nav.map((item, i) =>
                isGroup(item) ? (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-complimentary">
                      {item.label}
                    </p>
                    {item.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="flex min-h-[48px] items-center rounded-lg py-2 pl-8 pr-3 text-[15px] text-ink-muted transition hover:bg-paper hover:text-ink"
                        onClick={() => setOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      className="flex min-h-[48px] items-center rounded-lg px-3 py-2.5 text-[15px] text-ink-muted transition hover:bg-paper hover:text-ink"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
