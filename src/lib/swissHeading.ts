/**
 * Swiss German (de-CH) heading typography helpers.
 * Inserts optional break points: \n (line) and \u00AD (soft hyphen at compound joints).
 */

const COMPOUND_SOFT_HYPHENS: Record<string, string> = {
  Abwesenheit: "Ab\u00ADwesenheit",
  anerkannte: "aner\u00ADkannte",
  Belastung: "Be\u00ADlastung",
  Beschwerden: "Be\u00ADschwerden",
  Biochemie: "Bio\u00ADchemie",
  ganzheitlich: "ganz\u00ADheitlich",
  ganzheitliche: "ganz\u00ADheitliche",
  Kinderwunsch: "Kinder\u00ADwunsch",
  Komplementärtherapie: "Komplementär\u00ADtherapie",
  Körperorientiert: "Körper\u00ADorientiert",
  Körperwahrnehmung: "Körper\u00ADwahrnehmung",
  Lebensphasen: "Lebens\u00ADphasen",
  Neubeginn: "Neu\u00ADbeginn",
  Regeneration: "Regene\u00ADration",
  ressourcenorientiert: "Ressourcen\u00ADorientiert",
  Ressourcenorientiert: "Ressourcen\u00ADorientiert",
  Stabilität: "Stabi\u00ADlität",
  Tiefenentspannung: "Tiefen\u00ADentspannung",
  Yogalektion: "Yoga\u00ADlektion",
  Zusammenspiel: "Zu\u00ADsammenspiel",
};

const COMPOUND_PATTERN = new RegExp(
  `\\b(${Object.keys(COMPOUND_SOFT_HYPHENS).join("|")})\\b`,
  "g",
);

export function formatSwissHeading(text: string): string {
  return text.replace(COMPOUND_PATTERN, (word) => COMPOUND_SOFT_HYPHENS[word] ?? word);
}
