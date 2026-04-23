"use client";

import { Icon } from "@/components/atoms/Icon";
import { track } from "@/lib/analytics";

export function DiscordIconLink({
  href,
  label,
  size = 20,
  location,
  className,
}: {
  href: string;
  label: string;
  size?: number;
  location: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={() => track("discord_click", { location })}
      className={className}
    >
      <Icon name="discord" size={size} />
    </a>
  );
}
