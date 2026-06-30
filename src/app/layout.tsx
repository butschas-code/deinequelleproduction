import type { Metadata, Viewport } from "next";
import { Dancing_Script, Inter, Lato } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { buildLocalBusinessJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { CookieBanner } from "@/components/consent/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f5f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootLd = buildLocalBusinessJsonLd({ reviews: [], aggregateRating: null });

  return (
    <html
      lang="de-CH"
      className={`${inter.variable} ${lato.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={rootLd} />
      </head>
      <body className="min-h-full">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
