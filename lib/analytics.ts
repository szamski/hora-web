declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type EventProps = Record<string, string | number | boolean>;

export function track(event: string, props?: EventProps) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
  window.gtag?.("event", event, props);
  import("posthog-js").then(({ default: posthog }) => {
    posthog.capture(event, props);
  });
}

export const CONVERSION_TAGS = {
  waitlistSignup: "AW-18070613857/NVQcCNP48ZscEOHe3qhD",
} as const;

export function trackConversion(sendTo: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "conversion", { send_to: sendTo });
}
