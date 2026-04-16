import { cn } from "@/lib/cn";

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block bg-linear-to-br from-accent to-accent-glow bg-clip-text pr-[0.12em] pl-[0.04em] text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}
