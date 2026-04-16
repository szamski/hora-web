import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";

export function Roadmap() {
  const r = home.roadmap;
  return (
    <section
      id="roadmap"
      className="mx-auto max-w-article px-6 py-20 md:py-28"
    >
      <SectionHeading heading={r.heading} className="mb-14 md:mb-16" />

      <ol className="relative space-y-6">
        {/* Vertical connector line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-4 top-4 bottom-4 w-px bg-linear-to-b from-border via-border to-transparent"
        />
        {r.items.map((item) => (
          <li key={item.title} className="relative flex items-start gap-5">
            <span
              className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg font-mono text-sm text-accent"
              style={{
                boxShadow: "0 0 0 4px var(--color-bg)",
              }}
            >
              {item.n}
            </span>
            <div className="flex-1 rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:translate-x-1 hover:border-accent/40">
              <h3 className="mb-1 font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
