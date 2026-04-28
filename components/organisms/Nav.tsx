import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Logo } from "@/components/atoms/Logo";
import { site } from "@/content/site";
import { analyticsAttrs } from "@/lib/analyticsAttrs";
import { MobileNav } from "./MobileNav";

export function Nav({ activePath }: { activePath?: string }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[960px] items-center justify-between px-6">
        <Logo />
        <div className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...analyticsAttrs("nav_click", {
                link_text: item.label,
                link_url: item.href,
              })}
              className={
                activePath === item.href
                  ? "text-sm text-text transition-colors focus-visible:outline-none focus-visible:text-accent"
                  : "text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:text-accent"
              }
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.community.discord.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={site.community.discord.label}
            {...analyticsAttrs("discord_click", { location: "nav_desktop" })}
            className="text-muted transition-colors hover:text-[#5865F2]"
          >
            <Icon name="discord" size={20} />
          </a>
          <Button href={site.cta.primary.href} size="sm">
            {site.cta.primary.label}
          </Button>
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <a
            href={site.community.discord.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={site.community.discord.label}
            {...analyticsAttrs("discord_click", { location: "nav_mobile" })}
            className="p-2 text-text transition-colors hover:text-[#5865F2]"
          >
            <Icon name="discord" size={22} />
          </a>
          <MobileNav activePath={activePath} />
        </div>
      </div>
    </nav>
  );
}
