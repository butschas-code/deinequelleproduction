import type { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from "react";
import { site } from "@/data/site";

type ContactActionProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

export function ContactAction({ href, children, target, rel, ...props }: ContactActionProps) {
  if (href === site.infoConversationHref) {
    return (
      <button type="button" {...props} data-info-conversation aria-haspopup="dialog">
        {children}
      </button>
    );
  }
  return <a href={href} target={target} rel={rel} {...props}>{children}</a>;
}
