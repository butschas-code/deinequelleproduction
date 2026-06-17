import type { Metadata } from "next";
import { DesignLegalPage } from "@/components/legal/DesignLegalPage";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklaerung — DEINE QUELLE, Claudia Dimmler.",
};

export default function DatenschutzPage() {
  return (
    <DesignLegalPage
      title="Datenschutz"
      subtitle="Datenschutzerklaerung"
      textFile="Datenschutzerklaerung-DSE.txt"
      variant="editorial"
    />
  );
}
