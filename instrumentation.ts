import type { Instrumentation } from "next";

export async function register() {
  return;
}

// Forward server-side exceptions (RSC, route handlers, server actions) to
// PostHog error tracking. Without this hook nothing reports server errors —
// only client-side exceptions captured by posthog-js were reaching PostHog.
export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
) => {
  // Dynamically imported so posthog-node stays out of the Edge bundle.
  const { getPostHogClient } = await import("@/lib/posthog-server");
  const posthog = getPostHogClient();

  // Tie the exception to a person when the PostHog cookie is present, so the
  // error shows up against a real user instead of an anonymous server event.
  let distinctId: string | undefined;
  const cookieHeader = request.headers.cookie;
  const cookie = Array.isArray(cookieHeader)
    ? cookieHeader.join("; ")
    : cookieHeader;
  if (cookie) {
    const match = cookie.match(/ph_phc_.*?_posthog=([^;]+)/);
    if (match?.[1]) {
      try {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        if (typeof parsed?.distinct_id === "string") {
          distinctId = parsed.distinct_id;
        }
      } catch {
        /* malformed PostHog cookie — capture the error without a distinct id */
      }
    }
  }

  try {
    await posthog.captureException(
      err instanceof Error ? err : new Error(String(err)),
      distinctId,
    );
  } catch {
    /* never let error reporting throw inside the error handler */
  }
};
