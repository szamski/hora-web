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

let posthogPromise: Promise<typeof import("posthog-js").default> | null = null;

function loadPostHog() {
  if (!posthogPromise) {
    posthogPromise = import("posthog-js").then((mod) => mod.default);
  }
  return posthogPromise;
}

export function track(event: string, props?: EventProps) {
  if (typeof window === "undefined") return;
  // Guard with typeof, not optional chain: privacy extensions (Brave shields,
  // uBlock, AdGuard) stub window.plausible / window.gtag as a non-callable
  // object, which `?.()` does not protect against. SZA-236.
  if (typeof window.plausible === "function") {
    window.plausible(event, props ? { props } : undefined);
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", event, props);
  }
  loadPostHog().then((posthog) => {
    posthog.capture(event, props);
  });
}

export const CONVERSION_TAGS = {
  waitlistSignup: "AW-18070613857/NVQcCNP48ZscEOHe3qhD",
} as const;

export function trackConversion(sendTo: string) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: sendTo });
  }
}

export function identify(distinctId: string, props?: EventProps) {
  if (typeof window === "undefined" || !distinctId) return;
  loadPostHog().then((posthog) => {
    posthog.identify(distinctId, props);
  });
}

// First-touch attribution — persisted across sessions in localStorage so that a
// signup three days / two visits later still knows where the user originally
// came from. PostHog's built-in `$initial_*` person props are similar but scoped
// per-PostHog-session; this backup attaches the data directly to conversion
// events so funnels/alerts don't need a person-property lookup.

const FIRST_TOUCH_KEY = "hora_first_touch_v1";

type FirstTouch = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  landing_page?: string;
  at: string;
};

function readFirstTouch(): FirstTouch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage?.getItem(FIRST_TOUCH_KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
}

export function captureFirstTouch() {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage?.getItem(FIRST_TOUCH_KEY)) return;
    const url = new URL(window.location.href);
    const param = (k: string) => url.searchParams.get(k) || undefined;
    const data: FirstTouch = {
      source: param("utm_source"),
      medium: param("utm_medium"),
      campaign: param("utm_campaign"),
      term: param("utm_term"),
      content: param("utm_content"),
      referrer: document.referrer || undefined,
      landing_page: url.pathname + url.search,
      at: new Date().toISOString(),
    };
    window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(data));
  } catch {
    /* localStorage blocked (Safari ITP / private mode) — safe to skip */
  }
}

export function getAttribution(): EventProps {
  const props: EventProps = {};
  const ft = readFirstTouch();
  if (!ft) return props;
  if (ft.source) props.first_touch_utm_source = ft.source;
  if (ft.medium) props.first_touch_utm_medium = ft.medium;
  if (ft.campaign) props.first_touch_utm_campaign = ft.campaign;
  if (ft.term) props.first_touch_utm_term = ft.term;
  if (ft.content) props.first_touch_utm_content = ft.content;
  if (ft.referrer) props.first_touch_referrer = ft.referrer;
  if (ft.landing_page) props.first_touch_landing_page = ft.landing_page;
  props.first_touch_at = ft.at;
  return props;
}

export async function initPostHog() {
  const posthog = await loadPostHog();
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    api_host: "https://i.horacal.app",
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    capture_exceptions: false,
    debug: process.env.NODE_ENV === "development",
    // Defer recorder.js (~95KB, ~200ms CPU) out of the critical path. We start
    // the session manually below once the browser is idle.
    disable_session_recording: true,
    // We don't use surveys — drops surveys.js (~32KB transfer, 25KB unused).
    disable_surveys: true,
    // Dead-click autocapture adds ~33KB and noisy events. Off until we need it.
    capture_dead_clicks: false,
  });
  return posthog;
}
