"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export function FaqItem({
  question,
  answer,
  className,
}: {
  question: string;
  answer: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300",
        open
          ? "border-accent/35 bg-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_24px_48px_-24px_rgba(255,56,60,0.3)]"
          : "border-white/10 bg-white/4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_16px_40px_-28px_rgba(0,0,0,0.55)] hover:border-white/20 hover:bg-white/6",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent"
      />
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-text md:px-6 md:py-5 md:text-lg"
      >
        <span className="flex-1 text-balance">{question}</span>
        <span
          aria-hidden
          className={cn(
            "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300",
            open
              ? "rotate-45 border-accent/60 bg-accent/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_20px_rgba(255,56,60,0.35)]"
              : "border-white/10 bg-white/5",
          )}
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div
        id={id}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "border-t border-white/8 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted transition-opacity duration-300 md:px-6 md:pb-6 md:text-base",
              open ? "opacity-100" : "opacity-0",
            )}
          >
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
