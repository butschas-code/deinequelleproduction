/**
 * Home-Hero: Vollbreite Hintergrund-Video (`public/videos/hero-header-1.mp4`).
 * Überschreibbar mit `NEXT_PUBLIC_HERO_VIDEO_URL` (absolute URL zu MP4/WebM).
 */
export const homeHeroVideo = {
  src:
    typeof process.env.NEXT_PUBLIC_HERO_VIDEO_URL === "string" &&
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL.length > 0
      ? process.env.NEXT_PUBLIC_HERO_VIDEO_URL
      : "/videos/hero-header-1.mp4",
} as const;
