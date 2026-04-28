import type { EventProps } from "@/lib/analytics";

export function analyticsAttrs(event: string, props?: EventProps) {
  return {
    "data-analytics-event": event,
    ...(props ? { "data-analytics-props": JSON.stringify(props) } : {}),
  };
}
