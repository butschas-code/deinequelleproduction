/**
 * Deine Quelle — Markenfarben
 * Primary / Secondary / Complimentary / Extra
 */

export const themeTokens = {
  brand: "#1e6e48",
  brandHover: "#186040",
  brandSecondary: "#f2d5dc",
  brandComplimentary: "#c0708a",
  brandExtra: "#d4a843",
  paper: "#f6fdfb",
  paper2: "#ffffff",
  ink: "#1d1d1f",
  inkMuted: "#6e6e73",
  gold: "#d4a843",
  line: "rgba(0,0,0,0.08)",
  shadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
  shadowLg: "0 16px 64px rgba(0, 0, 0, 0.1)",
} as const;

export type ThemeTokenKey = keyof typeof themeTokens;
