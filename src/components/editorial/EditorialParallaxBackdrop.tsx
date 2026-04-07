"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type Props = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  /** Gleiche Stärken wie EditorialQuoteBand */
  parallax?: "standard" | "strong";
  /** Sichtbare Bandhöhe */
  minHeightClass?: string;
};

const PARALLAX = {
  standard: { y: ["-9%", "9%"] as const, scaleClass: "scale-[1.06]" },
  strong: { y: ["-26%", "26%"] as const, scaleClass: "scale-[1.16]" },
};

export function EditorialParallaxBackdrop({
  imageSrc,
  imageAlt,
  children,
  parallax = "strong",
  minHeightClass = "min-h-[min(48vh,480px)] sm:min-h-[min(52vh,560px)] md:min-h-[min(62vh,680px)]",
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cfg = PARALLAX[parallax];
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [cfg.y[0], cfg.y[1]],
  );

  return (
    <section
      ref={ref}
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden border-y border-[#918a8f]/25"
      aria-label={imageAlt}
    >
      <div className={`relative flex w-full items-center ${minHeightClass}`}>
        <motion.div
          className={`absolute inset-0 will-change-transform ${cfg.scaleClass}`}
          style={{ y: imgY }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4e3b44]/[0.78] via-[#595e49]/[0.52] to-[#918a8f]/[0.34]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#595e49]/[0.12] via-[#4e3b44]/[0.22] to-[#4e3b44]/[0.48]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#cdd9c7]/[0.08]"
          aria-hidden
        />

        <div className="page-gutter relative z-[1] mx-auto w-full max-w-[var(--layout-narrow)] py-12 sm:py-16 md:py-24">
          {children}
        </div>
      </div>
    </section>
  );
}
