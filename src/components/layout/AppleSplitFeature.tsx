import type { ReactNode } from "react";
import Image from "next/image";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  /** Bild rechts statt links (Desktop) */
  reverse?: boolean;
  className?: string;
};

/**
 * Bild + Text im Apple-Produktseiten-Stil: viel Weissraum, weiche Ecken, ruhige Typo.
 */
export function AppleSplitFeature({
  eyebrow,
  title,
  description,
  children,
  imageSrc,
  imageAlt,
  reverse = false,
  className = "",
}: Props) {
  return (
    <div
      className={`page-gutter mx-auto grid w-full max-w-[var(--layout-wide)] items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-16 ${className}`}
    >
      <div className={reverse ? "md:order-2" : ""}>
        <div className="overflow-hidden rounded-[1.75rem] bg-paper-2 shadow-[var(--shadow)] ring-1 ring-black/[0.06]">
          <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </div>
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-complimentary">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.035em] text-ink md:text-[2rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-[40rem] text-[1.0625rem] leading-[1.65] text-ink-muted md:text-lg md:leading-relaxed">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-6 max-w-[40rem]">{children}</div> : null}
      </div>
    </div>
  );
}
