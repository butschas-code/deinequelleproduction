import { loadLegalText } from "@/lib/legal/loadLegalText";

type Props = {
  title: string;
  pdfPath: string;
  textFile: string;
  intro?: string;
  /** Wenn true: kein &lt;h1&gt; (Titel steht im PageHero) */
  suppressTitle?: boolean;
};

export function LegalDocumentPage({ title, pdfPath, textFile, intro, suppressTitle }: Props) {
  const text = loadLegalText(textFile);
  return (
    <main className="page-gutter mx-auto w-full max-w-4xl py-14 sm:py-16 md:py-20">
      {suppressTitle ? null : (
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">{title}</h1>
      )}
      {intro ? <p className={`text-[17px] leading-relaxed text-ink-muted ${suppressTitle ? "" : "mt-4"}`}>{intro}</p> : null}
      <p className="mt-6 text-[14px] text-ink-muted">
        Offizielles PDF:{" "}
        <a className="font-semibold text-brand underline-offset-2 hover:underline" href={pdfPath}>
          PDF öffnen
        </a>
      </p>
      <div className="mt-10 overflow-hidden rounded-2xl border border-black/[0.08] bg-paper-2 shadow-[var(--shadow)]">
        <iframe
          title={`${title} PDF`}
          src={pdfPath}
          className="min-h-[50vh] w-full sm:min-h-[60vh] md:h-[70vh]"
        />
      </div>
      <details className="mt-10 rounded-2xl border border-black/[0.08] bg-paper-2 p-4 sm:mt-12 sm:p-6">
        <summary className="cursor-pointer list-none text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
          <span className="inline-flex min-h-[44px] items-center">Volltext (Plaintext aus PDF)</span>
        </summary>
        <pre className="legal-pre mt-6 max-h-[60vh] overflow-y-auto">{text}</pre>
      </details>
    </main>
  );
}
