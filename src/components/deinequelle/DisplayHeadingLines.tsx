import { Fragment, type ElementType } from "react";
import { formatSwissHeading } from "@/lib/swissHeading";

export function DisplayHeadingLines({
  text,
  emphasized = false,
}: {
  text: string;
  emphasized?: boolean;
}) {
  const formatted = formatSwissHeading(text);
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
  className,
  as: Tag = "h2",
}: {
  title: string;
  emphasis?: string;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={className} lang="de-CH">
      <DisplayHeadingLines text={title} />
      {emphasis ? (
        <>
          <br />
          <DisplayHeadingLines text={emphasis} emphasized />
        </>
      ) : null}
    </Tag>
  );
}
