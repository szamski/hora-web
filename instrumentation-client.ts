import * as Sentry from "@sentry/nextjs";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,
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
