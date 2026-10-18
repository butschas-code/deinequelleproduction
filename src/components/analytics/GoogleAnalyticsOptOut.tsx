"use client";

import { useSyncExternalStore, useState, useTransition } from "react";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  GA_OPTOUT_EVENT,
  isAnalyticsTrackingEnabled,
} from "@/lib/consent";
import { GOOGLE_ADS_ARRIVAL_STORAGE_KEY } from "@/lib/google-ads-arrival";

interface GoogleAnalyticsOptOutProps {
  gaId?: string;
}

function subscribeToOptOut(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(GA_OPTOUT_EVENT, callback);
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(GA_OPTOUT_EVENT, callback);
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}

export function GoogleAnalyticsOptOut({ gaId = "G-91WWD2TPSD" }: GoogleAnalyticsOptOutProps) {
  const [, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const storageKey = `ga-disable-${gaId}`;

  const isOptedOut = useSyncExternalStore(
    subscribeToOptOut,
    () => {
      try {
        return !isAnalyticsTrackingEnabled(gaId, localStorage);
      } catch {
        return true;
      }
    },
    () => false,
  );

  const toggleOptOut = () => {
    startTransition(() => {
      try {
        if (isOptedOut) {
          // Re-enable
          localStorage.removeItem(storageKey);
          // An explicit re-enable also clears any older rejected preference.
          if (localStorage.getItem(CONSENT_STORAGE_KEY) === "rejected") {
            localStorage.removeItem(CONSENT_STORAGE_KEY);
          }
          delete (window as unknown as Record<string, unknown>)[storageKey];
          if (typeof window.gtag === "function") {
            window.gtag("consent", "update", {
              analytics_storage: "granted",
              ad_storage: "granted",
              ad_user_data: "granted",
              ad_personalization: "granted",
            });
          }
          window.dispatchEvent(
            new CustomEvent(GA_OPTOUT_EVENT, { detail: { optedOut: false } }),
          );
          setFeedback("Webanalyse und Anzeigenmessung wurden für diesen Browser wieder aktiviert.");
        } else {
          // Disable
          localStorage.setItem(storageKey, "true");
          localStorage.removeItem(GOOGLE_ADS_ARRIVAL_STORAGE_KEY);
          (window as unknown as Record<string, unknown>)[storageKey] = true;
          if (typeof window.gtag === "function") {
            window.gtag("consent", "update", {
              analytics_storage: "denied",
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
            });
          }
          window.dispatchEvent(
            new CustomEvent(GA_OPTOUT_EVENT, { detail: { optedOut: true } }),
          );
          setFeedback("Webanalyse und Anzeigenmessung wurden für diesen Browser deaktiviert.");
        }
      } catch {
        setFeedback("Die Einstellung konnte nicht im Browser gespeichert werden.");
      }
    });
  };

  return (
    <div className="mt-10 rounded-2xl border border-black/[0.08] bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
      <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
        Webanalyse und Anzeigenmessung
      </h3>

      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        Wir verwenden <strong>Google Analytics und Google Ads</strong> (Google Ireland Limited / Google LLC),
        um die Nutzung dieser Website und Besuche über unsere Anzeigen auszuwerten. Zur Erkennung wiederholter
        Anzeigenbesuche speichern wir beobachtete Klickkennungen bis zu 30 Tage in diesem Browser.
      </p>

      <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
        Die Messung ist standardmässig aktiviert. Du kannst sie hier jederzeit ausschalten. Der Schalter gilt
        für Webanalyse und Anzeigenmessung auf dieser Website. Beim Ausschalten werden auch die lokal
        gespeicherten Kennungen wiederholter Anzeigenbesuche entfernt.
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-black/[0.06] bg-[#FAF7F2] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Aktueller Status
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${
                isOptedOut ? "bg-amber-500" : "bg-emerald-600"
              }`}
            />
            <span className="text-[15px] font-medium text-ink">
              {isOptedOut
                ? "Messung deaktiviert"
                : "Messung aktiv"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleOptOut}
          className={`inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-full px-5 text-[14px] font-semibold transition ${
            isOptedOut
              ? "bg-[#595e49] text-white shadow-sm hover:bg-[#484c3d]"
              : "border border-black/15 bg-white text-ink shadow-sm hover:border-black/30 hover:bg-black/[0.02]"
          }`}
        >
          {isOptedOut
            ? "Messung aktivieren"
            : "Messung deaktivieren"}
        </button>
      </div>

      {feedback && (
        <p className="mt-3 text-[14px] font-medium text-[#595e49]" role="status">
          {feedback}
        </p>
      )}

      <p className="mt-5 text-[13px] leading-relaxed text-ink-muted">
        <em>Hinweis:</em> Das Opt-Out wird für diesen Browser und dieses Gerät gespeichert. Wenn du deinen
        Browser-Speicher leerst oder einen anderen Browser verwendest, muss der Widerspruch erneut gesetzt werden.
        Alternativ kannst du das offizielle{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout?hl=de"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#595e49] underline underline-offset-2 hover:text-[#484c3d]"
        >
          Browser-Add-on zur Deaktivierung von Google Analytics
        </a>{" "}
        installieren.
      </p>
    </div>
  );
}
