"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Kontakt",
    text: "Du erreichst mich telefonisch, per E-Mail, WhatsApp/SMS — oder buchst kinesiologische Termine direkt online.",
  },
  {
    title: "Ersttermin",
    text: "Eine Erstbehandlung dauert in der Regel 90 Minuten; Yoga startet mit Kurswahl oder Abstimmung per Mail/Telefon.",
  },
  {
    title: "Begleitung",
    text: "Weitere Kinesiologie-Sitzungen 60–75 Minuten nach Absprache; Yoga läuft in Kursblöcken oder privat — immer auf deinem Tempo.",
  },
];

export function ProcessSteps() {
  return (
    <ol className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-3 md:gap-5">
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[var(--shadow)] sm:p-8"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.48, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <h3 className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted md:text-[15px]">{s.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
