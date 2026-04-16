import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

type Status = "Shipping soon" | "Up next" | "Planned" | "On the horizon";

const statusStyles: Record<
  Status,
  { pill: string; dot: string; connector: string }
> = {
  "Shipping soon": {
    pill: "border-accent/50 bg-accent/10 text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_28px_rgba(255,56,60,0.35)]",
    dot: "bg-accent shadow-[0_0_14px_rgba(255,56,60,1)] ring-4 ring-accent/20",
    connector: "from-accent/70",
  },
  "Up next": {
    pill: "border-accent/25 bg-accent/5 text-accent/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
    dot: "bg-accent/70 shadow-[0_0_10px_rgba(255,56,60,0.55)] ring-4 ring-accent/10",
    connector: "from-accent/40",
  },
  Planned: {
    pill: "border-white/12 bg-white/5 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
    dot: "bg-white/30 ring-4 ring-white/5",
    connector: "from-white/20",
  },
  "On the horizon": {
    pill: "border-white/10 bg-white/3 text-muted/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
    dot: "bg-white/15 ring-4 ring-white/3",
    connector: "from-white/10",
  },
};

export function Roadmap() {
  const r = home.roadmap;
  const items = r.items;

  return (
    <section id="roadmap" className="relative overflow-hidden py-24 md:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 80% 0%, rgba(255,56,60,0.10), transparent 65%)," +
            "radial-gradient(ellipse 800px 500px at 20% 100%, rgba(255,115,110,0.07), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            {r.eyebrow}
          </span>
          <div className="mt-5">
            <SectionHeading heading={r.heading} />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted md:text-lg">
            {r.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <ol className="mt-16 space-y-6 md:mt-20 md:space-y-8">
          {items.map((item, i) => {
            const styles = statusStyles[item.status];
            const isLast = i === items.length - 1;
            return (
              <li key={item.title} className="relative flex gap-5 md:gap-7">
                {/* Rail: dot + connector */}
                <div className="relative flex shrink-0 flex-col items-center">
                  <span
                    className={cn(
                      "relative z-10 h-4 w-4 rounded-full",
                      styles.dot,
                    )}
                  />
                  {!isLast ? (
                    <span
                      aria-hidden
                      className={cn(
                        "mt-2 w-px flex-1 bg-linear-to-b to-transparent",
                        styles.connector,
                      )}
                    />
                  ) : null}
                </div>

                {/* Card */}
                <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_48px_-32px_rgba(0,0,0,0.6)] md:p-6">
                  {item.status === "Shipping soon" ? (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,56,60,0.4) 0%, transparent 70%)",
                      }}
                    />
                  ) : null}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent"
                  />

                  {/* Giant numeral */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-4 font-brand text-5xl leading-none tracking-tight text-transparent md:text-[64px]"
                    style={{
                      WebkitTextStroke: "1px rgba(255,56,60,0.25)",
                    }}
                  >
                    {String(item.n).padStart(2, "0")}
                  </span>

                  <span
                    className={cn(
                      "relative inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl",
                      styles.pill,
                    )}
                  >
                    {item.status === "Shipping soon" ? (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                    ) : null}
                    {item.status}
                  </span>

                  <h3 className="relative mt-4 text-xl font-semibold tracking-tight text-text md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="relative mt-2 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
