import { WaitlistCard } from "@/components/molecules/WaitlistCard";
import { home } from "@/content/home";
import { getWaitlistCount } from "@/lib/waitlist";

export async function BetaCta() {
  const cta = home.betaCta;
  const hero = home.hero.newsletter;
  const socialProof = hero.socialProof;
  const liveCount = await getWaitlistCount(socialProof.count);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 15% 0%, rgba(255,56,60,0.12), transparent 65%)," +
            "radial-gradient(ellipse 800px 500px at 85% 100%, rgba(255,115,110,0.08), transparent 65%)",
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
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-6">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            {cta.eyebrow}
          </span>
          <h2 className="mt-5 font-brand text-4xl font-normal leading-tight tracking-tight md:text-5xl">
            {cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted md:text-lg">
            {cta.subtitle}
          </p>
          <p className="mt-2 text-xs text-muted/80">{cta.note}</p>
        </div>

        {/* Waitlist card */}
        <div className="mt-10 md:mt-12">
          <WaitlistCard
            headline={cta.cardHeadline}
            subheadline={cta.cardSubheadline}
            liveCount={liveCount}
            socialLabel={socialProof.label}
            avatars={socialProof.avatars}
            variant="hero"
          />
        </div>

        {/* Footnote */}
        <p className="mx-auto mt-10 max-w-md text-balance text-center text-sm italic text-muted/80 md:mt-12">
          {cta.footnote}
        </p>
      </div>
    </section>
  );
}
