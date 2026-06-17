import type { Metadata } from "next";
import { DesignPage } from "@/components/deinequelle/DesignPage";
import { designPages } from "@/data/deinequelleDesignPages";
export const metadata: Metadata = {
  title: "Yoga",
  description:
    "Hatha Yoga und Yoga Nidra in Adligenswil: Satyananda-inspirierte Praxis im Studio und online für Ruhe, Kraft und Balance.",
};

export default function YogaPage() {
  return <DesignPage page={designPages.yoga} />;
}
