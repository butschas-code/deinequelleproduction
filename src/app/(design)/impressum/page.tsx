import type { Metadata } from "next";
import { DesignLegalPage } from "@/components/legal/DesignLegalPage";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Hinweise — DEINE QUELLE.",
};

export default function ImpressumPage() {
  return (
    <DesignLegalPage
      title="Impressum"
      textFile="Impressum-Kine_Yoga.txt"
      variant="editorial"
    />
  );
}
