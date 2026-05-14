import { Icon } from "@/components/atoms/Icon";
import { GradientText } from "@/components/atoms/GradientText";
import { home } from "@/content/home";
import { getWaitlistCount } from "@/lib/waitlist";

export async function UserProof() {
  const proof = home.userProof;
  const waitlistProof = home.hero.newsletter.socialProof;
  const liveCount = await getWaitlistCount(waitlistProof.count);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 720px 420px at 20% 10%, rgba(255,56,60,0.12), transparent 65%)," +
            "radial-gradient(ellipse 780px 460px at 85% 90%, rgba(255,115,110,0.08), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 50%, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            {proof.eyebrow}
          </span>
          <h2 className="mt-5 font-brand text-4xl font-normal leading-tight tracking-tight text-text md:text-5xl">
            {proof.heading.prefix}{" "}
            <GradientText>{proof.heading.suffixGradient}</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted md:text-lg">
            {proof.description}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-[0.85fr_1.15fr] md:items-stretch md:gap-6">
          <div className="relative flex min-h-[18rem] flex-col overflow-hidden rounded-2xl border border-accent/25 bg-white/5 p-7 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_32px_60px_-30px_rgba(255,56,60,0.45)] md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,56,60,0.45) 0%, transparent 70%)",
              }}
            />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
              <Icon name="users" size={24} />
            </div>
            <div className="relative mt-auto">
            <p className="font-brand text-6xl font-normal leading-none tracking-tight text-accent md:text-7xl">
                {liveCount.toLocaleString()}+
              </p>
              <p className="mt-4 max-w-sm text-balance text-lg font-semibold leading-snug text-text md:text-xl">
                {waitlistProof.label}
              </p>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 px-7 py-8 text-left backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_32px_60px_-30px_rgba(0,0,0,0.6)] md:px-9 md:py-8">
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
              className="pointer-events-none absolute left-7 top-5 font-brand text-6xl leading-none text-accent md:left-9"
              style={{ textShadow: "0 0 24px rgba(255,56,60,0.55)" }}
            >
              &ldquo;
            </span>

            <blockquote className="relative max-w-2xl pt-8 text-balance font-serif text-2xl italic leading-tight text-text/95 md:text-4xl md:leading-[1.15]">
              {proof.quote.text}
            </blockquote>

            <figcaption className="relative mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={proof.quote.avatarSrc}
                alt={`${proof.quote.author} avatar`}
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 rounded-full border border-white/15 bg-white/5 object-cover"
              />
              <div className="leading-tight">
                <p className="text-base font-semibold text-text">
                  {proof.quote.author}
                </p>
                <a
                  href={proof.quote.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${proof.quote.author} on X`}
                  className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:text-accent"
                >
                  <Icon name="x" size={13} />
                  {proof.quote.handle}
                </a>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
