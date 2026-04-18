"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function NavLink({
  href,
  children,
  active = false,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={() => {
        track("nav_click", {
          link_text: typeof children === "string" ? children : "",
          link_url: href,
        });
        onClick?.();
      }}
      className={cn(
        "text-sm transition-colors focus-visible:outline-none focus-visible:text-accent",
        active ? "text-text" : "text-muted hover:text-text",
        className,
      )}
    >
      {children}
    </Link>
  );
}
