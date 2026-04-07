import type { Metadata } from "next";
import { pages } from "@/data/pages";
import { heroImages } from "@/data/heroImages";
import { PageHero } from "@/components/layout/PageHero";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Schweigepflicht & Ethik",
  description: "Ethik- und Verhaltensrichtlinien KineSuisse — DEINE QUELLE.",
};

export default function EthikPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Schweigepflicht & Ethik"
        subtitle="Ethik-Richtlinien KineSuisse"
        imageSrc={heroImages.ethik.src}
        imageAlt={heroImages.ethik.alt}
      />
      <LegalDocumentPage
        title="Schweigepflicht & Ethik-Richtlinien"
        pdfPath={pages.documents.ethik}
        textFile="Ethik-Richtlinien.txt"
        intro="Ethik- und Verhaltensrichtlinien des Berufsverbands KineSuisse, wie auf der bisherigen Website verlinkt."
        suppressTitle
      />
    </>
  );
}
