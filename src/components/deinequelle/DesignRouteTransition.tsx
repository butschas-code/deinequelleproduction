"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export function DesignRouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div key={pathname}>
      {children}
    </div>
  );
}
