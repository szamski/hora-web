import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

type Avatar = {
  src: string;
  alt: string;
};

type Props = {
  id?: string;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  subheadlineMobile?: string;
  note?: string;
  liveCount: number;
  socialLabel: string;
  avatars?: readonly Avatar[];
  className?: string;
  variant?: "default" | "hero";
  style?: React.CSSProperties;
};

export function WaitlistCard({
  id,
  eyebrow,
  headline,
  subheadline,
  subheadlineMobile,
  note,
  liveCount,
  socialLabel,
  avatars,
  className,
  variant = "default",
  style,
}: Props) {
  const isHero = variant === "hero";
  return (
    <div
      id={id}
      style={style}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_24px_60px_-20px_rgba(0,0,0,0.72)] md:p-7 md:backdrop-blur-2xl",
        isHero
          ? "border-white/12 bg-bg/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_28px_80px_-24px_rgba(255,56,60,0.42)]"
          : "border-white/10 bg-white/4",
        id && "scroll-mt-24",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-28 h-56 w-56 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,56,60,0.30) 0%, transparent 68%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent"
      />

      {eyebrow ? (
        <p className="relative inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "relative font-semibold leading-tight tracking-tight text-text",
          eyebrow ? "mt-4" : "",
          isHero ? "text-3xl md:text-4xl" : "text-xl md:text-2xl",
        )}
      >
        {headline}
      </h2>
      {subheadline ? (
        <p className="relative mt-2 max-w-[40rem] text-base leading-relaxed text-muted md:text-lg">
          {subheadlineMobile ? (
            <>
              <span className="sm:hidden">{subheadlineMobile}</span>
              <span className="hidden sm:inline">{subheadline}</span>
            </>
          ) : (
            subheadline
          )}
        </p>
      ) : null}
      {note ? (
        <p className="relative mt-1 text-xs text-muted/80">{note}</p>
      ) : null}

      <div className="relative mt-5 flex items-center gap-3 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_24px_rgba(255,56,60,0.10)]">
        <AvatarTicker avatars={avatars} />
        <p className="min-w-0 text-sm leading-snug text-muted">
          <span className="mr-1.5 text-base font-semibold tabular-nums text-text">
            {liveCount.toLocaleString()}+
          </span>
          {socialLabel}
        </p>
      </div>

      <div className="relative mt-5">
        <NewsletterForm className="max-w-none" />
      </div>
    </div>
  );
}

function AvatarTicker({ avatars }: { avatars?: readonly Avatar[] }) {
  const visibleAvatars = avatars?.slice(0, 5) ?? [];

  if (visibleAvatars.length === 0) {
    return (
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-bg/60">
        <Icon name="users" size={18} />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className="relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/18 bg-bg/70 shadow-[0_0_18px_rgba(255,56,60,0.18)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={visibleAvatars[0].src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover motion-safe:opacity-0"
        loading="lazy"
        decoding="async"
      />
      {visibleAvatars.map((avatar, index) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={avatar.src}
          src={avatar.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-0 [animation:waitlist-avatar-cycle_15s_ease-in-out_infinite_both] motion-reduce:hidden"
          style={{ animationDelay: `${index * 3}s` }}
          loading="lazy"
          decoding="async"
        />
      ))}
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25" />
    </span>
  );
}
