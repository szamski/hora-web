export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

const TEST_EMAIL_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
]);

// True for emails we use for internal QA — `foo+test@gmail.com` style and the
// RFC 2606 reserved domains. Expects an already-normalized address.
export function isTestEmail(normalized: string): boolean {
  const at = normalized.indexOf("@");
  if (at <= 0) return false;
  const local = normalized.slice(0, at);
  const domain = normalized.slice(at + 1);
  if (TEST_EMAIL_DOMAINS.has(domain)) return true;
  return local.includes("+test");
}
