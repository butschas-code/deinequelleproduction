"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 480;

type ScrollToTopButtonProps = {
  variant?: "design" | "site";
};

export function ScrollToTopButton({ variant = "design" }: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const className =
    variant === "site"
      ? `scroll-to-top-site${visible ? " is-visible" : ""}`
      : `scroll-to-top${visible ? " is-visible" : ""}`;

  return (
    <button
      type="button"
      className={className}
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      title="Nach oben"
    >
      <span className="scroll-to-top-icon" aria-hidden="true">
        ↑
      </span>
    </button>
  );
}
