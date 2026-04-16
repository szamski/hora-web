type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_ENTRIES = 10_000;
const WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_LIMIT = 3;

export function checkRateLimit(
  key: string,
  limit: number = DEFAULT_LIMIT,
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (buckets.size > MAX_ENTRIES) {
      const firstKey = buckets.keys().next().value;
      if (firstKey) buckets.delete(firstKey);
    }
    return true;
  }

  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}
