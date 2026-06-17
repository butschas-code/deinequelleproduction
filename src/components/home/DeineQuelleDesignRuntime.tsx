"use client";

import { useLayoutEffect } from "react";

function revealIfInView(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  if (rect.top < viewportHeight * 0.94 && rect.bottom > 0) {
    element.classList.add("vis");
  }
}

export function DeineQuelleDesignRuntime() {
  useLayoutEffect(() => {
    const page = document.querySelector<HTMLElement>(".deinequelle-design-page");
    if (!page) return;

    const progress = page.querySelector<HTMLElement>("#progress");
    const heroImg = page.querySelector<HTMLElement>("#hero-img");
    const spreads = Array.from(page.querySelectorAll<HTMLElement>("[data-parallax]"));
    const nav = page.querySelector<HTMLElement>("#nav");
    const ham = page.querySelector<HTMLButtonElement>("#ham");
    const overlay = page.querySelector<HTMLElement>("#mob-overlay");
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 960;

    const reveals = Array.from(page.querySelectorAll<HTMLElement>(".reveal"));
    reveals.forEach(revealIfInView);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("vis");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px 8% 0px" },
    );

    reveals.forEach((element) => {
      if (!element.classList.contains("vis")) {
        observer.observe(element);
      }
    });

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
        if (heroImg) {
          heroImg.style.transform = `translateY(${y * 0.26}px)`;
        }

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

    const toggleMenu = (open: boolean) => {
      if (!ham || !overlay) return;

      ham.classList.toggle("open", open);
      overlay.classList.toggle("open", open);
      ham.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    };

    const onHamClick = () => {
      toggleMenu(!overlay?.classList.contains("open"));
    };
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && overlay?.classList.contains("open")) {
        toggleMenu(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    ham?.addEventListener("click", onHamClick);
    overlay
      ?.querySelectorAll<HTMLAnchorElement>(".mob-link")
      .forEach((link) => link.addEventListener("click", () => toggleMenu(false)));
    document.addEventListener("keydown", onKeydown);
    onScroll();

    const revealFallback = window.setTimeout(() => {
      reveals.forEach((element) => element.classList.add("vis"));
    }, 1800);

    return () => {
      window.clearTimeout(revealFallback);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      ham?.removeEventListener("click", onHamClick);
      document.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
