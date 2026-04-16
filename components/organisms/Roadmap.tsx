import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";

export function Roadmap() {
  const r = home.roadmap;
  return (
    <section
      id="roadmap"
      className="mx-auto max-w-article px-6 py-16 md:py-20"
    >
      <SectionHeading heading={r.heading} className="mb-10" />

      <div className="space-y-3">
        {r.items.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-xl border border-border bg-surface p-5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-bg font-mono text-sm text-muted">
              {item.n}
            </span>
            <div>
              <h3 className="mb-1 font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
