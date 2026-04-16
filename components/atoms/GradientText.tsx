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
        "bg-gradient-to-br from-accent to-accent-glow bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}
