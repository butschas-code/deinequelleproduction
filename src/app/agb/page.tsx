import type { Metadata } from "next";
import { pages } from "@/data/pages";
import { heroImages } from "@/data/heroImages";
import { PageHero } from "@/components/layout/PageHero";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen — Kinesiologie & Yoga, DEINE QUELLE.",
};

export default function AgbPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="AGB"
        subtitle="Allgemeine Geschäftsbedingungen"
        imageSrc={heroImages.agb.src}
        imageAlt={heroImages.agb.alt}
      />
      <LegalDocumentPage
        title="AGB"
        pdfPath={pages.documents.agb}
        textFile="AGB-Kine_Yoga.txt"
        intro="AGB für Yoga und Kinesiologie KT — identisch zum PDF der bisherigen Website."
        suppressTitle
      />
    </>
  );
}
