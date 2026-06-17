"use client";

import { useId, useState } from "react";
import type { DesignPageData } from "@/data/deinequelleDesignPages";

type Guide = NonNullable<DesignPageData["guideSection"]>;

export function GuideSectionAccordion({
  guide,
  surfaceClass = "",
}: {
  guide: Guide;
  surfaceClass?: string;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="begleitung" className={surfaceClass.trim() || undefined}>
      <div className="wrap">
        <div className="begl-head reveal">
          <h2 className="begl-h2">
            {guide.title}
            {guide.titleEmphasis ? (
              <>
                <br />
                {guide.titleEmphasis}
              </>
            ) : null}
          </h2>
          <p className="begl-intro">{guide.intro}</p>
        </div>

        <div className="begl-accordion" aria-label="Anwendungsbereiche">
          {guide.categories.map((row, index) => {
            const isOpen = openIndex === index;
            const tabId = `${baseId}-tab-${index}`;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <article
                key={row.number}
                className={`begl-accordion-item${isOpen ? " is-open" : ""}`}
              >
                <h3 className="begl-accordion-heading">
                  <button
                    type="button"
                    id={tabId}
                    className="begl-accordion-trigger reveal"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(index)}
                  >
                    <span className="begl-cat">{row.category}</span>
                    <span className="begl-accordion-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  className="begl-accordion-panel"
                  role="region"
                  aria-labelledby={tabId}
                  hidden={!isOpen}
                >
                  <div className="begl-accordion-panel-inner">
                    <p className="begl-lead">{row.lead}</p>
                    <ul className="begl-list begl-list-columns">
                      {row.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {row.goal ? <p className="begl-goal">{row.goal}</p> : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {guide.footnote ? (
          <p className="begl-footnote reveal">{guide.footnote}</p>
        ) : null}
      </div>
    </section>
  );
}
