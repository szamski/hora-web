import { AnimatedCount } from "@/components/molecules/AnimatedCount";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import { cn } from "@/lib/cn";

type Avatar = { src: string; alt: string };

type Props = {
  id?: string;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  note?: string;
  liveCount: number;
  socialLabel: string;
  avatars: readonly Avatar[];
  className?: string;
  variant?: "default" | "hero";
  animatedCount?: boolean;
  style?: React.CSSProperties;
};

export function WaitlistCard({
  id,
  eyebrow,
  headline,
  subheadline,
  note,
  liveCount,
  socialLabel,
  avatars,
  className,
  variant = "default",
  animatedCount = true,
  style,
}: Props) {
  const isHero = variant === "hero";
  return (
    <div
      id={id}
      style={style}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-white/10 p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_60px_-20px_rgba(0,0,0,0.65)] md:p-6 md:backdrop-blur-2xl",
        isHero ? "bg-white/8" : "bg-white/4",
        id && "scroll-mt-24",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,56,60,0.35) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent"
      />

      {eyebrow ? (
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "relative font-semibold leading-tight tracking-tight text-text",
          eyebrow ? "mt-1" : "",
          isHero
            ? "text-2xl md:text-4xl"
            : "text-xl md:text-2xl",
        )}
      >
        {headline}
      </h2>
      {subheadline ? (
        <p className="relative mt-2 text-sm leading-snug text-muted md:text-base">
          {subheadline}
        </p>
      ) : null}
      {note ? (
        <p className="relative mt-1 text-xs text-muted/80">{note}</p>
      ) : null}

      <div className="relative mt-6">
        <NewsletterForm className="max-w-none" />
      </div>

      <div className="relative mt-6 flex flex-col items-start gap-3 border-t border-white/10 pt-3 sm:flex-row sm:items-center">
        <div className="flex -space-x-2">
          {avatars.map((a) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={a.src}
              src={a.src}
              alt={a.alt}
              width={28}
              height={28}
              loading="lazy"
              className="h-7 w-7 rounded-full border-2 border-bg object-cover"
            />
          ))}
        </div>
        <p className="text-xs leading-snug text-muted md:text-sm">
          <span className="font-semibold text-text">
            {animatedCount ? (
              <AnimatedCount value={liveCount} />
            ) : (
              liveCount.toLocaleString()
            )}
            +
          </span>{" "}
          {socialLabel}
        </p>
      </div>
    </div>
  );
}
