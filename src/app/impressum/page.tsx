import type { Metadata } from "next";
import { pages } from "@/data/pages";
import { heroImages } from "@/data/heroImages";
import { PageHero } from "@/components/layout/PageHero";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Hinweise — DEINE QUELLE.",
};

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Impressum"
        imageSrc={heroImages.impressum.src}
        imageAlt={heroImages.impressum.alt}
      />
      <LegalDocumentPage
        title="Impressum"
        pdfPath={pages.documents.impressum}
        textFile="Impressum-Kine_Yoga.txt"
        intro="Vollständiger Text wie im PDF der bisherigen Website."
        suppressTitle
      />
    </>
  );
}
