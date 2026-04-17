"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function record(choice: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
    if (typeof window.gtag === "function") {
      const value = choice === "accepted" ? "granted" : "denied";
      window.gtag("consent", "update", {
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
        analytics_storage: value,
      });
    }
  }

  if (!visible) return null;
  const c = site.cookieBanner;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[9999] border-t border-border bg-surface px-6 py-4 transition-transform",
      )}
    >
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-4 md:flex-row md:justify-between">
        <p className="text-sm leading-relaxed text-muted">
          {c.message}{" "}
          <Link href={c.privacyLink.href} className="text-text underline">
            {c.privacyLink.label}
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => record("declined")}
            className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {c.decline}
          </button>
          <button
            type="button"
            onClick={() => record("accepted")}
            className="rounded-lg bg-accent px-4 py-2 text-sm text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
