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
  return (
    <details
      className={cn(
        "group rounded-xl border border-border bg-surface open:border-[#2a2a2a]",
        className,
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-medium text-text [&::-webkit-details-marker]:hidden">
        {question}
        <svg
          aria-hidden
          className="h-5 w-5 text-muted transition-transform duration-200 group-open:rotate-45"
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
      </summary>
      <div className="px-5 pb-5 pt-0 text-muted leading-relaxed">{answer}</div>
    </details>
  );
}
