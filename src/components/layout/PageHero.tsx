"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";

/** Same vertical shell as the home hero (video or image). Shorter on small phones to reduce scroll. */
const HERO_MIN_HEIGHT =
  "min-h-[min(64vh,560px)] sm:min-h-[min(70vh,680px)] md:min-h-[min(78vh,820px)] lg:min-h-[min(80vh,900px)]";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Tailwind classes for the hero `<Image>` (include `object-cover` + focal position). */
  imageClassName?: string;
  /** Hintergrund-Video (z. B. Home): autoplay, loop, muted — Poster/reduced-motion über posterSrc/imageSrc */
  videoSrc?: string;
  posterSrc?: string;
  priority?: boolean;
  /** Reiner Markenverlauf ohne Foto */
  gradientOnly?: boolean;
  /** Block-Ausrichtung des Titels (z. B. Home: rechts) */
  contentAlign?: "left" | "right";
  /** Grün-Verlauf schwächen (~halbe Stärke) für mehr sichtbares Video */
  reduceGreenOverlay?: boolean;
  /** Abspielgeschwindigkeit (1 = normal; z. B. 0.7 = 70 %) */
  videoPlaybackRate?: number;
  /** Haupt-Tint für Video-/Bild-Overlays (z. B. Home: #718973) */
  overlayTint?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  imageClassName,
  videoSrc,
  posterSrc,
  priority = false,
  gradientOnly = false,
  contentAlign = "left",
  reduceGreenOverlay = false,
  videoPlaybackRate = 1,
  overlayTint,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], ["0%", "11%"]);
  const y = useSpring(yRaw, { stiffness: 120, damping: 32, mass: 0.45 });

  const textVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.12 },
    },
  };
  const lineVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section
      ref={ref}
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
    >
      <div className={`relative w-full ${HERO_MIN_HEIGHT}`}>
        {!gradientOnly && videoSrc && !prefersReducedMotion ? (
          <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
            <video
              className="absolute inset-0 h-full w-full object-cover object-[50%_76%] sm:object-[50%_72%] md:object-[50%_68%]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              {...(posterSrc ? { poster: posterSrc } : {})}
              onLoadedMetadata={(e) => {
                e.currentTarget.playbackRate = videoPlaybackRate;
              }}
              aria-hidden
            >
              <source src={videoSrc} />
            </video>
          </motion.div>
        ) : !gradientOnly && (imageSrc || posterSrc) ? (
          <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
            <Image
              src={(prefersReducedMotion && posterSrc ? posterSrc : imageSrc) ?? posterSrc ?? ""}
              alt={imageAlt}
              fill
              priority={priority}
              className={imageClassName ?? "object-cover object-center"}
              sizes="100vw"
              quality={92}
            />
          </motion.div>
        ) : (
          <div
            className={
              overlayTint
                ? "absolute inset-0"
                : "absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(255,255,255,0.14),transparent_55%),linear-gradient(168deg,#6a7058_0%,#595e49_42%,#4e3b44_100%)]"
            }
            style={
              overlayTint
                ? {
                    background: `radial-gradient(ellipse 100% 80% at 50% 0%, rgba(255,255,255,0.14), transparent 55%), linear-gradient(168deg, color-mix(in srgb, ${overlayTint} 78%, white) 0%, ${overlayTint} 42%, #4e3b44 100%)`,
                  }
                : undefined
            }
            aria-hidden
          />
        )}

        <div
          className={
            overlayTint
              ? "pointer-events-none absolute inset-0"
              : `pointer-events-none absolute inset-0 bg-gradient-to-t to-black/25 ${
                  reduceGreenOverlay
                    ? "from-[#595e49]/50 via-[#595e49]/26"
                    : "from-[#595e49] via-[#595e49]/52"
                }`
          }
          style={
            overlayTint
              ? {
                  background: reduceGreenOverlay
                    ? `linear-gradient(to top, color-mix(in srgb, ${overlayTint} 50%, transparent), color-mix(in srgb, ${overlayTint} 26%, transparent), rgba(0,0,0,0.25))`
                    : `linear-gradient(to top, ${overlayTint}, color-mix(in srgb, ${overlayTint} 52%, transparent), rgba(0,0,0,0.25))`,
                }
              : undefined
          }
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/25"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />

        <div className={`relative flex flex-col justify-end ${HERO_MIN_HEIGHT}`}>
          <div
            className={`page-gutter mx-auto flex w-full max-w-[var(--layout-max)] pb-10 pt-10 sm:pb-14 sm:pt-20 md:pb-20 md:pt-28 lg:pb-20 lg:pt-40 ${
              contentAlign === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="show"
              className={`max-w-3xl${contentAlign === "right" ? " ml-auto text-right" : ""}`}
            >
              {eyebrow ? (
                <motion.p
                  variants={lineVariants}
                  className="text-[12px] font-semibold uppercase tracking-[0.32em] text-white/72 md:text-[13px]"
                >
                  {eyebrow}
                </motion.p>
              ) : null}
              <motion.h1
                variants={lineVariants}
                className="mt-3 text-balance break-words text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[2.45rem] sm:leading-[1.04] md:text-[3.25rem] lg:text-[4.1rem] xl:text-[4.35rem] 2xl:text-[4.6rem]"
                style={{ textShadow: "0 2px 48px rgba(0,0,0,0.4)" }}
              >
                {title}
              </motion.h1>
              {subtitle ? (
                <motion.p
                  variants={lineVariants}
                  className={`mt-5 max-w-[34rem] whitespace-pre-line text-[1rem] font-medium leading-[1.55] text-white/90 sm:mt-6 sm:text-[1.0625rem] sm:leading-[1.5] md:text-xl md:leading-relaxed${
                    contentAlign === "right" ? " ml-auto text-right" : ""
                  }`}
                  style={{ textShadow: "0 1px 24px rgba(0,0,0,0.3)" }}
                >
                  {subtitle}
                </motion.p>
              ) : null}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
