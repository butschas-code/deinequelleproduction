import { Cormorant_Garamond, Jost } from "next/font/google";
import { DesignRouteTransition } from "@/components/deinequelle/DesignRouteTransition";
import { DeineQuelleDesignRuntime } from "@/components/home/DeineQuelleDesignRuntime";
import "../deinequelle-design.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

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
      className={`deinequelle-design-root ${cormorant.variable} ${jost.variable} ${jost.className}`}
    >
      <DesignRouteTransition>{children}</DesignRouteTransition>
      <DeineQuelleDesignRuntime />
    </div>
  );
}
