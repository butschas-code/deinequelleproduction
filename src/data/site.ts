export const site = {
  name: "DEINE QUELLE",
  tagline: "Mehr Leben",
  logo: {
    src: "/images/brand/deine-quelle-logo.png",
    width: 1322,
    height: 804,
  },
  practitioner: "Claudia Dimmler",
  description:
    "Komplementärtherapie Methode Kinesiologie und Hatha Yoga mit Pratyahara-Meditation in Adligenswil.",
  url: "https://deinequelle.com",
  email: "info@deinequelle.com",
  emailAlt: "claudia@deinequelle.com",
  phone: "076 413 80 50",
  phoneTel: "+41764138050",
  address: {
    street: "Meggerstrasse 4a",
    postalCode: "6043",
    locality: "Adligenswil",
    country: "CH",
    countryName: "Schweiz",
    formatted: "Meggerstrasse 4a, 6043 Adligenswil",
  },
  geo: {
    latitude: 47.0701337,
    longitude: 8.378076,
  },
  bookingUrl: "https://booking.masuyo.ch/dimmler",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Meggerstrasse%204a%2C%206043%20Adligenswil%2C%20Schweiz&t=m&z=18&output=embed&iwloc=near",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Meggerstrasse+4a,+6043+Adligenswil,+Schweiz",
  /** Optional: Google Place ID — eintragen sobald bekannt für präzisere Maps-Links */
  googlePlaceId: "" as string,
  transit:
    "Der Yogaraum/Die Praxis ist in Adligenswil gut erreichbar mit den ÖV (Postauto Nr. 73, Haltestelle Sagi, Adligenswil). Kostenlose Parkplätze sind vorhanden.",
  contactChannels:
    "Ich freue mich auf deine telefonische Kontaktaufnahme oder über die Möglichkeit des Online-Anmeldetools (ausschliesslich für kinesiologische Termine), WhatsApp/SMS oder E-Mail.",
  responseExpectation:
    "Kontaktanfragen werden in der Regel innerhalb von 1–2 Werktagen beantwortet.",
} as const;
