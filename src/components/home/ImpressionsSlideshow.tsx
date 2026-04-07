"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export type ImpressionSlide = { src: string; alt: string };

const DEFAULT_INTERVAL_MS = 5200;
const SLIDE_DURATION_S = 1.05;
const SLIDE_EASE = [0.25, 0.1, 0.25, 1] as const;

const frameRound = "overflow-hidden rounded-2xl sm:rounded-[1.25rem]";

type Props = {
  slides: readonly ImpressionSlide[] | ImpressionSlide[];
  intervalMs?: number;
  className?: string;
};

export function ImpressionsSlideshow({
  slides,
  intervalMs = DEFAULT_INTERVAL_MS,
  className = "",
}: Props) {
  const reduceMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const slidingRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const n = slides.length;

  const bumpAutoplay = useCallback(() => setTimerKey((k) => k + 1), []);

  const goNextAnimated = useCallback(async () => {
    if (n < 2 || slidingRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const step = el.offsetWidth / 2;

    if (reduceMotion) {
      setIndex((i) => (i + 1) % n);
      return;
    }

    slidingRef.current = true;
    try {
      await animate(x, -step, {
        duration: SLIDE_DURATION_S,
        ease: SLIDE_EASE,
      });
      setIndex((i) => (i + 1) % n);
      x.set(0);
    } finally {
      slidingRef.current = false;
    }
  }, [n, reduceMotion, x]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      x.set(0);
      bumpAutoplay();
    },
    [bumpAutoplay, x],
  );

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n);
    x.set(0);
    bumpAutoplay();
  }, [n, bumpAutoplay, x]);

  const goNext = useCallback(() => {
    void goNextAnimated();
    bumpAutoplay();
  }, [goNextAnimated, bumpAutoplay]);

  useEffect(() => {
    if (n < 2) return;
    const id = window.setInterval(() => {
      void goNextAnimated();
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [n, intervalMs, timerKey, goNextAnimated]);

  if (n === 0) return null;

  const current = slides[index]!;
  const next = slides[(index + 1) % n]!;

  if (n === 1) {
    return (
      <div className={className} role="region" aria-label="Weitere Eindrücke">
        <p className="sr-only" aria-live="polite">
          {current.alt}
        </p>
        <div className={`relative aspect-[16/10] w-full ${frameRound}`}>
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 980px"
            priority
            draggable={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={className}
      role="region"
      aria-roledescription="Karussell"
      aria-label="Weitere Eindrücke — Bildfolge"
    >
      <p className="sr-only" aria-live="polite">
        Bild {index + 1} von {n}: {current.alt}
      </p>

      <div ref={containerRef} className={`relative aspect-[16/10] w-full ${frameRound}`}>
        {reduceMotion ? (
          <div className="relative h-full w-full">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 980px"
              priority={index === 0}
              draggable={false}
            />
          </div>
        ) : (
          <div className="relative h-full w-full overflow-hidden">
            {/*
              Track = 200% of viewport width; each slide = 25% of track = 50% viewport.
              So current + next are both fully visible; translate by half viewport = one slide.
            */}
            <motion.div
              className="flex h-full"
              style={{ width: "200%", x }}
            >
              <div className="relative h-full w-[25%] shrink-0">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 490px"
                  priority={index === 0}
                  draggable={false}
                />
              </div>
              <div className="relative h-full w-[25%] shrink-0">
                <Image
                  src={next.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 490px"
                  draggable={false}
                />
              </div>
            </motion.div>
          </div>
        )}

        <>
          <button
            type="button"
            aria-label="Vorheriges Bild"
            className="absolute inset-y-0 left-0 z-[2] w-[min(28%,180px)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            onClick={goPrev}
          />
          <button
            type="button"
            aria-label="Nächstes Bild"
            className="absolute inset-y-0 right-0 z-[2] w-[min(28%,180px)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            onClick={goNext}
          />
        </>
      </div>

      {n > 1 && (
        <div
          className="mt-6 flex justify-center gap-2"
          role="tablist"
          aria-label="Folie wählen"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              tabIndex={i === index ? 0 : -1}
              aria-label={`Folie ${i + 1} von ${n}`}
              className={`h-2 w-2 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                i === index ? "bg-brand" : "bg-black/15 hover:bg-black/25"
              }`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
