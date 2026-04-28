import * as Sentry from "@sentry/nextjs";
import { captureFirstTouch, initPostHog } from "@/lib/analytics";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    // Replay disabled — auto-bundles ~50-80KB gz of replay code into the
    // eager client chunk and hurts mobile Lighthouse. Re-enable if we ever
    // start using replays in triage.
    replaysOnErrorSampleRate: 0,
    replaysSessionSampleRate: 0,
    enabled: process.env.NODE_ENV === "production",
    // Privacy-mode browsers (Brave shields, Firefox strict, sandboxed iframes,
    // Safari ITP) return null for window.localStorage / sessionStorage. Sentry's
    // own feedback async loader and a few core utilities access storage without
    // a null guard and surface as unactionable noise. SZA-112.
    ignoreErrors: [
      /Cannot read propert(?:y|ies) of null \(reading '(?:getItem|setItem|removeItem|removeEventListener|addEventListener)'\)/,
      /null is not an object \(evaluating '.*\.(?:getItem|setItem|removeItem|removeEventListener|addEventListener)'\)/,
    ],
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

captureFirstTouch();

if (typeof window !== "undefined") {
  let started = false;
  const startRecording = () => {
    if (started) return;
    started = true;
    cleanup();
    void initPostHog()
      .then((posthog) => {
        try {
          posthog.startSessionRecording();
        } catch {
          /* posthog not ready yet — next visit will start it */
        }
      })
      .catch(() => {
        /* network blocker / privacy extension — analytics already degrade gracefully */
      });
  };
  const events: Array<keyof WindowEventMap> = [
    "pointerdown",
    "keydown",
    "scroll",
    "touchstart",
  ];
  const onFirstInteraction = () => startRecording();
  const cleanup = () => {
    for (const event of events) {
      window.removeEventListener(event, onFirstInteraction);
    }
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if (fallbackId !== null) {
      window.clearTimeout(fallbackId);
    }
  };
  const onVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      startRecording();
    }
  };
  const listenerOptions = { once: true, passive: true } as const;
  for (const event of events) {
    window.addEventListener(event, onFirstInteraction, listenerOptions);
  }
  document.addEventListener("visibilitychange", onVisibilityChange, {
    passive: true,
  });
  const fallbackId = window.setTimeout(startRecording, 15000);
}
