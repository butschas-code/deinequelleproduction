import { site } from "@/data/site";

export type DesignPageAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type DesignPageData = {
  slug: string;
  /** Long-form pages: homepage section rhythm + two-column body prose */
  contentLayout?: "default" | "dense";
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  intro: string;
  heroImage: string;
  /** Optional mobile hero image — shown below 960px when set. */
  heroImageMobile?: string;
  heroAlt: string;
  heroObjectPosition?: string;
  /** Mobile hero focal point — falls back to heroObjectPosition or a safe default in CSS. */
  heroObjectPositionMobile?: string;
  /** Stronger text contrast on photo heroes — typography only, no overlay changes. */
  heroReadableText?: boolean;
  /** Hero image height inside .hero-bg — default 115% (cover zoom). Use 100% to show more of outpainted art. */
  heroImageHeight?: string;
  /** Hero title emphasis color — default sage (green) */
  heroEmphasisTone?: "sage" | "wine";
  heroActions?: {
    primary: DesignPageAction;
    secondary?: DesignPageAction;
  };
  trustItems?: string[];
  quote?: string;
  quoteAfterSectionId?: string;
  /** Quote band background — default beige page tone */
  quoteTheme?:
    | "beige"
    | "sage-soft"
    | "sage"
    | "warm-soft"
    | "warm"
    | "warm-deep"
    | "wine-soft"
    | "wine";
  sections: {
    id: string;
    theme:
      | "sage"
      | "sage-soft"
      | "sage-deep"
      | "wine"
      | "wine-soft"
      | "wine-deep"
      | "warm"
      | "warm-soft"
      | "warm-deep"
      | "light";
    kicker?: string;
    title: string;
    titleEmphasis?: string;
    /** Keep the content ready in data, but do not render it yet. */
    hidden?: boolean;
    /** Keep emphasis on the same line as the title — no forced line break before <em>. */
    titleEmphasisInline?: boolean;
    image?: string;
    imageAlt?: string;
    imageObjectPosition?: string;
    /** Mobile focal point for spread/split images — keeps faces and subjects in frame. */
    imageObjectPositionMobile?: string;
    /** Optional override for spread image container inset to control zoom (e.g. "-4% 0"). */
    imageInset?: string;
    imageFlipHorizontal?: boolean;
    /** Skip full-bleed spread when hero already covers the visual (e.g. first content block) */
    hideSpread?: boolean;
    /** Section layout rhythm — default full spread; use mix on long pages */
    presentation?: "spread" | "compact" | "head" | "split" | "cover";
    /** Image column for presentation: "split" */
    splitMedia?: "left" | "right";
    /** For split layouts, render body columns below at full section width */
    splitBodyFullWidth?: boolean;
    lead: string;
    body: string[];
    layout?: "editorial" | "single";
    note?: string;
    /** "tagline" = short italic closer; "callout" = boxed aside (e.g. legal); default editorial */
    noteVariant?: "editorial" | "tagline" | "callout";
    cta?: {
      label: string;
      href: string;
      external?: boolean;
      tone?: "sage" | "wine" | "accent";
    };
    items?: string[];
    itemsIntro?: string;
    /** "topics" = two-column editorial rows; default bordered list in sidebar */
    itemsVariant?: "list" | "topics";
    /** Title + body pairs (e.g. Asanas, Pranayama) rendered as numbered rows */
    features?: { title: string; body: string }[];
    /** Tighter vertical rhythm for dense head + list sections */
    density?: "default" | "tight";
  }[];
  guideSection?: {
    title: string;
    titleEmphasis?: string;
    intro: string;
    footnote?: string;
    logos?: {
      src: string;
      alt: string;
      shape?: "wide" | "square";
    }[];
    /** Collapse categories into one-at-a-time panels (keeps full copy, less scroll) */
    layout?: "accordion" | "expanded" | "groups";
    theme?: "beige" | "sage" | "sage-soft" | "sage-deep" | "warm" | "warm-soft" | "warm-deep";
    categories: {
      number: string;
      category: string;
      lead?: string;
      bullets: string[];
      goal?: string;
    }[];
  };
  guideAfterSectionId?: string;
  guideRows?: {
    number: string;
    category: string;
    items: string;
  }[];
  process?: {
    title: string;
    emphasis: string;
    /** Keep emphasis on the same line as the last title line (e.g. «Begleitung ab»). */
    emphasisInline?: boolean;
    /** Default sage (green); use light/warm/wine for themed pages */
    theme?: "sage" | "light" | "warm" | "wine";
    steps: {
      title: string;
      body: string;
    }[];
  };
  finalCta?: {
    title: string;
    emphasis: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    primaryExternal?: boolean;
    secondaryLabel?: string;
    secondaryHref?: string;
    secondaryExternal?: boolean;
  };
};

