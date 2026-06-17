import type { Metadata } from "next";
import { DesignLegalPage } from "@/components/legal/DesignLegalPage";

export const metadata: Metadata = {
  title: "Schweigepflicht & Ethik",
  description: "Ethik- und Verhaltensrichtlinien KineSuisse — DEINE QUELLE.",
};

export default function EthikPage() {
  return (
    <DesignLegalPage
      title="Schweigepflicht & Ethik"
      subtitle="Ethik-Richtlinien KineSuisse"
      textFile="Ethik-Richtlinien.txt"
      intro="Ethik- und Verhaltensrichtlinien des Berufsverbands KineSuisse."
    />
  );
}
