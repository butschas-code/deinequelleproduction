"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Sanfte, bewegte Farbflächen im Hintergrund — emotional warm, ohne Lesbarkeit zu stören.
 */
export function AmbientShell() {
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {/* Basis-Mesh */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 90% 55% at 0% 0%, color-mix(in srgb, #cdd9c7 14%, transparent), transparent 50%),
            radial-gradient(ellipse 70% 45% at 100% 0%, color-mix(in srgb, #918a8f 6%, transparent), transparent 48%),
            linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 45%, #f5f5f7 100%)
          `,
        }}
      />

      {/* Sehr dezente Flächen — apple.com-ähnliche Ruhe */}
      <motion.div
        className="absolute -left-[18%] top-[10%] h-[min(420px,48vh)] w-[min(420px,48vw)] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(89,94,73,0.07),transparent_68%)] blur-3xl"
        animate={
          reduce
            ? undefined
            : {
                x: [0, 20, -8, 0],
                y: [0, 14, 6, 0],
              }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[12%] top-[40%] h-[min(380px,42vh)] w-[min(480px,50vw)] rounded-full bg-[radial-gradient(circle_at_65%_40%,rgba(145,138,143,0.09),transparent_70%)] blur-3xl"
        animate={
          reduce
            ? undefined
            : {
                x: [0, -18, 10, 0],
                y: [0, 18, -6, 0],
              }
        }
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* feines Grain */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
