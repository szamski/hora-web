import { Button } from "@/components/atoms/Button";
import { DiscordIconLink } from "@/components/atoms/DiscordIconLink";
import { Logo } from "@/components/atoms/Logo";
import { NavLink } from "@/components/molecules/NavLink";
import { site } from "@/content/site";
import { MobileNav } from "./MobileNav";

export function Nav({ activePath }: { activePath?: string }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[960px] items-center justify-between px-6">
        <Logo />
        <div className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              active={activePath === item.href}
            >
              {item.label}
            </NavLink>
          ))}
          <DiscordIconLink
            href={site.community.discord.href}
            label={site.community.discord.label}
            size={20}
            location="nav_desktop"
            className="text-muted transition-colors hover:text-[#5865F2]"
          />
          <Button href={site.cta.primary.href} size="sm">
            {site.cta.primary.label}
          </Button>
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <DiscordIconLink
            href={site.community.discord.href}
            label={site.community.discord.label}
            size={22}
            location="nav_mobile"
            className="p-2 text-text transition-colors hover:text-[#5865F2]"
          />
          <MobileNav activePath={activePath} />
        </div>
      </div>
    </nav>
  );
}
