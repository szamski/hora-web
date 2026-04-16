import { SectionHeading } from "@/components/atoms/SectionHeading";
import { WaitlistCard } from "@/components/molecules/WaitlistCard";
import { blog } from "@/content/blog";
import { home } from "@/content/home";
import { getWaitlistCount } from "@/lib/waitlist";

export async function StayInLoopCta() {
  const cta = blog.footerCta;
  const socialProof = home.hero.newsletter.socialProof;
  const liveCount = await getWaitlistCount(socialProof.count);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 15% 0%, rgba(255,56,60,0.10), transparent 65%)," +
            "radial-gradient(ellipse 800px 500px at 85% 100%, rgba(255,115,110,0.07), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 50%, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-6">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            {cta.eyebrow}
          </span>
          <div className="mt-5">
            <SectionHeading heading={cta.heading} />
          </div>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted md:text-lg">
            {cta.subtitle}
          </p>
        </div>

        {/* Waitlist card */}
        <div className="mt-10 md:mt-12">
          <WaitlistCard
            eyebrow={cta.cardEyebrow}
            headline={cta.cardHeadline}
            subheadline={cta.cardSubheadline}
            liveCount={liveCount}
            socialLabel={socialProof.label}
            avatars={socialProof.avatars}
          />
        </div>
      </div>
    </section>
  );
}
