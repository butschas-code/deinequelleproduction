import type { Metadata } from "next";
import { DesignPage } from "@/components/deinequelle/DesignPage";
import { designPages } from "@/data/deinequelleDesignPages";
export const metadata: Metadata = {
  title: "Kinesiologie",
  description:
    "Kinesiologie in Adligenswil: ganzheitliche Komplementärtherapie mit Muskeltest für Balance, Stressregulation, Sportkinesiologie und innere Kraft.",
};

export default function KinesiologiePage() {
  return <DesignPage page={designPages.kinesiologie} />;
}
