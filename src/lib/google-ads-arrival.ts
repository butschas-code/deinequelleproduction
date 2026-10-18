export const GOOGLE_ADS_ARRIVAL_STORAGE_KEY = "deinequelle-paid-arrivals-v1";
const RETENTION_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 200;

type Arrival = { id: string; at: number };
type ArrivalStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

type ArrivalOptions = {
  href: string;
  gaId: string;
  trackingEnabled: boolean;
  analyticsOptedOut: boolean;
  storage: ArrivalStorage;
  emitEvent: (name: string, parameters: { send_to: string }) => void;
  now?: number;
};

/** Counts observable gclid arrivals, with browser-local deduplication. */
export function recordGoogleAdsArrival({
  href,
  gaId,
  trackingEnabled,
  analyticsOptedOut,
  storage,
  emitEvent,
  now = Date.now(),
}: ArrivalOptions): boolean {
  if (!gaId || !trackingEnabled || analyticsOptedOut) return false;

  let id: string | null;
  try {
    id = new URL(href).searchParams.get("gclid");
  } catch {
    return false;
  }
  // Braid identifiers are not assumed to represent distinct individual clicks.
  if (!id || id.length > 1024) return false;

  try {
    const previous = storage.getItem(GOOGLE_ADS_ARRIVAL_STORAGE_KEY);
    let parsed: unknown = [];
    if (previous) {
      try {
        parsed = JSON.parse(previous);
      } catch {
        // An invalid ledger is replaced only after an enabled paid arrival.
      }
    }
    const arrivals: Arrival[] = Array.isArray(parsed)
      ? parsed.filter(
          (entry): entry is Arrival =>
            entry !== null &&
            typeof entry === "object" &&
            typeof entry.id === "string" &&
            typeof entry.at === "number" &&
            Number.isFinite(entry.at) &&
            entry.at <= now &&
            entry.at > now - RETENTION_MS,
        )
      : [];

    if (arrivals.some((entry) => entry.id === id)) return false;

    // Persist before queueing, so unavailable storage cannot cause repeat events.
    storage.setItem(
      GOOGLE_ADS_ARRIVAL_STORAGE_KEY,
      JSON.stringify([...arrivals.slice(-(MAX_ENTRIES - 1)), { id, at: now }]),
    );
    try {
      // The opaque click identifier stays local; it is not a custom GA parameter.
      emitEvent("google_ads_arrival", { send_to: gaId });
    } catch {
      if (previous === null) storage.removeItem(GOOGLE_ADS_ARRIVAL_STORAGE_KEY);
      else storage.setItem(GOOGLE_ADS_ARRIVAL_STORAGE_KEY, previous);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
