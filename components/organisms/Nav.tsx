import { Button } from "@/components/atoms/Button";
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
          <Button href={site.cta.primary.href} size="sm">
            {site.cta.primary.label}
          </Button>
        </div>
        <MobileNav activePath={activePath} />
      </div>
    </nav>
  );
}