export const designPages = {
  kinesiologie: {
    slug: "/leistungen/kinesiologie",
    contentLayout: "dense",
    eyebrow: "Kinesiologie",
    title: "Zurück zur\nGesundheit",
    titleEmphasis: "mit Körper,\nGefühl &\ninnerer Kraft",
    intro:
      "Kinesiologie unterstützt deine Gesundheit indem sie Blockaden löst, Stressmuster erkennen lässt und Ressourcen stärkt.",
    heroImage: "/images/hero/Kinesiologie_hero.jpg",
    heroAlt: "Kinesiologie-Behandlung mit Muskeltest",
    heroObjectPosition: "right center",
    heroObjectPositionMobile: "72% 34%",
    heroReadableText: true,
    heroImageHeight: "100%",
    heroActions: {
      primary: {
        label: "Kostenfreies Erstgespräch",
        href: site.bookingUrl,
        external: true,
      },
      secondary: {
        label: "Termin online buchen",
        href: site.bookingUrl,
        external: true,
      },
    },
    quote:
      "Gesundheit entsteht in Balance – im Zusammenspiel von Körper, Geist und Seele.",
    quoteTheme: "sage-soft",
    sections: [
      {
        id: "komplementaertherapie",
        theme: "sage",
        hideSpread: true,
        kicker: "Komplementärtherapie",
        title: "Ganzheitlich\nauf dem Weg zu",
        titleEmphasis: "Gesundheit &\ninnerer Balance",
        image: "/images/Claudia/claudia-dimmler-Kinesiologie-Adligenswil.jpg",
        imageAlt: "Claudia Dimmler, Komplementärtherapeutin in Adligenswil",
        imageObjectPosition: "center 25%",
        imageObjectPositionMobile: "center 20%",
        lead:
          "Komplementärtherapie begleitet Menschen ganzheitlich auf ihrem Weg zu mehr Gesundheit, Wohlbefinden und innerer Balance. Sie betrachtet Körper, Geist und Seele als Einheit und unterstützt die natürlichen Selbstheilungskräfte des Menschen.",
        body: [
          "Als Ergänzung zur Schulmedizin stärkt die Komplementärtherapie die Fähigkeit des Körpers zur Selbstregulation. Sie hilft dabei, eigene Ressourcen zu erkennen und zu aktivieren, Belastungen besser zu verarbeiten und das innere Gleichgewicht wiederzufinden.",
          "Im Mittelpunkt steht nicht die Krankheit, sondern der Mensch mit seinen individuellen Bedürfnissen, Erfahrungen und Lebensumständen. Durch achtsame Begleitung werden Körperwahrnehmung, Selbstvertrauen und Eigenkompetenz gefördert – für mehr Lebensqualität, Gesundheit und innere Stabilität.",
        ],
      },
      {
        id: "kinesiologie-methode",
        theme: "sage-deep",
        kicker: "Methode",
        title: "Kinesiologie,",
        titleEmphasis: "eine anerkannte\nMethode der\nKomplementärtherapie",
        image: "/images/legacy/wp/2022/10/claudia_dimmler_cj_2022-357_klein.jpg",
        imageAlt: "Kinesiologische Begleitung in der Praxis",
        imageObjectPosition: "50% 42%",
        imageObjectPositionMobile: "50% 44%",
        lead:
          "Zurück in die eigene Balance finden, mit Kinesiologie als sanfter und wirkungsvoller Begleitung für Körper, Geist und Seele.",
        body: [
          "Kinesiologie ist eine anerkannte Methode der Komplementärtherapie und begleitet Menschen auf ihrem Weg zu mehr Gesundheit, Wohlbefinden und innerer Balance. Der Begriff leitet sich vom griechischen Wort „kinesis“ ab und bedeutet Bewegung. Dabei geht es nicht nur um körperliche Bewegung, sondern auch um den freien Fluss von Energie, Emotionen und Lebenskräften.",
          "Die Methode kann in unterschiedlichsten Lebenssituationen unterstützen – beispielsweise bei Stress und Erschöpfung, emotionalen Herausforderungen, Lern- und Konzentrationsthemen, persönlichen Entwicklungsprozessen oder zur Gesundheitsförderung und Prävention.",
          "Kinesiologie versteht den Menschen als Einheit von Körper, Geist und Seele und schafft Raum für nachhaltige Veränderungen, mehr Lebensqualität und ein gestärktes Vertrauen in die eigenen Fähigkeiten.",
        ],
      },
      {
        id: "was-ist-kinesiologie",
        theme: "sage",
        kicker: "Was ist Kinesiologie?",
        title: "Kinesiologie,",
        titleEmphasis: "die Lehre\nder Bewegung",
        image: "/images/legacy/wp/2022/10/claudia_dimmler_cj_2022-347_klein.jpg",
        imageAlt: "Claudia Dimmler in ruhiger Praxisatmosphäre",
        imageObjectPosition: "center 20%",
        imageObjectPositionMobile: "center 16%",
        lead:
          "Die Kinesiologie verbindet Erkenntnisse der westlichen Medizin mit dem Wissen traditioneller östlicher Heilmethoden. Elemente wie die Lehre von Yin und Yang, die fünf Elemente, das Meridiansystem und Akupressur fliessen ebenso in die Arbeit ein wie Erkenntnisse aus Medizin, Psychologie, Pädagogik, Ernährungs- und Bewegungslehre.",
        body: [
          "Im Zentrum steht der kinesiologische Muskeltest. Er dient als körpereigenes Rückmeldesystem und ermöglicht einen direkten Dialog mit dem Körper. Über den Muskeltest können Energieungleichgewichte, Stressbelastungen und Blockaden erkannt werden, die das körperliche, emotionale oder mentale Wohlbefinden beeinträchtigen können. Gleichzeitig zeigt er auf, welche Unterstützung der Körper benötigt, um wieder in sein natürliches Gleichgewicht zu finden.",
          "Äussere Einflüsse wie Stress, Ängste, emotionale Belastungen, Schlafstörungen, Überforderung oder ungünstige Lebensgewohnheiten können den Energiefluss beeinträchtigen. Kinesiologie unterstützt dabei, solche Belastungen bewusst zu machen, körpereigene Ressourcen zu aktivieren und die Selbstregulation zu stärken.",
        ],
      },
      {
        id: "koerper-signale",
        theme: "sage-soft",
        kicker: "Wahrnehmung",
        title: "Dein Körper zeigt,",
        titleEmphasis: "wenn etwas\nnicht stimmt",
        image: "/images/Kinesiology/claudia_dimmler_cj_2022-117_resize.jpg",
        imageAlt: "Lichtvolle, ruhige Atmosphäre in der Praxis",
        imageObjectPosition: "center center",
        imageObjectPositionMobile: "center 26%",
        lead:
          "Manchmal spüren wir deutlich, dass etwas aus dem Gleichgewicht geraten ist. Der Körper ist angespannt. Der Schlaf wird unruhig. Gedanken kreisen. Gefühle werden schwer. Beschwerden zeigen sich, ohne dass sofort klar ist, woher sie kommen.",
        body: [
          "Kinesiologie schafft einen ruhigen Raum, in dem dein Körper gehört wird. Gemeinsam erkunden wir, was dein System braucht, um wieder mehr Stabilität, innere Ruhe und neue Kraft zu entwickeln.",
          "Dabei geht es nicht nur darum, Symptome zu betrachten. In der Komplementärtherapie werden Beschwerden als Ausdruck eines Ungleichgewichts verstanden, das Körper, Geist und Seele betrifft. Statt einzelne Symptome isoliert zu behandeln, wird der Mensch in seiner Gesamtheit wahrgenommen – mit seinen Erfahrungen, Ressourcen, Bedürfnissen und Lebensumständen.",
          "Ziel ist es, die natürliche Selbstregulation des Körpers zu stärken und die Ursachen von Belastungen frühzeitig zu erkennen.",
          "Als Klientin oder Klient bist du dabei ein aktiver Teil des Prozesses. Gemeinsam entdecken wir vorhandene Ressourcen, stärken die Selbstkompetenz und fördern das Vertrauen in die eigenen Fähigkeiten. So können nachhaltige Schritte in Richtung Gesundheit, Lebensqualität und inneres Gleichgewicht entstehen.",
          "Kinesiologie begleitet Menschen dabei, wieder in Verbindung mit sich selbst zu kommen – für mehr Leichtigkeit, Klarheit und Wohlbefinden im Alltag.",
        ],
        layout: "single",
      },
      {
        id: "wirkung",
        theme: "sage-soft",
        kicker: "Wirkung",
        title: "Wie wirkt Kinesiologie?",
        titleEmphasis: "Veränderung wird über\nden Körper erfahrbar",
        image: "/images/legacy/wp/2022/10/claudia_dimmler_cj_2022-425_klein.jpg",
        imageAlt: "Kinesiologische Sitzung mit Claudia Dimmler",
        imageObjectPosition: "center 25%",
        imageObjectPositionMobile: "center 20%",
        lead:
          "Kinesiologie wirkt über die Förderung der natürlichen Selbstregulation des Menschen. Sie betrachtet Körper, Geist und Seele als Einheit und unterstützt dabei, Belastungen, Stress und Energieungleichgewichte bewusst wahrzunehmen und auszugleichen.",
        body: [
          "Mithilfe des kinesiologischen Muskeltests werden Hinweise auf Blockaden, Stressoren und vorhandene Ressourcen sichtbar. Daraus ergeben sich individuelle Impulse, welche die Selbstwahrnehmung stärken und den Körper dabei unterstützen, sein inneres Gleichgewicht wiederzufinden.",
          "Durch die Aktivierung der körpereigenen Ressourcen können Veränderungen auf körperlicher, emotionaler und mentaler Ebene angestossen werden. Ziel ist es, Gesundheit, Wohlbefinden und Handlungskompetenz nachhaltig zu fördern.",
        ],
      },
    ],
    guideSection: {
      title: "Wann kann\nKinesiologie",
      titleEmphasis: "unterstützen?",
      layout: "expanded",
      theme: "sage-deep",
      intro:
        "Kinesiologie eignet sich für Kinder, Jugendliche, Erwachsene und ältere Menschen in den unterschiedlichsten Lebenssituationen. Sie unterstützt dabei, das Wohlbefinden zu fördern, innere Ressourcen zu stärken und körperliche, emotionale sowie mentale Balance wiederzufinden.",
      footnote:
        "Jeder Mensch ist einzigartig. Deshalb wird jede Sitzung individuell auf die aktuellen Bedürfnisse und Ziele abgestimmt.",
      logos: [
        {
          src: "/images/other/OdA_KT_Label_DE_Diplom.jpg",
          alt: "OdA KT Diplom Label",
          shape: "square",
        },
        {
          src: "/images/other/emr_zertifiziert_gs.svg",
          alt: "EMR zertifiziert",
          shape: "wide",
        },
        {
          src: "/images/other/Kinesuisse_Logo_Byline_rechts_Black_RGB.svg",
          alt: "KineSuisse Verbandsmitglied",
          shape: "wide",
        },
      ],
      categories: [
        {
          number: "01",
          category: "Körperliche Beschwerden",
          lead:
            "Wenn sich Belastungen auf körperlicher Ebene zeigen, kann Kinesiologie unterstützend wirken – beispielsweise bei:",
          bullets: [
            "Muskelverspannungen",
            "Chronischen oder akuten Schmerzen",
            "Haltungs- und Koordinationsproblemen",
            "Beschwerden nach Unfällen oder Überlastungen",
            "Verdauungs- und Stoffwechselbeschwerden",
            "Körperlichem Unwohlsein ohne erkennbare Ursache",
          ],
          goal:
            "Ziel ist es, die Selbstregulation des Körpers zu fördern, Regenerationsprozesse zu unterstützen und wieder mehr Beweglichkeit, Energie und Wohlbefinden zu ermöglichen.",
        },
        {
          number: "02",
          category: "Emotionale Belastungen",
          lead: "Emotionale Herausforderungen können sich auf vielfältige Weise bemerkbar machen:",
          bullets: [
            "Stress und Überforderung",
            "Ängste und innere Unruhe",
            "Erschöpfungszustände und Burnout",
            "Schlafstörungen",
            "Stimmungsschwankungen",
            "Psychosomatische Beschwerden",
            "Belastende Lebenssituationen oder Mobbing",
          ],
          goal:
            "Kinesiologie hilft dabei, Belastungen bewusst wahrzunehmen, innere Ressourcen zu aktivieren und neue Handlungsmöglichkeiten zu entwickeln. Mehr Gelassenheit, Stabilität und Lebensfreude können entstehen.",
        },
        {
          number: "03",
          category: "Lernen, Konzentration und persönliche Entwicklung",
          lead: "Kinesiologie kann Kinder, Jugendliche und Erwachsene unterstützen bei:",
          bullets: [
            "Konzentrations- und Lernschwierigkeiten",
            "Prüfungsstress und Prüfungsangst",
            "Motivationsproblemen",
            "Leistungsabfall und Energiemangel",
            "Blockierten Ressourcen",
            "Selbstwert- und Selbstvertrauensthemen",
          ],
          goal:
            "Durch die Förderung der geistigen und emotionalen Balance wird Lernen leichter, Klarheit gefördert und das Vertrauen in die eigenen Fähigkeiten gestärkt.",
        },
        {
          number: "04",
          category: "Veränderungen und besondere Lebensphasen",
          lead: "Manche Lebensabschnitte bringen besondere Herausforderungen mit sich. Kinesiologie kann begleiten bei:",
          bullets: [
            "Kinderwunsch",
            "Schwangerschaft",
            "Pubertät",
            "Wechseljahrbeschwerden",
            "Trauerprozessen",
            "Persönlichen Krisen",
            "Herausfordernden Entwicklungs- und Veränderungsprozessen",
          ],
          goal:
            "Sie unterstützt dabei, Übergänge bewusster zu gestalten und neue Lebenssituationen mit mehr Vertrauen und innerer Stabilität zu meistern.",
        },
        {
          number: "05",
          category: "Unverträglichkeiten und hormonelle Balance",
          lead: "Kinesiologie kann ergänzend unterstützen bei:",
          bullets: [
            "Allergien (z. B. Heuschnupfen)",
            "Asthma",
            "Lebensmittelunverträglichkeiten",
            "Menstruationsbeschwerden",
            "Hormonellen Ungleichgewichten",
            "Wechseljahrbeschwerden",
            "Stoffwechselthemen",
          ],
          goal:
            "Dabei steht stets die Förderung der körpereigenen Regulationsfähigkeit und des individuellen Wohlbefindens im Mittelpunkt.",
        },
      ],
    },
    guideAfterSectionId: "koerper-signale",
    finalCta: {
      title: "Bereit, deinem\nKörper",
      emphasis: "zuzuhören?",
      body:
        "Dein Körper spricht mit dir, manchmal leise, manchmal deutlich. Wenn du seine Signale besser verstehen und wieder mehr Balance, Klarheit und Wohlbefinden in dein Leben bringen möchtest, begleite ich dich gerne ein Stück auf deinem Weg.",
      primaryLabel: "Kostenfreies Erstgespräch",
      primaryHref: site.bookingUrl,
      primaryExternal: true,
      secondaryLabel: "Termin online buchen",
      secondaryHref: site.bookingUrl,
      secondaryExternal: true,
    },
  },
  kinderwunsch: {
    slug: "/leistungen/kinderwunsch",
    contentLayout: "dense",
    eyebrow: "Kinderwunschbegleitung",
    title: "Unterstütze\ndeinen Körper",
    titleEmphasis: "auf dem Weg\nzum\u00A0Wunschkind",
    intro:
      "Kinesiologische Kinderwunschbegleitung für Paare, die sich auf eine Schwangerschaft vorbereiten möchten, Stress reduzieren und emotional gestärkt durch den Kinderwunschprozess gehen möchten.",
    heroImage: "/images/layout images/pregnant.png",
    heroAlt: "Einfühlsame Begleitung auf dem Weg zum Wunschkind",
    heroEmphasisTone: "wine",
    heroObjectPosition: "78% 42%",
    heroObjectPositionMobile: "86% 38%",
    heroImageHeight: "100%",
    heroReadableText: true,
    heroActions: {
      primary: {
        label: "Kostenfreies Erstgespräch",
        href: site.bookingUrl,
        external: true,
      },
      secondary: {
        label: "Termin online buchen",
        href: site.bookingUrl,
        external: true,
      },
    },
    quote: "Hier darfst du ankommen. Mit allem, was gerade da ist.",
    quoteAfterSectionId: "emotionaler-einstieg",
    quoteTheme: "wine-soft",
    sections: [
      {
        id: "emotionaler-einstieg",
        theme: "wine",
        presentation: "head",
        title: "Wenn\nKinderwunsch",
        titleEmphasis: "zur Belastung\nwird",
        image: "/images/layout images/pregnant.png",
        imageAlt: "Einfühlsame Kinderwunschbegleitung",
        imageObjectPosition: "78% 42%",
        imageObjectPositionMobile: "86% 38%",
        lead:
          "Ein unerfüllter Kinderwunsch berührt oft mehr als nur den Körper. Er berührt Hoffnung, Vertrauen, Partnerschaft, Sexualität, Selbstbild und das Gefühl, den eigenen Körper nicht mehr richtig verstehen zu können.",
        body: [
          "Viele Paare erleben diese Zeit als Wechsel zwischen Zuversicht und Enttäuschung, Kontrolle und Ohnmacht, Nähe und Rückzug.",
        ],
      },
      {
        id: "ganzheitliche-unterstuetzung",
        theme: "wine-soft",
        presentation: "spread",
        kicker: "Ganzheitliche Unterstützung",
        title: "Stress regulieren,\nKörper & Hormone",
        titleEmphasis: "unterstützen",
        image: "/images/hero/review/02-editorial-therapy.jpg",
        imageAlt: "Ruhige therapeutische Begleitung mit fliessendem Tuch",
        imageObjectPosition: "68% center",
        imageObjectPositionMobile: "62% 28%",
        lead:
          "Kinesiologie ersetzt keine medizinische Behandlung. Sie kann dich jedoch ergänzend auf körperlicher, emotionaler und mentaler Ebene unterstützen.",
        body: [
          "Ein wichtiger Schwerpunkt ist die Stressregulation. Wenn Druck, Anspannung und innere Unruhe nachlassen, kann der Körper leichter in Balance finden. Das kann auch das hormonelle Gleichgewicht und die natürliche Regulation des Körpers unterstützen.",
          "Gerade im Kinderwunschprozess sind Hormone, Nervensystem, Schlaf, Emotionen und Körperwahrnehmung eng miteinander verbunden.",
          "Die Begleitung hilft dir, wieder mehr Ruhe, Vertrauen und Verbindung zu deinem Körper zu entwickeln.",
        ],
      },
      {
        id: "natuerlicher-kinderwunsch",
        theme: "wine",
        presentation: "split",
        splitMedia: "right",
        kicker: "Natürlicher Kinderwunsch",
        title: "Körper",
        titleEmphasis: "bewusst\nbegleiten",
        image: "/images/layout images/kinderwunsch-koerper-bewusst-tee.jpg",
        imageAlt: "Junge Frau sitzt am Fenster und trinkt Tee",
        imageObjectPosition: "center center",
        imageObjectPositionMobile: "center center",
        lead:
          "Wenn du dir ein Kind wünschst und deinen Körper besser wahrnehmen möchtest, kann Kinesiologie helfen, deinen Zyklus, deine Bedürfnisse und dein inneres Erleben feiner zu spüren.",
        body: [
          "Dabei geht es nicht um Kontrolle. Es geht um Vertrauen, Stressabbau, Körperbewusstsein und sanfte Unterstützung deiner natürlichen Regulation.",
        ],
      },
      {
        id: "medizinische-behandlung",
        theme: "wine-deep",
        presentation: "split",
        splitMedia: "right",
        kicker: "Medizinische Kinderwunschbehandlung",
        title: "Begleitung während",
        titleEmphasis: "IVF, ICSI oder IUI",
        lead:
          "Medizinische Kinderwunschbehandlungen können Hoffnung geben und gleichzeitig sehr fordernd sein.",
        body: [
          "Termine, Hormone, Untersuchungen, Wartephasen und Transfers können Körper und Nervensystem stark belasten.",
        ],
        layout: "single",
        density: "tight",
        itemsVariant: "list",
        itemsIntro: "Kinesiologie kann ergänzend begleiten bei:",
        items: [
          "IVF",
          "ICSI",
          "IUI",
          "Hormoneller Stimulation",
          "Vorbereitung auf Punktion oder Transfer",
          "Belastenden Wartephasen",
          "Wiederholten Fehlversuchen",
          "Emotionale Erschöpfung",
        ],
        note:
          "Der Fokus liegt auf Stressabbau, emotionaler Stabilisierung, Ressourcenstärkung und einem besseren inneren Halt während der Behandlung.",
        noteVariant: "callout",
      },
      {
        id: "nach-verlust",
        theme: "wine",
        presentation: "compact",
        kicker: "Nach Fehlgeburt oder Schwangerschaftsverlust",
        title: "Raum für\nTrauer &",
        titleEmphasis: "behutsamer\nNeu\u2060beginn",
        image: "/images/layout images/kinderwunsch-fehlgeburt-trauer.jpg",
        imageAlt: "Weite, ruhige Landschaft — Raum für Trauer und behutsamen Neubeginn",
        imageObjectPosition: "74% 18%",
        imageObjectPositionMobile: "82% 18%",
        lead: "Ein Verlust endet nicht einfach, nur weil der Körper weitermacht.",
        body: [
          "Auch ein früher Schwangerschaftsverlust kann tief berühren. Vielleicht fühlt sich dein Umfeld schon weiter an, während in dir noch Trauer, Schmerz oder Unsicherheit sind.",
          "In der kinesiologischen Begleitung entsteht Raum für Trauer, Körperwahrnehmung und behutsamen Neubeginn.\nOhne Druck. Ohne Eile. Ohne Bewertung.",
        ],
      },
      {
        id: "langer-weg",
        theme: "wine-soft",
        presentation: "head",
        kicker: "Wenn der Weg schon lange dauert",
        title: "Wieder Boden\nunter den",
        titleEmphasis: "Füssen spüren",
        image: "/images/Claudia/claudia-dimmler-Kinesiologie-Adligenswil.jpg",
        imageAlt: "Claudia Dimmler, Komplementärtherapeutin in Adligenswil",
        imageObjectPosition: "center 25%",
        imageObjectPositionMobile: "center 18%",
        lead:
          "Je länger der Kinderwunsch unerfüllt bleibt, desto mehr kann sich das innere Erleben verändern.",
        body: [
          "Aus Hoffnung kann Erschöpfung werden. Aus Vertrauen kann Kontrolle werden. Aus Nähe kann Druck werden. Aus Mut kann Angst vor erneutem Scheitern werden.",
          "Kinesiologie kann helfen, deine inneren Ressourcen zu stärken und wieder mehr Stabilität in dieser intensiven Lebensphase zu finden.",
        ],
        layout: "single",
      },
      {
        id: "partnerschaft",
        theme: "wine",
        presentation: "split",
        splitMedia: "left",
        kicker: "Partnerschaft",
        title: "Gemeinsam\ndurch eine",
        titleEmphasis: "sensible Zeit",
        image: "/images/layout images/kinderwunsch-partnerschaft-haende.jpg",
        imageAlt: "Zwei Hände in ruhiger, verbundener Geste — Partnerschaft im Kinderwunsch",
        imageObjectPosition: "center center",
        imageObjectPositionMobile: "center 42%",
        lead: "Kinderwunsch betrifft oft die ganze Beziehung.",
        body: [
          "Zwei Menschen gehen denselben Weg, erleben ihn aber nicht immer auf dieselbe Weise. Eine Person möchte reden, die andere braucht Rückzug. Eine Person sucht Lösungen, die andere versucht, nicht daran zu zerbrechen.",
          "Begleitung kann helfen, unterschiedliche Gefühle und Bedürfnisse sichtbarer zu machen. So können wieder mehr Verständnis, Nähe und Entlastung entstehen.",
        ],
      },
    ],
    process: {
      title: "So läuft die",
      emphasis: "Begleitung ab",
      theme: "wine",
      steps: [
        {
          title: "Kontakt aufnehmen",
          body: "Du kannst online einen Termin buchen oder dich per Telefon, WhatsApp, E-Mail oder Kontaktformular melden.",
        },
        {
          title: "Ankommen & klären",
          body: "Wir schauen, wo du gerade stehst: natürlich, medizinisch begleitet, nach Verlust oder in einer Pause.",
        },
        {
          title: "Körperorientiert begleiten",
          body: "Mit kinesiologischen Methoden stärken wir Stressregulation, Körperwahrnehmung, hormonelle Balance und innere Stabilität.",
        },
      ],
    },
    finalCta: {
      title: "Du musst\ndiesen Weg",
      emphasis: "nicht allein\ngehen",
      body:
        "Kinderwunsch kann ein stiller Schmerz sein. Hier bekommt er Raum. Ich begleite dich achtsam, körperorientiert und mit viel Respekt für deinen persönlichen Weg.",
      primaryLabel: "Kostenfreies Erstgespräch",
      primaryHref: site.bookingUrl,
      primaryExternal: true,
      secondaryLabel: "Termin online buchen",
      secondaryHref: site.bookingUrl,
      secondaryExternal: true,
    },
  },
  yoga: {
    slug: "/leistungen/yoga",
    contentLayout: "dense",
    eyebrow: "Hatha Yoga und Satyananda Yoga Nidra®",
    title: "Innehalten",
    titleEmphasis: "Den Körper spüren\nInnere Ruhe finden",
    intro:
      "Yoga für Körperbewusstsein, Energiefluss und Ausgeglichenheit im Alltag.",
    heroImage: "/images/hero/yoga hero.jpg",
    heroAlt: "Hatha Yoga bei DeineQuelle in Adligenswil",
    heroObjectPosition: "40% center",
    heroObjectPositionMobile: "42% 28%",
    heroImageHeight: "100%",
    heroActions: {
      primary: {
        label: "Kostenfreies Erstgespräch",
        href: site.bookingUrl,
        external: true,
      },
      secondary: {
        label: "Termin online buchen",
        href: site.bookingUrl,
        external: true,
      },
    },
    trustItems: [
      "Hatha Yoga insp. aus der Satyananda Yoga®-Lehre",
      "Studio und online",
      "Yoga Nidra",
    ],
    quote: "Du darfst so kommen, wie du bist.",
    quoteAfterSectionId: "intro",
    quoteTheme: "warm-soft",
    sections: [
      {
        id: "intro",
        theme: "warm-soft",
        presentation: "head",
        hideSpread: true,
        kicker: "Willkommen",
        title: "Yoga als Weg",
        titleEmphasis: "zurück zu deiner\ninneren Kraft",
        image: "/images/yoga/yoga-raum-claudia-dimmler.jpg",
        imageAlt: "Ruhiger Yogaraum in Adligenswil",
        imageObjectPosition: "center center",
        imageObjectPositionMobile: "center 26%",
        lead: "Yoga muss nicht perfekt sein. Du musst nicht besonders beweglich, sportlich oder erfahren sein.",
        body: [
          "In meinen Yogalektionen geht es darum, den Körper wahrzunehmen, den Atem zu spüren und Schritt für Schritt wieder mehr Ruhe, Stabilität und Verbindung zu dir selbst aufzubauen.",
        ],
        layout: "single",
      },
      {
        id: "satyananda",
        theme: "warm-deep",
        presentation: "spread",
        kicker: "Satyananda Yoga® & Yoga Nidra®",
        title: "Inspiriert aus der",
        titleEmphasis: "Satyananda Yoga®\nLehre",
        image: "/images/yoga/yoga-raum-claudia-dimmler.jpg",
        imageAlt: "Hatha Yoga Praxis im Studio",
        imageObjectPosition: "center 35%",
        imageObjectPositionMobile: "center 26%",
        lead: "Meine Yogalektionen sind inspiriert aus der Satyananda Yoga®-Lehre. Satyananda Yoga Nidra® ergänzt die Praxis als geführte Tiefenentspannung.",
        body: [
          "Diese integrale Yogatradition verbindet verschiedene Wege des Yoga zu einem ganzheitlichen System. Körper, Atem, Geist, Emotionen und innere Entwicklung werden dabei als verbunden betrachtet.",
          "Ziel der Praxis ist es, Körper und Geist in ein harmonisches Zusammenspiel zu bringen.",
          "Im Alltag sind wir oft vielen Reizen ausgesetzt. Der Geist wird müde, der Körper bleibt angespannt und das Nervensystem findet schwer zur Ruhe. Satyananda Yoga Nidra® lenkt die Wahrnehmung Schritt für Schritt nach innen.",
          "Körper und Geist dürfen sich erholen. Viele Menschen erleben dadurch mehr Entspannung, Klarheit und innere Stabilität.",
        ],
        layout: "single",
      },
      {
        id: "lektion",
        theme: "warm",
        presentation: "split",
        splitMedia: "left",
        kicker: "Inhalte einer Yogalektion",
        title: "Was dich in einer",
        titleEmphasis: "Yogalektion\nerwartet",
        image: "/images/yoga/03.jpg",
        imageAlt: "Ganzheitliche Yogapraxis",
        imageObjectPosition: "center center",
        imageObjectPositionMobile: "center 30%",
        lead:
          "In jeder Yogalektion verbinden sich verschiedene Elemente zu einer ruhigen und ganzheitlichen Praxis.",
        body: [],
        layout: "single",
        features: [
          {
            title: "Asanas",
            body:
              "Körperübungen stärken den Körper, fördern Beweglichkeit und unterstützen die Verbindung zwischen körperlicher und mentaler Ebene.",
          },
          {
            title: "Pranayama",
            body:
              "Atemübungen helfen, den Atem bewusster wahrzunehmen, ruhiger zu werden und neue Energie zu sammeln.",
          },
          {
            title: "Tiefenentspannung",
            body:
              "Entspannungsphasen unterstützen den Körper dabei, loszulassen und in Regeneration zu kommen.",
          },
          {
            title: "Meditation",
            body:
              "Meditative Elemente beruhigen den Geist, fördern Konzentration und stärken den Zugang zur eigenen Innenwelt.",
          },
        ],
      },
      {
        id: "nidra-fuer-wen",
        theme: "warm-deep",
        presentation: "compact",
        kicker: "Für wen eignet sich Yoga und Yoga Nidra",
        title: "Ruhe finden in",
        titleEmphasis: "belastenden\nLebensphasen",
        image: "/images/yoga/yoga-nidra-fuer-wen.jpg",
        imageAlt: "Ruhige Yogastudio-Atmosphäre am Morgen",
        imageObjectPosition: "center center",
        imageObjectPositionMobile: "center 28%",
        lead:
          "Satyananda Yoga Nidra® eignet sich für Menschen, die viel leisten, schlecht abschalten können oder körperlich, mental oder emotional belastet sind.",
        body: [],
        layout: "single",
        density: "tight",
        itemsVariant: "topics",
        items: [
          "Kinder und Jugendliche",
          "Junge Eltern",
          "Sportlerinnen und Sportler",
          "Erschöpfung und Burnout-Themen",
          "Psychosomatische Beschwerden",
          "Studierende und Berufstätige",
          "Ältere Menschen",
          "Innere Unruhe und Schlafprobleme",
          "ADS oder ADHS",
        ],
      },
      {
        id: "wobei-yoga",
        theme: "warm",
        presentation: "head",
        kicker: "Wobei Yoga unterstützen kann",
        title: "Mehr Ruhe, Kraft",
        titleEmphasis: "& Balance",
        image: "/images/yoga/yoga-raum-claudia-dimmler.jpg",
        imageAlt: "Yoga für Balance und Regeneration",
        imageObjectPosition: "center center",
        imageObjectPositionMobile: "center 26%",
        lead: "Yoga und Satyananda Yoga Nidra® können dich unterstützen bei:",
        body: [],
        layout: "single",
        density: "tight",
        itemsVariant: "topics",
        items: [
          "Stressbewältigung",
          "Tiefenentspannung",
          "Mentaler Stärkung",
          "Konzentration",
          "Schlafproblemen",
          "Innerer Unruhe",
          "Körperlicher Anspannung",
          "Hormoneller Balance",
          "Schwangerschaftsbegleitung",
          "Körperlichem Gleichgewicht",
          "Persönlicher Entwicklung",
        ],
        note: "Die Praxis ist keine Leistung. Sie ist ein Weg, wieder mehr Verbindung zu dir selbst aufzubauen.",
        noteVariant: "tagline",
      },
      {
        id: "kurse",
        theme: "warm-soft",
        presentation: "split",
        splitMedia: "left",
        kicker: "Kurse und Angebote",
        title: "Yoga im",
        titleEmphasis: "Studio, online\noder auf Anfrage",
        image: "/images/yoga/Claudia_breath.png",
        imageAlt: "Claudia Dimmler bei einer Atemübung im Yogaraum",
        imageObjectPosition: "center center",
        imageObjectPositionMobile: "center 32%",
        lead: "Die Yogalektionen finden im Studio und online statt.",
        body: [
          "Hatha Yoga mit Shavasana oder Pratyahara-Meditation findet als 75- oder 90-minütige Lektion statt. Die Kurse werden im Studio und online durchgeführt.",
          "Mindestteilnehmerzahl: 3 Personen. Privatlektionen, Firmenworkshops und Kurse sind auf Anfrage möglich.",
        ],
        layout: "single",
        density: "tight",
        itemsIntro: "Aktuelle Kurszeiten:",
        items: [
          "Montag: 9.30 - 11.00 (90 Min.)",
          "Montag: 18.15 - 19.30 (75 Min.)",
          "Montag: 19.45 - 21.15 (90 Min.)",
          "Mittwoch: 18.00 - 19.30 (90 Min.)",
          "Mittwoch: 19.45 - 21.00 (75 Min.)",
        ],
        note:
          "Freie Plätze, Online-Teilnahme und Anmeldung: info@deinequelle.com oder 076 413 80 50.",
        noteVariant: "callout",
        cta: {
          label: "Kostenfreies Erstgespräch",
          href: site.bookingUrl,
          external: true,
          tone: "accent",
        },
      },
      {
        id: "preise",
        theme: "light",
        presentation: "head",
        kicker: "Preise",
        title: "Tarife für",
        titleEmphasis: "Studio & online",
        lead: "Yoga kann mit CSS Coin, TWINT oder auf Rechnung bezahlt werden.",
        body: [],
        layout: "single",
        features: [
          {
            title: "Lektionen à 75 Minuten",
            body:
              "Einzellektion Fr. 34.00, im Abo Fr. 28.50 pro Lektion. Online-Einzellektion Fr. 30.00, im Abo Fr. 25.00 pro Lektion.",
          },
          {
            title: "Lektionen à 90 Minuten",
            body:
              "Einzellektion Fr. 39.00, im Abo Fr. 33.50 pro Lektion. Online-Einzellektion Fr. 35.00, im Abo Fr. 29.00 pro Lektion.",
          },
          {
            title: "Privatlektionen",
            body: "Kosten auf Anfrage.",
          },
          {
            title: "Firmenworkshops & Kurse",
            body: "Kosten auf Anfrage oder gemäss Ausschreibung.",
          },
        ],
        note:
          "Falls du einmal eine Lektion verpasst… Nach Absprache kannst du diese innerhalb deines laufenden Abonnements in einem anderen Kurs nachholen. Gerne stelle ich dir auch eine Aufzeichnung der Lektion zur Verfügung (nur bei rechtzeitiger Absage – 24 Std. im voraus – und im Abo möglich).",
        noteVariant: "callout",
      },
      {
        id: "yoga-videos",
        hidden: true,
        theme: "warm-soft",
        presentation: "head",
        kicker: "Videos",
        title: "Video-Übungen",
        titleEmphasis: "folgen",
        lead:
          "Hier entstehen Videobereiche für ausgewählte Yoga- und Yoga-Nidra-Inhalte.",
        body: [
          "Die finalen Videos werden ergänzt, sobald die Kundin sie auf YouTube oder einer vergleichbaren Plattform bereitgestellt hat.",
        ],
        layout: "single",
        features: [
          {
            title: "Satyananda Yoga Nidra®",
            body: "Platzhalter für ein eingebettetes Video.",
          },
          {
            title: "Hatha Yoga",
            body: "Platzhalter für ein eingebettetes Video.",
          },
        ],
      },
    ],
    finalCta: {
      title: "Nimm dir Zeit",
      emphasis: "für dich",
      body:
        "Wenn du dir mehr Ruhe, Kraft und Verbindung zu deinem Körper wünschst, freue ich mich, dich im Yoga zu begleiten.",
      primaryLabel: "Kostenfreies Erstgespräch",
      primaryHref: site.bookingUrl,
      primaryExternal: true,
    },
  },
  sport: {
    slug: "/leistungen/sport-kinesiologie",
    eyebrow: "Sport-Kinesiologie",
    title: "Sport-\nkinesiologie",
    intro:
      "Sportkinesiologie fördert die Leistungsfähigkeit von Sportler/innen durch die Optimierung des Energieflusses in Biomechanik, Biochemie und Psyche.",
    heroImage: "/images/sections/sportkinesiologie-athletes-hero.jpg",
    heroImageMobile: "/images/sections/sportkinesiologie-athletes-hero-mobile.jpg",
    heroAlt: "Sportkinesiologie in der Praxis",
    heroObjectPosition: "center 30%",
    heroObjectPositionMobile: "center 22%",
    trustItems: [
      "Förderung der Leistungsfähigkeit durch optimieren des Energieflusses",
      "Mental stark bleiben",
      "Ergänzend zur Physiotherapie",
    ],
    sections: [
      {
        id: "sport",
        theme: "sage",
        presentation: "head",
        hideSpread: true,
        kicker: "Sportkinesiologie",
        title: "Potential",
        titleEmphasis: "vollumfänglich\nausschöpfen",
        lead:
          "Sportkinesiologie fördert die Leistungsfähigkeit von Sportler/innen durch die Optimierung des Energieflusses in Biomechanik, Biochemie und Psyche, damit das eigene Potential vollumfänglich ausgeschöpft werden kann.",
        body: [
          "Die Begleitung kann körperliche und geistige Beschwerden einordnen und die Optimierung biochemischer, organischer und zellulärer Abläufe im Körper unterstützen.",
          "Sie kann ergänzend mit Trainerinnen und Trainern, Ärztinnen und Ärzten, Physiotherapeutinnen und Physiotherapeuten sowie weiteren gesundheitsfördernden Therapieformen zusammenspielen.",
        ],
        cta: {
          label: "Kostenfreies Erstgespräch",
          href: site.bookingUrl,
          external: true,
          tone: "sage",
        },
        items: [
          "Behandlung von körperlichen und geistigen Beschwerden sowie Optimierung des biochemischen, organischen und zellulären Ablaufs im Körper",
          "Trainingsoptimierung durch Schritt-für-Schritt-Optimierung einzelner Elemente aus dem entsprechenden Sportbereich",
          "Wettkampfvorbereitung in Form eines ganzheitlichen Stressmanagements",
          "Unterstützung beim Management von Blockaden und Krisen",
          "Fördern der Rekonvaleszenz nach körperlicher Erschöpfung und/oder Verletzungen",
          "Vorbereitung auf Operationen",
          "Zusammenarbeit mit Trainern, Ärzten, Physiotherapeuten sowie weiteren gesundheitsfördernden Therapieformen",
        ],
      },
    ],
    process: {
      title: "In 3 Schritten",
      emphasis: "zu mehr\nStabilität",
      steps: [
        {
          title: "Termin wählen",
          body: "Buche online, ruf an, schreibe per WhatsApp/SMS oder sende eine E-Mail.",
        },
        {
          title: "Beschwerden einordnen",
          body: "Wir betrachten Überlastung, Bewegungsmuster, Stress und Regeneration ganzheitlich.",
        },
        {
          title: "Ressourcen aktivieren",
          body: "Die Begleitung unterstützt deine Leistungsfähigkeit und den Weg zurück in Belastbarkeit.",
        },
      ],
    },
    finalCta: {
      title: "Bring Bewegung",
      emphasis: "und inneres\nGleichgewicht zusammen",
      body: "Sport-Kinesiologie kann dich ergänzend zu Training, Medizin und Physiotherapie unterstützen.",
      primaryLabel: "Kostenfreies Erstgespräch",
      primaryHref: site.bookingUrl,
      primaryExternal: true,
    },
  },
  ueberMich: {
    slug: "/ueber-mich",
    contentLayout: "dense",
    eyebrow: "Über mich",
    title: "Ich begleite Menschen",
    titleEmphasis: "zurück zur inneren Balance",
    intro:
      "Mit Kinesiologie und Yoga begleite ich dich achtsam, wertschätzend und körperorientiert.",
    heroImage: "/images/hero/about_hero.jpg",
    heroAlt: "Claudia Dimmler, Kinesiologin und Yogalehrerin",
    heroObjectPosition: "right 38%",
    heroObjectPositionMobile: "72% 26%",
    heroImageHeight: "100%",
    heroActions: {
      primary: {
        label: "Kostenfreies Erstgespräch",
        href: site.bookingUrl,
        external: true,
      },
    },
    trustItems: [
      "Medizinische Praxisassistentin EFZ",
      "Dipl. Komplementärtherapeutin Kinesiologie AKT",
      "Yoga insp. aus der Satyananda Yoga®-Lehre",
      "EMR-zertifiziert · KineSuisse",
    ],
    sections: [
      {
        id: "einstieg",
        theme: "warm-soft",
        presentation: "head",
        hideSpread: true,
        title: "Mein Weg",
        image: "/images/Claudia/claudia_dimmler_3.jpg",
        imageAlt: "Claudia Dimmler",
        imageObjectPosition: "28% 38%",
        imageObjectPositionMobile: "22% 34%",
        lead:
          "Schon früh interessierten mich der Mensch, sein Körper und die Zusammenhänge von Gesundheit und Bewegung. Diese Faszination führte mich zur Ausbildung als medizinische Praxisassistentin. Meine mehrjährige Tätigkeit in diesem Beruf prägte mein Verständnis für den menschlichen Körper, gesundheitliche Prozesse und die individuelle Situation jedes Menschen.",
        body: [
          "Über die Jahre wurde Bewegung und Körperbewusstsein zu einem wichtigen Bestandteil meines Lebens. Yoga eröffnete mir einen neuen Zugang zu Achtsamkeit, innerer Balance und dem bewussten Umgang mit Körper und Geist. Aus dieser persönlichen Erfahrung entwickelte sich der Wunsch, Yoga auch beruflich weiterzugeben.",
          "Während meiner Familienzeit durfte ich wertvolle Erfahrungen sammeln und meine eigenen Ressourcen weiterentwickeln. Die Verbindung von Körper, Bewegung, Achtsamkeit und innerer Balance wurde dabei immer wichtiger.",
          "Mit der Ausbildung zur Yogalehrerin und später zur KomplementärTherapeutin Methode Kinesiologie verbanden sich meine bisherigen Erfahrungen auf natürliche Weise. Heute begleite ich Menschen dabei, ihre Körperwahrnehmung zu vertiefen, ihre Ressourcen zu stärken und mehr Balance im Leben zu finden.",
        ],
        layout: "single",
      },
      {
        id: "gesundheit",
        theme: "warm",
        presentation: "split",
        splitMedia: "left",
        kicker: "Gesundheit beginnt mit Verbindung",
        title: "Mehr als die",
        titleEmphasis: "Abwesenheit von\nBeschwerden",
        image: "/images/other/about_block_4.jpg",
        imageAlt: "Ruhige, natürliche Szene als Symbol für Verbundenheit und Gesundheit",
        imageObjectPosition: "center center",
        imageObjectPositionMobile: "center 32%",
        lead:
          "Für mich bedeutet Gesundheit, dass ein Mensch sich wieder spürt, dem eigenen Körper zuhören kann und Zugang zu seinen Ressourcen findet.",
        body: [
          "Viele Beschwerden zeigen sich nicht zufällig. Der Körper reagiert auf Belastung, Stress, Überforderung, emotionale Themen, alte Muster oder Phasen intensiver Veränderung.",
          "Deshalb sehe ich nicht nur ein Symptom, sondern den ganzen Menschen mit seiner Geschichte, seinem Körper, seinen Gefühlen, seinen Fragen und seinen Möglichkeiten.",
        ],
        layout: "single",
      },
      {
        id: "arbeit",
        theme: "warm-soft",
        presentation: "head",
        kicker: "Wie ich arbeite",
        title: "individuell, körperzentriert und",
        titleEmphasis: "ressourcenorientiert",
        image: "/images/Kinesiology/claudia-302.jpg",
        imageAlt: "Kinesiologische Begleitung",
        imageObjectPosition: "center 30%",
        imageObjectPositionMobile: "center 22%",
        lead:
          "In der Kinesiologie nutze ich den Muskeltest als körpereigenes Rückmeldesystem. Er kann sichtbar machen, wo Stress gespeichert ist, welche Themen das System belasten und welche Impulse stärkend wirken können.",
        body: [
          "Im Yoga begleite ich dich über achtsame Bewegung, Atem und Körperwahrnehmung zurück in mehr Stabilität, Ruhe und Verbindung.",
          "Dabei geht es nicht darum, etwas zu erzwingen. Du musst nichts leisten, nichts beweisen und nichts perfekt machen.",
        ],
        layout: "single",
        note: "Du darfst ankommen.",
        noteVariant: "tagline",
      },
      {
        id: "vision",
        theme: "warm-deep",
        presentation: "split",
        splitMedia: "right",
        splitBodyFullWidth: true,
        kicker: "Meine Vision",
        title: "Gesund durch das optimale Zusammenspiel",
        image: "/images/Claudia/claudia_dimmler_3.jpg",
        imageAlt: "Claudia Dimmler",
        imageObjectPosition: "28% 38%",
        imageObjectPositionMobile: "22% 34%",
        lead:
          "Menschen natürlich und nachhaltig zurück zu ihrer Gesundheit und Kraft zu begleiten.",
        body: [
          "Dafür braucht es oft mehr als nur eine einzelne Methode. Der Mensch wird besonders gut unterstützt, wenn Körper, Nervensystem, Emotionen, Gedanken, medizinische Versorgung, therapeutische Begleitung und die eigenen Ressourcen sinnvoll zusammenarbeiten.",
          "Ich sehe meine Arbeit als Teil dieses Zusammenspiels.",
          "Deine Quelle steht für den Ort in dir, an dem Ruhe, Kraft und Vertrauen wieder spürbar werden. Manchmal ist dieser Zugang durch Stress, Schmerzen, Erschöpfung, Angst oder lange belastende Lebensphasen überlagert.",
          "Meine Arbeit lädt dich ein, diesen Zugang Schritt für Schritt wiederzufinden: achtsam, klar, körperorientiert und ohne schnelle Versprechen.",
        ],
        layout: "single",
      },
      {
        id: "qualifikationen",
        theme: "warm",
        presentation: "head",
        hideSpread: true,
        kicker: "Ausbildungen und Qualifikationen",
        title: "Fachlich\nfundiert &",
        titleEmphasis: "ganzheitlich\ngeprägt",
        image: "/images/Claudia/claudia-dimmler-Kinesiologie-Adligenswil.jpg",
        imageAlt: "Claudia Dimmler in der Praxis",
        imageObjectPosition: "center 25%",
        imageObjectPositionMobile: "center 18%",
        lead:
          "Meine Arbeit verbindet medizinisches Grundwissen, langjährige Körpererfahrung, Yoga, Satyananda Yoga Nidra® und Komplementärtherapie.",
        body: [],
        layout: "single",
      },
    ],
    guideSection: {
      title: "Ausbildungen",
      titleEmphasis: "im Überblick",
      layout: "groups",
      theme: "warm-soft",
      intro:
        "Medizinischer Hintergrund, Yoga und Kinesiologie bilden zusammen die Basis meiner Arbeit.",
      categories: [
        {
          number: "01",
          category: "Grundausbildung",
          bullets: [
            "Schulabschluss Sekundarstufe",
            "Medizinische Praxisassistentin EZF",
            "Ernährung und Verpflegung Modul 1, Bildungsgang Bäuerin",
          ],
        },
        {
          number: "02",
          category: "Yoga und Yoga Nidra",
          bullets: [
            "Satyananda Yogaausbildung 2, Samatvam Yogaschule, Zürich",
            "Pawanmuktasana und Surya Namaskara, Samatvam Yogaschule, Zürich",
            "Pranayama und Pratyahara Meditation, Samatvam Yogaschule, Zürich",
            "Satyananda Yoga Nidra, Samatvam Yogaschule, Zürich",
          ],
        },
        {
          number: "03",
          category: "Kinesiologie KT",
          lead: "Komplementärtherapeutische Ausbildung:",
          bullets: [
            "Eidgenössisches Diplom, Komplementärtherapie Methode Kinesiologie, OdA KT",
            "Branchenzertifikat, Komplementärtherapeutin Methode Kinesiologie, OdA KT",
            "My Kinesiologie Partnerin AKT",
          ],
        },
      ],
    },
    guideAfterSectionId: "qualifikationen",
    finalCta: {
      title: "Lass uns",
      emphasis: "sprechen",
      body:
        "Wenn du spürst, dass du dir Unterstützung wünschst, freue ich mich über deine Nachricht. Gemeinsam schauen wir, was du gerade brauchst und welcher Weg für dich passend ist.",
      primaryLabel: "Kostenfreies Erstgespräch",
      primaryHref: site.bookingUrl,
      primaryExternal: true,
      secondaryLabel: "Termin online buchen",
      secondaryHref: site.bookingUrl,
      secondaryExternal: true,
    },
  },
} satisfies Record<string, DesignPageData>;
