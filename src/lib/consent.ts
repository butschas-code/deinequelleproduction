/**
 * Cookie-/Einwilligungs-Status (localStorage) — Schweizer Übung: Wahl speichern, optional Cookies nur nach Zustimmung.
 */
export const CONSENT_STORAGE_KEY = "deinequelle-cookie-consent";

export type CookieConsentValue = "accepted" | "rejected";

export const CONSENT_CHANGE_EVENT = "deinequelle:cookie-consent";

export type ConsentChangeDetail = { value: CookieConsentValue };

export function readStoredConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (raw === "accepted" || raw === "rejected") return raw;
  return null;
}

export function writeConsent(value: CookieConsentValue): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(
    new CustomEvent<ConsentChangeDetail>(CONSENT_CHANGE_EVENT, { detail: { value } }),
  );
}

/** Für optionale Skripte (z. B. Analyse): nur nach ausdrücklicher Zustimmung. */
export function hasAnalyticsConsent(): boolean {
  return readStoredConsent() === "accepted";
}
