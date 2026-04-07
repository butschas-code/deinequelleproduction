/**
 * Deine Quelle — Markenfarben
 * Primary / Secondary / Complimentary / Extra
 */

export const themeTokens = {
  brand: "#595e49",
  brandHover: "#484c3d",
  brandSecondary: "#cdd9c7",
  brandComplimentary: "#4e3b44",
  brandExtra: "#918a8f",
  paper: "#f5f5f7",
  paper2: "#ffffff",
  ink: "#1d1d1f",
  inkMuted: "#6e6e73",
  gold: "#918a8f",
  line: "rgba(0,0,0,0.08)",
  shadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
  shadowLg: "0 16px 64px rgba(0, 0, 0, 0.1)",
} as const;

export type ThemeTokenKey = keyof typeof themeTokens;
