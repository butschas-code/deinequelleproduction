import type { Metadata } from "next";
import { DesignPage } from "@/components/deinequelle/DesignPage";
import { designPages } from "@/data/deinequelleDesignPages";

export const metadata: Metadata = {
  title: "Kinderwunschbegleitung",
  description:
    "Kinesiologische Kinderwunschbegleitung in Adligenswil: Stressregulation, natürlicher und medizinisch begleiteter Kinderwunsch, Trauer, Partnerschaft und behutsame körperorientierte Unterstützung.",
};

export default function KinderwunschPage() {
  return <DesignPage page={designPages.kinderwunsch} />;
}
