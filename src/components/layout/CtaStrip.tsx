import Link from "next/link";
import { site } from "@/data/site";
import { SectionReveal } from "@/components/motion/SectionReveal";

const DEFAULT_LEAD =
  "Wenn du bereit bist, wieder näher bei dir anzukommen: ich begleite dich — ohne Druck, in deinem Tempo.";

const DEFAULT_SUB =
  "Online buchen für Kinesiologie — oder persönlich Kontakt aufnehmen.";

type Props = {
  lead?: string;
  sub?: string;
};

export function CtaStrip({ lead = DEFAULT_LEAD, sub = DEFAULT_SUB }: Props) {
  return (
    <section className="relative border-b border-black/[0.06] bg-[color-mix(in_srgb,#f2d5dc_14%,#f4fcf8)] py-16 sm:py-20 md:py-28 lg:py-32 xl:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1e6e48]/[0.06] to-transparent"
        aria-hidden
      />
      <SectionReveal className="page-gutter relative mx-auto w-full max-w-[46.25rem] text-center">
        <p className="text-base font-medium leading-relaxed text-ink sm:text-lg md:text-xl md:leading-relaxed">
          {lead}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted sm:mt-4 sm:text-base md:text-lg">
          {sub}
        </p>
        <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center md:mt-12">
          <Link
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-full bg-brand px-8 text-[15px] font-semibold text-white shadow-[0_8px_30px_-8px_rgba(30,110,72,0.42)] transition duration-200 hover:bg-brand-hover sm:w-auto sm:min-w-[160px]"
          >
            Termin buchen
          </Link>
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-full border border-black/12 bg-white/90 px-8 text-[15px] font-semibold text-ink backdrop-blur-sm transition duration-200 hover:border-brand-extra hover:bg-brand-secondary/35 sm:w-auto sm:min-w-[160px]"
          >
            Anrufen
          </a>
        </div>
      </SectionReveal>
    </section>
  );
}
