import type { Metadata } from "next";
import { DesignLegalPage } from "@/components/legal/DesignLegalPage";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen — Kinesiologie & Yoga, DEINE QUELLE.",
};

export default function AgbPage() {
  return (
    <DesignLegalPage
      title="AGB"
      subtitle="Allgemeine Geschaeftsbedingungen"
      textFile="AGB-Kine_Yoga.txt"
      intro="AGB fuer Yoga und Kinesiologie KT."
    />
  );
}
