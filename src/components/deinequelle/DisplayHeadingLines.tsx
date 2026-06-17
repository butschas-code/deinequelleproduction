import { Fragment, type ElementType } from "react";
import { formatSwissHeading } from "@/lib/swissHeading";

export function DisplayHeadingLines({
  text,
  emphasized = false,
  useSwissHyphens = true,
}: {
  text: string;
  emphasized?: boolean;
  useSwissHyphens?: boolean;
}) {
  const formatted = useSwissHyphens ? formatSwissHeading(text) : text;
  const lines = formatted.split("\n");
  const nodes = lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));

  return emphasized ? <em>{nodes}</em> : <>{nodes}</>;
}

export function DisplayHeading({
  title,
  emphasis,
  emphasisInline = false,
  className,
  as: Tag = "h2",
}: {
  title: string;
  emphasis?: string;
  emphasisInline?: boolean;
  className?: string;
  as?: ElementType;
}) {
  const flowClass = emphasisInline ? "spread-h2-flow" : undefined;
  const headingClass = [className, flowClass].filter(Boolean).join(" ") || undefined;

  return (
    <Tag className={headingClass} lang="de-CH">
      <DisplayHeadingLines text={title} useSwissHyphens={!emphasisInline} />
      {emphasis ? (
        emphasisInline ? (
          <>
            {"\u00A0"}
            <DisplayHeadingLines text={emphasis} emphasized useSwissHyphens={false} />
          </>
        ) : (
          <>
            <br />
            <DisplayHeadingLines text={emphasis} emphasized />
          </>
        )
      ) : null}
    </Tag>
  );
}
