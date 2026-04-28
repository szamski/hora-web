"use client";

import { useEffect } from "react";
import { track, type EventProps } from "@/lib/analytics";

function parseProps(raw?: string): EventProps | undefined {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as EventProps;
  } catch {
    return undefined;
  }
}

export function AnalyticsDelegates() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const el = target?.closest?.<HTMLElement>("[data-analytics-event]");
      const eventName = el?.dataset.analyticsEvent;
      if (!el || !eventName) return;
      track(eventName, parseProps(el.dataset.analyticsProps));
    }

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
