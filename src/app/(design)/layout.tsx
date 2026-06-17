import { Cormorant_Garamond, Jost } from "next/font/google";
import { DesignRouteTransition } from "@/components/deinequelle/DesignRouteTransition";
import "../deinequelle-design.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export default function DesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${cormorant.variable} ${jost.variable}`}>
      <DesignRouteTransition>{children}</DesignRouteTransition>
    </div>
  );
}
