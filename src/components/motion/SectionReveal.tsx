"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
