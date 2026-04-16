import { cn } from "@/lib/cn";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-invert max-w-none",
        "prose-headings:font-brand prose-headings:font-normal prose-headings:tracking-tight",
        "prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-lg",
        "prose-p:text-muted prose-p:leading-relaxed",
        "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-text",
        "prose-code:text-text prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.875em] prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-lg",
        "prose-blockquote:border-accent prose-blockquote:text-muted",
        "prose-hr:border-border",
        "prose-img:rounded-xl prose-img:border prose-img:border-border",
        "prose-li:text-muted prose-li:marker:text-muted",
        "prose-table:text-sm prose-th:text-text prose-td:text-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}
