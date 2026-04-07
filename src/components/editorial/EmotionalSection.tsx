import type { ReactNode } from "react";

type Variant = "dawn" | "meadow" | "mist" | "warmWhite" | "appleWhite" | "appleGray";

const variants: Record<
  Variant,
  { className: string; innerGlow?: string }
> = {
  dawn: {
    className:
      "bg-[linear-gradient(165deg,#fdfbf7_0%,#f5f0e8_35%,#eef4ef_70%,#f8f6f1_100%)]",
  },
  meadow: {
    className:
      "bg-[linear-gradient(160deg,#f0f4f0_0%,#e8f0ea_40%,#f5f5f7_100%)]",
  },
  mist: {
    className:
      "bg-[linear-gradient(180deg,#f5f5f7_0%,#eef2f0_50%,#faf8f5_100%)]",
  },
  warmWhite: {
    className: "bg-[linear-gradient(180deg,#ffffff_0%,#faf8f4_100%)]",
  },
  /** Flächig, wie apple.com Produktseiten — ohne Verlaufs-Busy */
  appleWhite: {
    className: "bg-white",
  },
  appleGray: {
    className: "bg-[#f5f5f7]",
  },
};

type Props = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Zusätzlicher radialer Schimmer */
  radialAccent?: boolean;
};

/**
 * Sektion mit warmem Verlauf + optional weichem Lichtfleck.
 */
export function EmotionalSection({
  variant = "dawn",
  children,
  className = "",
  radialAccent = true,
}: Props) {
  const v = variants[variant];
  const showRadial =
    radialAccent && variant !== "appleWhite" && variant !== "appleGray";
  return (
    <section className={`relative overflow-hidden ${v.className} ${className}`}>
      {showRadial ? (
        <>
          <div
            className="pointer-events-none absolute -right-[20%] top-0 h-[min(400px,50vh)] w-[min(500px,55vw)] rounded-full bg-[radial-gradient(circle,rgba(78,59,68,0.08),transparent_70%)] blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-[15%] bottom-0 h-[min(350px,45vh)] w-[min(450px,50vw)] rounded-full bg-[radial-gradient(circle,rgba(145,138,143,0.1),transparent_68%)] blur-2xl"
            aria-hidden
          />
        </>
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}
