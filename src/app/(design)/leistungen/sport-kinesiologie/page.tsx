import type { Metadata } from "next";
import { DesignPage } from "@/components/deinequelle/DesignPage";
import { designPages } from "@/data/deinequelleDesignPages";
export const metadata: Metadata = {
  title: "Sport-Kinesiologie",
  description:
    "Sportkinesiologie in Adligenswil: Regeneration, Überlastungsbeschwerden, mentale Stärke und ergänzende Begleitung zur Physiotherapie.",
};

export default function SportKinesiologiePage() {
  return <DesignPage page={designPages.sport} />;
}
