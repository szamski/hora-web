import { Icon } from "@/components/atoms/Icon";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

export function Journey() {
  const j = home.journey;

  return (
    <section
      id="roadmap"
      className="mx-auto max-w-[960px] px-6 py-16 md:py-24"
    >
      <SectionHeading heading={j.heading} subtitle={j.subtitle} className="mb-12" />

      <div className="space-y-12">
        {/* Shipped */}
        <div>
          <PhaseLabel icon="check" tone="done" label={j.shipped.label} />
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {j.shipped.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text"
              >
                <Icon name="check" size={14} className="text-green-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">{j.shipped.footnote}</p>
        </div>

        {/* Now */}
        <div>
          <PhaseLabel label={j.now.label} pulseDot />
          <div className="space-y-2">
            {j.now.items.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text"
              >
                <span
                  className={cn(
                    "inline-flex rounded-md px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide",
                    item.tag === "feat"
                      ? "bg-accent/10 text-accent"
                      : "bg-yellow-500/10 text-yellow-400",
                  )}
                >
                  {item.tag}
                </span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next */}
        <div>
          <PhaseLabel icon="arrow-right" label={j.next.label} />
          <div className="space-y-3">
            {j.next.items.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-border bg-surface p-5"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border bg-bg font-mono text-sm text-muted">
                  {item.n}
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-text">{item.title}</h4>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseLabel({
  icon,
  label,
  tone,
  pulseDot = false,
}: {
  icon?: "check" | "arrow-right";
  label: string;
  tone?: "done";
  pulseDot?: boolean;
}) {
  return (
    <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
      {pulseDot ? (
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
      ) : icon ? (
        <Icon
          name={icon}
          size={14}
          className={tone === "done" ? "text-green-400" : "text-accent"}
        />
      ) : null}
      <span>{label}</span>
      <span className="ml-2 h-px flex-1 bg-border" aria-hidden />
    </div>
  );
}
