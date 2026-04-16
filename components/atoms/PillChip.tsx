import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

const baseClasses =
  "inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-accent transition-all md:text-sm md:tracking-normal md:normal-case";

const interactiveClasses =
  "hover:border-accent/60 hover:bg-accent/10 hover:shadow-[0_0_24px_rgba(255,56,60,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function PillChip({ children, href, className }: Props) {
  if (href) {
    const isExternal = /^https?:/.test(href);
    const Tag = isExternal ? "a" : Link;
    const extraProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Tag
        href={href}
        className={cn(baseClasses, interactiveClasses, className)}
        {...extraProps}
      >
        {children}
      </Tag>
    );
  }
  return <span className={cn(baseClasses, className)}>{children}</span>;
}
