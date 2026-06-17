"use client";

import { createPortal } from "react-dom";
import { useLayoutEffect, useState, type ReactNode } from "react";

const ROOT_ID = "deinequelle-design-root";

type DesignChromePortalProps = {
  children?: ReactNode;
  html?: string;
};

export function DesignChromePortal({ children, html }: DesignChromePortalProps) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setRoot(document.getElementById(ROOT_ID));
  }, []);

  const chrome = html ? (
    <div
      className="deinequelle-design-chrome"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <div className="deinequelle-design-chrome">{children}</div>
  );

  if (!root) {
    return null;
  }

  return createPortal(chrome, root);
}

export const designRootId = ROOT_ID;
