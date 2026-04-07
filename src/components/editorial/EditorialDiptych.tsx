"use client";

import { ParallaxImage } from "@/components/motion/ParallaxImage";

type Panel = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  left: Panel;
  right: Panel;
};

/**
 * Zwei Bilder im Editorial-Stil: unterschiedliche Höhen, starker Parallax.
 */
export function EditorialDiptych({ left, right }: Props) {
  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-4 py-16 md:px-8 md:py-24"
      aria-label="Bildpaar"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-transparent"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, #595e49 10%, transparent) 45%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 md:mt-16">
          <div className="overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(89,94,73,0.22)] ring-1 ring-black/[0.06] md:rounded-3xl">
            <ParallaxImage
              src={left.src}
              alt={left.alt}
              className="min-h-[280px] md:min-h-[380px]"
              strength="deep"
            />
          </div>
          {left.caption ? (
            <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.2em] text-brand-complimentary">
              {left.caption}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-7">
          <div className="overflow-hidden rounded-2xl shadow-[0_24px_70px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06] md:rounded-3xl">
            <ParallaxImage
              src={right.src}
              alt={right.alt}
              className="min-h-[320px] md:min-h-[480px]"
              strength="deep"
            />
          </div>
          {right.caption ? (
            <p className="mt-4 text-right text-[12px] font-medium uppercase tracking-[0.2em] text-brand-complimentary md:text-left">
              {right.caption}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
