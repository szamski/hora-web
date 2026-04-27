"use client";

import { useEffect, useState, type ReactNode } from "react";

export function DeferredMount({
  children,
  timeout = 2000,
}: {
  children: ReactNode;
  timeout?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), { timeout });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(t);
  }, [timeout]);

  return ready ? <>{children}</> : null;
}
