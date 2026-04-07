#!/usr/bin/env node
/**
 * Holt öffentliche Bewertungen über die offizielle Google Places API (Place Details).
 *
 * Wichtig:
 * - Kein Scraping von google.com/maps — gegen Nutzungsbedingungen und technisch instabil.
 * - Die Details-API liefert typischerweise nur eine begrenzte Teilmenge der Reviews (nicht „alle“).
 * - Vollständige Historie: Export im Google Business Profile (Reviews) oder manuell nach googleReviews.ts.
 *
 * Voraussetzungen:
 * - API-Key mit aktiviertem „Places API“ (Legacy Place Details funktioniert mit maps.googleapis.com).
 *
 * Place-ID ermitteln (einmalig):
 *   GOOGLE_MAPS_API_KEY=… node scripts/fetch-google-place-reviews.mjs --resolve-place-id
 *   Optional: GOOGLE_PLACE_QUERY="DEINE QUELLE Meggerstrasse 4a Adligenswil"
 *
 * Reviews ausgeben (JSON + TS-Snippet für src/data/googleReviews.ts):
 *   GOOGLE_MAPS_API_KEY=… GOOGLE_PLACE_ID=ChIJ… node scripts/fetch-google-place-reviews.mjs
 */

const BASE = "https://maps.googleapis.com/maps/api/place";

function apiKey() {
  const k =
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_PLACES_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!k?.trim()) {
    console.error(
      "Fehlender API-Key: setze GOOGLE_MAPS_API_KEY (oder GOOGLE_PLACES_API_KEY).",
    );
    process.exit(1);
  }
  return k.trim();
}

async function fetchJson(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

function toGoogleReview(r) {
  const sec = typeof r.time === "number" ? r.time : 0;
  const iso = sec > 0 ? new Date(sec * 1000).toISOString().slice(0, 10) : "";
  const rating = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 0)));
  return {
    authorName: String(r.author_name || "").trim() || "Google-Nutzer",
    datePublished: iso,
    reviewBody: String(r.text || "").trim(),
    reviewRating: rating,
  };
}

async function resolvePlaceId() {
  const key = apiKey();
  const q =
    process.env.GOOGLE_PLACE_QUERY?.trim() ||
    "DEINE QUELLE Meggerstrasse 4a 6043 Adligenswil Switzerland";
  const url = `${BASE}/findplacefromtext/json?input=${encodeURIComponent(q)}&inputtype=textquery&fields=place_id,name,formatted_address&key=${encodeURIComponent(key)}`;
  const data = await fetchJson(url);
  if (data.status !== "OK" || !data.candidates?.length) {
    console.error("Find Place:", data.status, data.error_message || "");
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }
  const c = data.candidates[0];
  console.log("place_id:", c.place_id);
  console.log("name:", c.name);
  console.log("address:", c.formatted_address);
  console.log("\nIn src/data/site.ts → googlePlaceId eintragen, dann:");
  console.log(
    `GOOGLE_MAPS_API_KEY=… GOOGLE_PLACE_ID=${c.place_id} node scripts/fetch-google-place-reviews.mjs`,
  );
}

async function fetchReviews() {
  const key = apiKey();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  if (!placeId) {
    console.error(
      "Fehlende GOOGLE_PLACE_ID. Zuerst --resolve-place-id ausführen oder Place-ID von Maps (Teilen) kopieren.",
    );
    process.exit(1);
  }
  const fields = "name,rating,user_ratings_total,reviews";
  const url = `${BASE}/details/json?place_id=${encodeURIComponent(placeId)}&fields=${fields}&reviews_sort=newest&key=${encodeURIComponent(key)}`;
  const data = await fetchJson(url);
  if (data.status !== "OK") {
    console.error("Place Details:", data.status, data.error_message || "");
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }
  const result = data.result || {};
  const raw = Array.isArray(result.reviews) ? result.reviews : [];
  const mapped = raw.map(toGoogleReview);

  console.log("— Meta —");
  console.log("name:", result.name);
  console.log("rating:", result.rating, "user_ratings_total:", result.user_ratings_total);
  console.log("reviews in response:", mapped.length, "(API-Limit beachten)\n");

  console.log("— JSON —");
  console.log(JSON.stringify(mapped, null, 2));

  console.log("\n— TypeScript (in googleReviews.ts einfügen / ersetzen) —");
  console.log(
    `export const googleReviews: GoogleReview[] = ${JSON.stringify(mapped, null, 2)};`,
  );
}

const arg = process.argv[2];
if (arg === "--resolve-place-id") {
  resolvePlaceId().catch((e) => {
    console.error(e);
    process.exit(1);
  });
} else {
  fetchReviews().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
