import type { Metadata } from "next";
import { DesignPage } from "@/components/deinequelle/DesignPage";
import { designPages } from "@/data/deinequelleDesignPages";
export const metadata: Metadata = {
  title: "Sport-Kinesiologie",
  description:
    "Sportkinesiologie in Adligenswil: Leistungsfähigkeit, Trainingsoptimierung, Wettkampfvorbereitung, Rekonvaleszenz und ganzheitliches Stressmanagement.",
};

export default function SportKinesiologiePage() {
  return <DesignPage page={designPages.sport} />;
}
