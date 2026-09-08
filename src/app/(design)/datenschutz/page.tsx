import type { Metadata } from "next";
import { DesignLegalPage } from "@/components/legal/DesignLegalPage";
import { GoogleAnalyticsOptOut } from "@/components/analytics/GoogleAnalyticsOptOut";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung — DEINE QUELLE, Claudia Dimmler.",
};

export default function DatenschutzPage() {
  return (
    <DesignLegalPage
      title="Datenschutz"
      subtitle="Datenschutzerklärung"
      textFile="Datenschutzerklaerung-DSE.txt"
      variant="editorial"
    >
      <GoogleAnalyticsOptOut gaId={site.googleAnalyticsId} />
    </DesignLegalPage>
  );
}
