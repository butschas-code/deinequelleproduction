import type { ReactNode } from "react";

type Variant = "dawn" | "meadow" | "mist" | "warmWhite" | "appleWhite" | "appleGray";

const variants: Record<
  Variant,
  { className: string; innerGlow?: string }
> = {
  dawn: {
    className:
      "bg-[linear-gradient(165deg,#f2fdf8_0%,#e8f8f0_35%,#fdf5f8_70%,#f8f2f5_100%)]",
  },
  meadow: {
    className:
      "bg-[linear-gradient(160deg,#edf8f2_0%,#e2f5ec_40%,#f6fdfb_100%)]",
  },
  mist: {
    className:
      "bg-[linear-gradient(180deg,#f6fdfb_0%,#eef8f4_50%,#fdf8fa_100%)]",
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
            className="pointer-events-none absolute -right-[20%] top-0 h-[min(400px,50vh)] w-[min(500px,55vw)] rounded-full bg-[radial-gradient(circle,rgba(30,110,72,0.07),transparent_70%)] blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-[15%] bottom-0 h-[min(350px,45vh)] w-[min(450px,50vw)] rounded-full bg-[radial-gradient(circle,rgba(242,213,220,0.18),transparent_68%)] blur-2xl"
            aria-hidden
          />
        </>
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}
