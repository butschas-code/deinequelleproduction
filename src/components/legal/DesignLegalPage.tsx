import { loadLegalText } from "@/lib/legal/loadLegalText";
import { DesignFooter, DesignNav } from "@/components/deinequelle/DesignPage";
import { DeineQuelleDesignRuntime } from "@/components/home/DeineQuelleDesignRuntime";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  intro?: string;
  textFile: string;
  /** "editorial" = open prose like service sections; "boxed" = framed legal text block */
  variant?: "editorial" | "boxed";
};

function LegalBlocks({
  blocks,
  variant,
}: {
  blocks: string[];
  variant: "editorial" | "boxed";
}) {
  return (
    <>
      {blocks.map((block, index) => {
        const isHeading =
          block.length <= 80 &&
          !/[.!?]/.test(block) &&
          !/:/.test(block) &&
          !/^\d/.test(block);

        if (isHeading) {
          return (
            <h3
              key={`${block}-${index}`}
              className={
                variant === "editorial"
                  ? "dq-legal-heading reveal"
                  : "mb-4 mt-8 text-2xl font-medium text-ink first:mt-0"
              }
            >
              {block}
            </h3>
          );
        }

        return (
          <p
            key={`${block.slice(0, 40)}-${index}`}
            className={
              variant === "editorial"
                ? "svc-body reveal"
                : "mb-5 text-[1.05rem] font-[300] leading-[1.9] text-ink-muted last:mb-0"
            }
          >
            {block}
          </p>
        );
      })}
    </>
  );
}

export function DesignLegalPage({
  eyebrow = "Rechtliches",
  title,
  subtitle,
  intro,
  textFile,
  variant = "boxed",
}: Props) {
  const rawText = loadLegalText(textFile);
  const text = rawText
    .replace(/\f/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+$/g, ""))
    .join("\n");

  const blocks = text
    .split(/\n{2,}/)
    .map((block) => block.replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim())
    .filter(Boolean);

  return (
    <>
      <main className="deinequelle-design-page">
        <DesignNav />

        <section
          className={`svc warm-soft-bg${variant === "editorial" ? " dq-legal-section" : ""}`}
        >
          <div className="wrap">
            <header className="svc-section-head reveal">
              <p className="dq-kicker">{eyebrow}</p>
              <h1 className="spread-h2">
                {title}
                {subtitle ? (
                  <>
                    <br />
                    <em>{subtitle}</em>
                  </>
                ) : null}
              </h1>
            </header>

            <div className="svc-editorial svc-editorial-single">
              <div className="svc-prose-block">
                {intro ? <p className="svc-lead reveal">{intro}</p> : null}

                {variant === "editorial" ? (
                  <article className="dq-legal-prose reveal d1">
                    <LegalBlocks blocks={blocks} variant={variant} />
                  </article>
                ) : (
                  <article className="reveal d1 mt-6 border border-black/10 bg-white/35 p-6 sm:p-8">
                    <LegalBlocks blocks={blocks} variant={variant} />
                  </article>
                )}
              </div>
            </div>
          </div>
        </section>

        <DesignFooter />
      </main>

      <DeineQuelleDesignRuntime />
    </>
  );
}
