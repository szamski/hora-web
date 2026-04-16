import Link from "next/link";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-[960px] flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="text-sm text-muted">
          {site.footer.copyright}. Developed by{" "}
          <a
            href={site.footer.developedBy.href}
            className="text-muted underline transition-colors hover:text-text"
          >
            {site.footer.developedBy.label}
          </a>
        </p>
        <div className="flex items-center gap-5">
          {site.footer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
          {site.footer.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              aria-label={social.label}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-muted transition-colors hover:text-text"
            >
              <Icon name={social.icon as IconName} size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
