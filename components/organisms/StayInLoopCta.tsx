import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { blog } from "@/content/blog";

export function StayInLoopCta() {
  const cta = blog.footerCta;
  return (
    <section className="mx-auto my-12 max-w-prose rounded-2xl border border-border bg-surface px-6 py-10 text-center md:px-10">
      <h2 className="text-xl font-semibold text-text">{cta.heading}</h2>
      <p className="mt-2 text-sm text-muted">{cta.subtitle}</p>

      <div className="mt-6 flex justify-center">
        <NewsletterForm />
      </div>

      <div className="mt-8 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
        <span className="h-px flex-1 bg-border" aria-hidden />
        <span>{cta.followLabel}</span>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {cta.socials.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-text"
          >
            <Icon name={s.icon as IconName} size={14} />
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
