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
import { site } from "@/data/site";

const HERO_MIN_HEIGHT =
  "min-h-[min(72vh,620px)] sm:min-h-[min(80vh,740px)] md:min-h-[min(88vh,860px)] lg:min-h-[min(90vh,960px)]";

const textVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.14 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function StorybrandHero() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const y = useSpring(yRaw, { stiffness: 120, damping: 32, mass: 0.45 });

  return (
    <section
      ref={ref}
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
      aria-label="Hero"
    >
      <div className={`relative w-full ${HERO_MIN_HEIGHT}`}>
        {/* Background image with parallax */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={prefersReducedMotion ? undefined : { y }}
        >
          <Image
            src="/images/legacy/hero-slides/tropfen-scaled.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={92}
          />
        </motion.div>

        {/* Layered overlays for depth and readability */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c2e1a]/82 via-[#1e6e48]/38 to-black/22"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/42 via-transparent to-black/18"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_55%_at_50%_0%,rgba(0,0,0,0.16),transparent_60%)]"
          aria-hidden
        />
        {/* Film grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />

        {/* Content — anchored to bottom */}
        <div className={`relative flex flex-col justify-end ${HERO_MIN_HEIGHT}`}>
          <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)] pb-12 pt-10 sm:pb-16 md:pb-20 lg:pb-24">
            <div className="flex items-end gap-8 lg:gap-12">
              {/* Text content */}
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="show"
                className="flex-1"
              >
                <motion.p
                  variants={lineVariants}
                  className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/62 sm:text-[12px]"
                >
                  Komplementärtherapie · Yoga · Adligenswil
                </motion.p>

                <motion.h1
                  variants={lineVariants}
                  className="mt-3 max-w-[18ch] text-balance text-[1.8rem] font-semibold leading-[1.08] tracking-[-0.034em] text-white sm:text-[2.4rem] sm:leading-[1.06] md:text-[3.1rem] lg:text-[3.85rem]"
                  style={{ textShadow: "0 2px 52px rgba(0,0,0,0.5)" }}
                >
                  Entdecke einen neuen Weg zu innerer Balance
                </motion.h1>

                <motion.p
                  variants={lineVariants}
                  className="mt-4 text-[1.05rem] font-medium leading-[1.4] tracking-[-0.01em] text-white/72 sm:mt-5 sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.45rem]"
                  style={{ textShadow: "0 1px 28px rgba(0,0,0,0.38)" }}
                >
                  mit Yoga oder Kinesiologie in Adligenswil.
                </motion.p>

                {/* CTA */}
                <motion.div
                  variants={lineVariants}
                  className="mt-9 sm:mt-10"
                >
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-brand px-8 text-[15px] font-semibold text-white shadow-[0_4px_24px_rgba(30,110,72,0.45)] transition duration-200 hover:bg-brand-hover hover:shadow-[0_6px_32px_rgba(30,110,72,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white active:scale-[0.98]"
                  >
                    Ersten Termin online buchen
                  </a>
                </motion.div>
              </motion.div>

              {/* Claudia portrait — hidden on mobile, commanding presence on desktop */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="hidden shrink-0 md:block"
              >
                <div className="relative h-[280px] w-[196px] overflow-hidden rounded-[1.6rem] border-[2px] border-white/40 shadow-[0_16px_64px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.08)] lg:h-[340px] lg:w-[238px]">
                  <Image
                    src="/images/new/claudia-dimmler-Kinesiologie-Adligenswil.jpg"
                    alt="Claudia Dimmler"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 238px, 196px"
                    priority
                  />
                  {/* Caption band at bottom of card */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/62 to-transparent px-4 pb-4 pt-10">
                    <p className="text-[12px] font-semibold tracking-[0.04em] text-white">
                      Claudia Dimmler
                    </p>
                    <p className="mt-0.5 text-[10.5px] tracking-[0.03em] text-white/62">
                      Komplementärtherapeutin
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
