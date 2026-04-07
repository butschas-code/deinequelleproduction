"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const STRENGTH = {
  subtle: ["-4%", "4%"] as const,
  medium: ["-7%", "7%"] as const,
  deep: ["-12%", "12%"] as const,
  /** Starker Parallax für großflächige Hintergründe (z. B. Wald) */
  extreme: ["-28%", "28%"] as const,
};

type Props = {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
  strength?: keyof typeof STRENGTH;
};

const INNER_H: Record<keyof typeof STRENGTH, string> = {
  subtle: "112%",
  medium: "116%",
  deep: "118%",
  extreme: "142%",
};

export function ParallaxImage({ src, alt, className, priority, strength = "medium" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const [yStart, yEnd] = STRENGTH[strength];
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [yStart, yEnd]);
  const innerH = INNER_H[strength];

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={{ y, height: innerH }}
        className="relative w-full min-h-full will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}
