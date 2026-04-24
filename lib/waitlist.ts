import { Resend } from "resend";

const TTL_MS = 10 * 60 * 1000;
const FAILURE_COOLDOWN_MS = 30 * 1000;
const RETRY_DELAY_MS = 500;

let cache: { value: number; expires: number } | null = null;
let lastKnown: number | null = null;
let lastFailureAt = 0;
let inflight: Promise<number | null> | null = null;

async function fetchOnce(
  resend: Resend,
  audienceId: string,
): Promise<number | null> {
  let count = 0;
  let after: string | undefined;

  for (let page = 0; page < 50; page++) {
    const res = await resend.contacts.list({
      audienceId,
      limit: 100,
      ...(after ? { after } : {}),
    });
    if (res.error || !res.data) {
      console.error("[waitlist] Resend contacts.list failed:", res.error);
      return null;
    }
    const contacts = res.data.data;
    count += contacts.filter((c) => !c.unsubscribed).length;
    if (!res.data.has_more || contacts.length === 0) break;
    after = contacts[contacts.length - 1]!.id;
  }

  return count;
}

async function fetchFromResend(): Promise<number | null> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.warn("[waitlist] Missing RESEND_API_KEY or RESEND_AUDIENCE_ID");
    return null;
  }

  const resend = new Resend(apiKey);

  const first = await fetchOnce(resend, audienceId);
  if (first !== null) return first;

  await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
  return fetchOnce(resend, audienceId);
}

export async function getWaitlistCount(fallback: number): Promise<number> {
  const now = Date.now();
  if (cache && cache.expires > now) return cache.value;
  if (now - lastFailureAt < FAILURE_COOLDOWN_MS) {
    return lastKnown ?? fallback;
  }

  if (!inflight) {
    inflight = (async () => {
      try {
        const result = await fetchFromResend();
        if (result === null) {
          lastFailureAt = Date.now();
        } else {
          cache = { value: result, expires: Date.now() + TTL_MS };
          lastKnown = result;
        }
        return result;
      } catch (err) {
        console.error("[waitlist] Unexpected error:", err);
        lastFailureAt = Date.now();
        return null;
      } finally {
        inflight = null;
      }
    })();
  }

  const result = await inflight;
  return result ?? lastKnown ?? fallback;
}
