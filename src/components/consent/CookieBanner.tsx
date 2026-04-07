"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CONSENT_STORAGE_KEY,
  type CookieConsentValue,
  writeConsent,
} from "@/lib/consent";

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (raw !== "accepted" && raw !== "rejected") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const choose = (value: CookieConsentValue) => {
    try {
      writeConsent(value);
    } catch {
      /* private mode / storage blocked */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:px-4 md:px-6 md:pb-6"
      role="region"
      aria-label="Cookie- und Datenschutzhinweis"
    >
      <div className="mx-auto w-full max-w-[var(--layout-max)] rounded-2xl border border-[#e8dfd6] bg-[#fdfaf6]/95 p-4 shadow-[0_-8px_40px_-12px_rgba(78,59,68,0.18),0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-md sm:p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink md:text-lg">
              Cookies &amp; Datenschutz
            </h2>
            <p className="mt-2 text-[14px] leading-[1.6] text-ink-muted md:text-[15px] md:leading-relaxed">
              Wir setzen Cookies und lokale Speicherung ein, soweit für den Betrieb der Website nötig, und
              speichern deine Entscheidung. Nicht notwendige Cookies (z.&nbsp;B. für Reichweitenmessung)
              verwenden wir nur mit deiner Zustimmung. Details in der{" "}
              <Link
                href="/datenschutz"
                className="font-medium text-brand underline decoration-brand/30 underline-offset-2 transition hover:decoration-brand"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end sm:gap-3">
            <button
              type="button"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-black/12 bg-white/90 px-6 text-[15px] font-semibold text-ink shadow-sm transition hover:border-brand-extra hover:bg-brand-secondary/25 sm:w-auto sm:min-w-[140px]"
              onClick={() => choose("rejected")}
            >
              Ablehnen
            </button>
            <button
              type="button"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-brand px-6 text-[15px] font-semibold text-white shadow-[0_8px_30px_-8px_rgba(89,94,73,0.45)] transition hover:bg-brand-hover sm:w-auto sm:min-w-[140px]"
              onClick={() => choose("accepted")}
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
