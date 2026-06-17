import { loadLegalText } from "@/lib/legal/loadLegalText";
import { DesignFooter, DesignNav } from "@/components/deinequelle/DesignPage";
import { DisplayHeading } from "@/components/deinequelle/DisplayHeadingLines";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  intro?: string;
  textFile: string;
  /** "editorial" = open prose like service sections; "boxed" = framed legal text block */
  variant?: "editorial" | "boxed";
};

function LegalBlocks({ blocks }: { blocks: string[] }) {
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
              className="dq-legal-heading reveal"
            >
              {block}
            </h3>
          );
        }

        return (
          <p
            key={`${block.slice(0, 40)}-${index}`}
            className="svc-body reveal"
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
              <DisplayHeading
                as="h1"
                className="spread-h2"
                title={title}
                emphasis={subtitle}
              />
            </header>

            <div className="svc-editorial svc-editorial-single">
              <div className="svc-prose-block">
                {intro ? <p className="svc-lead reveal">{intro}</p> : null}

                {variant === "editorial" ? (
                  <article className="dq-legal-prose reveal d1">
                    <LegalBlocks blocks={blocks} />
                  </article>
                ) : (
                  <article className="dq-legal-prose dq-legal-prose-boxed reveal d1">
                    <LegalBlocks blocks={blocks} />
                  </article>
                )}
              </div>
            </div>
          </div>
        </section>

        <DesignFooter />
      </main>
    </>
  );
}
