/**
 * Google-Rezensionen — NUR echte Daten eintragen (keine Erfindungen).
 * Jede hier gelistete Bewertung erscheint auf /bewertungen und im JSON-LD.
 *
 * Datenquellen (kein Scraping von Google-Suche/Maps — ToS, CAPTCHAs, kein stabiles HTML):
 * - Google Business Profile: Reviews exportieren / abtippen
 * - Manuell von Google Maps kopieren: authorName, Datum (ISO), Text, Sterne (1–5)
 * - Optional: `node scripts/fetch-google-place-reviews.mjs` mit Places API (liefert nur eine
 *   begrenzte Teilmenge der Reviews; vgl. Google-Dokumentation). Place-ID ≠ kgmid in Such-URLs.
 */
export type GoogleReview = {
  authorName: string;
  /** ISO-Datum `YYYY-MM-DD` (wie von der Places API) */
  datePublished: string;
  reviewBody: string;
  reviewRating: 1 | 2 | 3 | 4 | 5;
};

/**
 * Öffentliche Google-Bewertungen — hier eintragen oder per Script befüllen:
 *
 *   GOOGLE_MAPS_API_KEY=… node scripts/fetch-google-place-reviews.mjs --resolve-place-id
 *   GOOGLE_MAPS_API_KEY=… GOOGLE_PLACE_ID=ChIJ… npm run reviews:fetch
 *
 * (Die API liefert oft nur eine Teilmenge; vollständige Historie: Export im Google Business Profile.)
 */
/** Import aus Google (Export JSON); Datenstand siehe `datePublished`. */
export const googleReviews: GoogleReview[] = [
  {
    authorName: "Mr X",
    datePublished: "2026-03-16",
    reviewBody:
      "100% Empfehlung - Claudia bringt sehr viel Erfahrung und Empathie zusammen - tolles Yoga und auch Kinesiologie",
    reviewRating: 5,
  },
  {
    authorName: "Kirsten Teichmann",
    datePublished: "2026-03-11",
    reviewBody: "",
    reviewRating: 5,
  },
  {
    authorName: "Adriana Lüdi",
    datePublished: "2026-03-09",
    reviewBody:
      "Ein absolut wundervoller Ort zum Abschalten und Auftanken. Man fühlt sich sofort wohl, sobald man den Raum betritt. Die Yoga Sessions von Claudia sind wunderschön und helfen mir jedes Mal, komplett loszulassen und neue Energie zu tanken. Ich bin sehr dankbar, dass ich diesen Ort gefunden habe.",
    reviewRating: 5,
  },
  {
    authorName: "AlS",
    datePublished: "2025-04-14",
    reviewBody:
      "Es war sehr spannend, lehrreich und eine ganz neue Erfahrung. Es unterstützte meine Genesung und ich fühlte mich ganzheitlich und passend auf meine weitere Operation vorbereitet. Ich würde diese Form der Therapie sowie Claudia als Kinesiologin wieder wählen und auch weiterempfehlen.",
    reviewRating: 5,
  },
  {
    authorName: "Sylvia KM.",
    datePublished: "2025-03-15",
    reviewBody:
      "🌟 Wundervolles Yoga-Seminar & erstklassige Kinesiologie-Behandlung 🌟\n\nIch hatte das grosse Glück, an einem Yoga-Seminar teilzunehmen, das einfach ausgezeichnet war! Die Atmosphäre war harmonisch, die Übungen wurden professionell und einfühlsam angeleitet, und ich konnte mich völlig entspannen und neue Energie tanken.\n\nZusätzlich durfte ich Kinesiologie-Behandlungen erleben – sowohl für mich als auch für meinen Sohn. Die Behandlung war unglaublich wirkungsvoll und hat uns sehr geholfen. Mit viel Fachwissen, Geduld und Einfühlungsvermögen wurden unsere individuellen Bedürfnisse berücksichtigt. Ich kann das Yoga als auch die Kinesiologie-Behandlung wärmstens weiterempfehlen! 🙏✨",
    reviewRating: 5,
  },
  {
    authorName: "Alex M",
    datePublished: "2025-02-24",
    reviewBody: "",
    reviewRating: 5,
  },
  {
    authorName: "M L",
    datePublished: "2025-02-05",
    reviewBody: "",
    reviewRating: 5,
  },
  {
    authorName: "Corinne Bossart",
    datePublished: "2025-01-06",
    reviewBody: "👍",
    reviewRating: 5,
  },
  {
    authorName: "yvonne castelletti",
    datePublished: "2024-10-02",
    reviewBody:
      "Herzlichen Dank für die top professionelle kinesiologische Behandlung und Beratung.\nNach nur einer Behandlung sind die Beschwerden unseres Sohnes wie weggeblasen. Ich kann Claudia Dimmler von Herzen weiterempfehlen.",
    reviewRating: 5,
  },
  {
    authorName: "Matthias Lips",
    datePublished: "2023-08-02",
    reviewBody: "",
    reviewRating: 5,
  },
];

/** Anzeige auf der Website (de-CH), z. B. «15. März 2024». */
export function formatReviewDate(iso: string): string {
  const trimmed = iso.trim();
  if (!trimmed) return "";
  const d = /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
    ? new Date(`${trimmed}T12:00:00`)
    : new Date(trimmed);
  if (Number.isNaN(d.getTime())) return trimmed;
  return new Intl.DateTimeFormat("de-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Neueste zuerst (für Liste & konsistente Darstellung). */
export function getReviewsSorted(reviews: readonly GoogleReview[]): GoogleReview[] {
  return [...reviews].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function getAggregateFromReviews(reviews: readonly GoogleReview[]) {
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((a, r) => a + r.reviewRating, 0);
  return {
    ratingValue: Math.round((sum / reviews.length) * 10) / 10,
    reviewCount: reviews.length,
  };
}
