"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type Props = {
  quote: string;
  imageSrc: string;
  imageAlt: string;
  align?: "left" | "right";
  /** standard: leichter Parallax; strong: deutlich stärker (z. B. Home unter Leistungen) */
  parallax?: "standard" | "strong";
  /** Standard: ursprünglicher Mehrfarben-Verlauf. primaryShade: nur Primär hell→dunkel (z. B. 2. Home-Parallax) */
  overlay?: "gradient" | "primaryShade";
};

/** Primär (#595e49): hell → dunkel — nur für `overlay="primaryShade"` */
function primaryShadeGradient(align: "left" | "right"): string {
  const dark = "rgba(58, 62, 48, 0.44)";
  const mid = "rgba(89, 94, 73, 0.26)";
  const light = "rgba(185, 192, 175, 0.14)";
  return align === "right"
    ? `linear-gradient(to left, ${dark} 0%, ${mid} 48%, ${light} 100%)`
    : `linear-gradient(to right, ${dark} 0%, ${mid} 48%, ${light} 100%)`;
}

const PARALLAX = {
  standard: { y: ["-9%", "9%"] as const, scaleClass: "scale-[1.06]" },
  strong: { y: ["-26%", "26%"] as const, scaleClass: "scale-[1.16]" },
};

export function EditorialQuoteBand({
  quote,
  imageSrc,
  imageAlt,
  align = "left",
  parallax = "standard",
  overlay = "gradient",
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
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
      aria-label="Stimmungsbild mit Zitat"
    >
      <div className="relative min-h-[min(42vh,420px)] w-full sm:min-h-[min(48vh,500px)] md:min-h-[min(58vh,640px)]">
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

        {overlay === "primaryShade" ? (
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: primaryShadeGradient(align) }}
            aria-hidden
          />
        ) : (
          <>
            <div
              className={
                align === "left"
                  ? "pointer-events-none absolute inset-0 bg-gradient-to-r from-[#4e3b44]/90 via-[#595e49]/58 to-[#cdd9c7]/14 md:via-[#595e49]/46"
                  : "pointer-events-none absolute inset-0 bg-gradient-to-l from-[#4e3b44]/90 via-[#595e49]/58 to-[#cdd9c7]/14 md:via-[#595e49]/46"
              }
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25"
              aria-hidden
            />
          </>
        )}

        <div
          className={
            align === "left"
              ? "relative flex min-h-[min(42vh,420px)] items-center px-4 py-12 sm:min-h-[min(48vh,500px)] sm:px-6 sm:py-16 md:min-h-[min(58vh,640px)] md:px-14 lg:px-20"
              : "relative flex min-h-[min(42vh,420px)] items-center justify-end px-4 py-12 sm:min-h-[min(48vh,500px)] sm:px-6 sm:py-16 md:min-h-[min(58vh,640px)] md:px-14 lg:px-20"
          }
        >
          <motion.blockquote
            initial={{ opacity: 0, y: reduce ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.88, ease: [0.25, 0.1, 0.25, 1] as const }}
            className={align === "left" ? "max-w-[36rem]" : "max-w-[36rem] text-right"}
          >
            <p
              className="text-[1.1rem] font-medium leading-[1.42] tracking-[-0.015em] text-white/96 text-balance sm:text-[1.22rem] sm:leading-[1.38] md:text-[1.62rem] md:leading-[1.32] lg:text-[1.8rem]"
              style={{ textShadow: "0 2px 44px rgba(0,0,0,0.38)" }}
            >
              {quote}
            </p>
            <div
              className={`mt-8 h-px w-14 bg-gradient-to-r from-white/50 to-transparent md:mt-10 ${align === "right" ? "ml-auto" : ""}`}
            />
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
