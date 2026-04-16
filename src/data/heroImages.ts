/**
 * Full-width Hero-Hintergründe pro Seite.
 * Lokale Assets wo sie als Landscape taugen; sonst hochauflösende Unsplash-Platzhalter.
 */
import { wpOct2022 } from "./wpOct2022Imagery";

export const heroImages = {
  home: {
    src: "/images/legacy/hero-slides/tropfen-scaled.jpg",
    alt: "Wassertropfen — Stimmung für Praxis DEINE QUELLE",
  },
  kinesiologie: {
    src: wpOct2022.kinesiologieHero,
    alt: "Claudia Dimmler — Kinesiologie",
  },
  sportKinesiologie: {
    src: "/images/legacy/wp/2022/10/DeinQuelle-0328-scaled.jpg",
    alt: "Bewegung und Sport — Sport-Kinesiologie, Praxis DEINE QUELLE",
  },
  yoga: {
    src: "/images/new/yoga-raum-claudia-dimmler.jpg",
    alt: "Yogaraum — Praxis DEINE QUELLE",
  },
  ueberMich: {
    src: "/images/legacy/wp/2022/10/claudia_dimmler_cj_2022-302_klein.jpg",
    alt: "Claudia Dimmler",
  },
  bewertungen: {
    src: "/images/legacy/wp/2022/10/claudia_dimmler_cj_2022-451_klein-1.jpg",
    alt: "Claudia Dimmler — Praxis DEINE QUELLE",
  },
  kontakt: {
    src: "/images/legacy/wp/2022/10/claudia_dimmler_cj_2022-434_klein.jpg",
    alt: "Claudia Dimmler — Praxis DEINE QUELLE",
  },
  impressum: {
    src: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2400&q=85",
    alt: "Abstrakter, ruhiger Farbverlauf",
  },
  agb: {
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=85",
    alt: "Schreibtisch mit Unterlagen, sachlich",
  },
  datenschutz: {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2400&q=85",
    alt: "Besprechungsraum, vertrauensvoll",
  },
  ethik: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85",
    alt: "Architektur mit natürlichem Licht",
  },
} as const;
