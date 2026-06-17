import type { Metadata } from "next";
import { DesignPage } from "@/components/deinequelle/DesignPage";
import { designPages } from "@/data/deinequelleDesignPages";
export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Claudia Dimmler: Von der Medizin über Yoga und Yoga Nidra zur Kinesiologie. Ganzheitliche Begleitung in Adligenswil.",
};

export default function UeberMichPage() {
  return <DesignPage page={designPages.ueberMich} />;
}
