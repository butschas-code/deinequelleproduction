import { InfoConversationDialog } from "@/components/contact/InfoConversationDialog";
import { Jost } from "next/font/google";
import { DesignRouteTransition } from "@/components/deinequelle/DesignRouteTransition";
import { DeineQuelleDesignRuntime } from "@/components/home/DeineQuelleDesignRuntime";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import "../deinequelle-design.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export default function DesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      id="deinequelle-design-root"
      className={`deinequelle-design-root ${jost.variable} ${jost.className}`}
    >
      <DesignRouteTransition>{children}</DesignRouteTransition>
      <DeineQuelleDesignRuntime />
      <InfoConversationDialog />
      <ScrollToTopButton variant="design" />
    </div>
  );
}
