"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { designNavItems } from "@/data/designNavItems";

export function DesignNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMenuOpen(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div id="progress" aria-hidden="true" />
      <div
        id="mob-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={menuOpen ? "open" : undefined}
      >
        {designNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="mob-link"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/kontakt" className="mob-link" onClick={() => setMenuOpen(false)}>
          Kontakt
        </Link>
      </div>

      <nav id="nav" aria-label="Hauptnavigation">
        <div className="nav-logo-wrap">
          <Link href="/" className="nav-logo-link" aria-label="DeineQuelle">
            <img src={site.logo.src} alt="DeineQuelle Logo" className="nav-logo-img" />
          </Link>
        </div>
        <div className="nav-links">
          {designNavItems.map((item) => (
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
        <button
          className={`nav-ham${menuOpen ? " open" : ""}`}
          id="ham"
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
}
