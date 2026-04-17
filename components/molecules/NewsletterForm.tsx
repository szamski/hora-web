"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Icon } from "@/components/atoms/Icon";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { CONVERSION_TAGS, track, trackConversion } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.includes("@")) return;

    setStatus("submitting");
    setMessage("");
    track("waitlist_submit", { method: "email" });

    try {
      const res = await fetch(site.newsletter.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setMessage("You're in! We'll let you know when hora launches.");
      track("waitlist_success", { method: "email" });
      trackConversion(CONVERSION_TAGS.waitlistSignup);
    } catch {
      setStatus("error");
      setMessage(
        `Something went wrong. Try again or email ${site.contactEmail}.`,
      );
      track("waitlist_error", { method: "email" });
    }
  }

  const hero = home.hero.newsletter;

  return (
    <div className={cn("w-full max-w-md", className)}>
      {status !== "success" ? (
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 sm:flex-row sm:items-center"
          noValidate
        >
          <Input
            type="email"
            name="email"
            required
            placeholder={hero.placeholder}
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting"}
          />
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="shrink-0"
          >
            {status === "submitting" ? (
              "Sending…"
            ) : (
              <>
                <Icon name="testflight" size={16} />
                {hero.button}
              </>
            )}
          </Button>
        </form>
      ) : null}

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "text-sm",
          message && "mt-3 min-h-5",
          status === "success" && "text-green-400",
          status === "error" && "text-accent",
        )}
      >
        {message}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4 text-xs text-muted">
        <span>{hero.hint}</span>
        <a
          href={hero.githubHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("github_star_click", { link_url: hero.githubHref })}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-muted backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors hover:text-text"
        >
          <Icon name="github" size={14} />
          <span>{hero.githubLabel}</span>
          <Icon name="arrow-right" size={12} className="opacity-70" />
        </a>
      </div>
    </div>
  );
}
