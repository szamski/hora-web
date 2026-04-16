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
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-muted backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
