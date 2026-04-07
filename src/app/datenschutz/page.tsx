import type { Metadata } from "next";
import { pages } from "@/data/pages";
import { heroImages } from "@/data/heroImages";
import { PageHero } from "@/components/layout/PageHero";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung — DEINE QUELLE, Claudia Dimmler.",
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutz"
        subtitle="Datenschutzerklärung"
        imageSrc={heroImages.datenschutz.src}
        imageAlt={heroImages.datenschutz.alt}
      />
      <LegalDocumentPage
        title="Datenschutzerklärung"
        pdfPath={pages.documents.datenschutz}
        textFile="Datenschutzerklaerung-DSE.txt"
        intro="Datenschutzerklärung (Version laut PDF) — ergänzend zu den Angaben auf der bisherigen Website."
        suppressTitle
      />
    </>
  );
}
