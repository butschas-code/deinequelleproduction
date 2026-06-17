import { loadLegalText } from "@/lib/legal/loadLegalText";
import { DesignFooter, DesignNav } from "@/components/deinequelle/DesignPage";
import { DeineQuelleDesignRuntime } from "@/components/home/DeineQuelleDesignRuntime";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  intro?: string;
  textFile: string;
};

export function DesignLegalPage({
  eyebrow = "Rechtliches",
  title,
  subtitle,
  intro,
  textFile,
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

        <section className="svc warm-soft-bg">
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

                <article className="reveal d1 mt-6 border border-black/10 bg-white/35 p-6 sm:p-8">
                  {blocks.map((block, index) => {
                    const isHeading =
                      block.length <= 80 &&
                      !/[.!?]/.test(block) &&
                      !/:/.test(block) &&
                      !/^\d/.test(block);

                    return isHeading ? (
                      <h3 key={`${block}-${index}`} className="mb-4 mt-8 text-2xl font-medium text-ink first:mt-0">
                        {block}
                      </h3>
                    ) : (
                      <p
                        key={`${block.slice(0, 40)}-${index}`}
                        className="mb-5 text-[1.05rem] font-[300] leading-[1.9] text-ink-muted last:mb-0"
                      >
                        {block}
                      </p>
                    );
                  })}
                </article>
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
