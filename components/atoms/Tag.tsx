import { cn } from "@/lib/cn";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-0.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
