import Image from "next/image";
import { GradientText } from "@/components/atoms/GradientText";
import { Icon } from "@/components/atoms/Icon";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

function ComparisonCard({
  name,
  tag,
  active,
}: {
  name: string;
  tag: string;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-3 text-center transition-transform backdrop-blur-xl md:p-7",
        active
          ? "border-accent/40 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_60px_-24px_rgba(255,56,60,0.55)] md:-translate-y-2"
          : "border-white/8 bg-white/3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
      )}
    >
      {active ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,56,60,0.55) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent"
          />
        </>
      ) : null}

      <p
        className={cn(
          "relative whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.08em] md:text-[10px] md:tracking-[0.22em]",
          active ? "text-accent" : "text-muted",
        )}
      >
        {tag}
      </p>
      <p
        className={cn(
          "relative mt-2 text-sm font-semibold tracking-tight md:mt-3 md:text-2xl",
          active ? "text-text" : "text-muted",
        )}
      >
        {name}
      </p>
    </div>
  );
}

export function WhyHora() {
  const w = home.whyHora;
  const author = w.personalNoteAuthor;

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 20% 0%, rgba(255,56,60,0.08), transparent 65%)," +
            "radial-gradient(ellipse 800px 500px at 80% 100%, rgba(255,115,110,0.06), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 50%, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            {w.eyebrow}
          </span>
          <div className="mt-5">
            <SectionHeading heading={w.heading} />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted md:text-lg">
            {w.descriptor}{" "}
            {w.climax.prefix}{" "}
            <GradientText>{w.climax.highlight}</GradientText>
            {w.climax.suffix}
          </p>
        </div>

        {/* 3-card comparison */}
        <div className="mt-14 grid grid-cols-3 gap-2 md:mt-20 md:gap-6">
          {w.comparison.map((item) => (
            <ComparisonCard
              key={item.name}
              name={item.name}
              tag={item.tag}
              active={item.tone === "accent"}
            />
          ))}
        </div>

        {/* Founder quote */}
        <figure className="relative mx-auto mt-16 max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/4 px-8 py-8 text-left backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_32px_60px_-30px_rgba(0,0,0,0.6)] md:mt-24 md:px-10 md:py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-16 h-52 w-52 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,56,60,0.45) 0%, transparent 70%)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-4 left-6 bg-bg px-2 font-brand text-6xl leading-none text-accent"
            style={{ textShadow: "0 0 24px rgba(255,56,60,0.55)" }}
          >
            &ldquo;
          </span>

          <blockquote className="relative space-y-1.5 font-serif text-sm italic leading-relaxed text-text/90 md:text-base">
            {w.personalNote.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </blockquote>

            <figcaption className="relative mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
            <Image
              src="/assets/maciej_szamowski.jpg"
              alt="Maciej Szamowski"
              width={36}
              height={36}
              className="rounded-full border border-white/10"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-text">{author.name}</p>
              <p className="text-xs text-muted">{author.role}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <a
                href={author.twitterHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={author.twitterLabel}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-muted backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors hover:text-text"
              >
                <Icon name="x" size={14} />
              </a>
              <a
                href={author.blueskyHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={author.blueskyLabel}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-muted backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors hover:text-text"
              >
                <Icon name="bluesky" size={14} />
              </a>
            </div>
            </figcaption>
        </figure>
      </div>
    </section>
  );
}
