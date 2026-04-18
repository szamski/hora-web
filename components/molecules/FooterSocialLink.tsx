"use client";

import { Icon, type IconName } from "@/components/atoms/Icon";
import { track } from "@/lib/analytics";

function platformFromHref(href: string) {
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("github.com")) return "github";
  if (href.includes("x.com") || href.includes("twitter.com")) return "x_twitter";
  if (href.includes("discord")) return "discord";
  return "other";
}

export function FooterSocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: IconName;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() =>
        track("social_click", {
          platform: platformFromHref(href),
          action: "footer_click",
        })
      }
      className="text-muted transition-colors hover:text-text"
    >
      <Icon name={icon} size={18} />
    </a>
  );
}
