"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export function DeineQuelleDesignRuntime() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const page = document.querySelector<HTMLElement>(".deinequelle-design-page");
    if (!page) return;

    const progress = document.querySelector<HTMLElement>("#progress");
    const spreads = Array.from(page.querySelectorAll<HTMLElement>("[data-parallax]"));
    const nav = document.querySelector<HTMLElement>("#nav");
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 960;

    const reveals = Array.from(page.querySelectorAll<HTMLElement>(".reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("vis");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -36px 0px" },
    );

    reveals.forEach((element) => observer.observe(element));

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;

      if (progress) {
        progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      }

      if (nav) {
        nav.classList.toggle("scrolled", y > 50);
      }

      if (!isMobile) {
        spreads.forEach((element) => {
          const parent = element.parentElement;
          if (!parent) return;

          const rect = parent.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;

          const progressThroughSection =
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          element.style.transform = `translateY(${(progressThroughSection - 0.5) * 20}%)`;
        });
      }
    };

    const hashLinks = Array.from(
      page.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    const onHashClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = page.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", hash);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    hashLinks.forEach((link) => link.addEventListener("click", onHashClick));

    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      hashLinks.forEach((link) => link.removeEventListener("click", onHashClick));
    };
  }, [pathname]);

  return null;
}
