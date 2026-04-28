import Image from "next/image";
import { WaitlistCard } from "@/components/molecules/WaitlistCard";
import { home } from "@/content/home";

export function HeroScene({ liveCount }: { liveCount: number }) {
  const hero = home.hero;
  const newsletter = hero.newsletter;
  const socialProof = newsletter.socialProof;

  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-hidden">
      {/* Background: dimmed poster + tints */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Image
          src={hero.demo.posterSrc}
          alt="hora Calendar macOS app interface"
          fill
          priority
          fetchPriority="high"
          quality={60}
          sizes="(min-width: 1536px) 1455px, 100vw"
          className="object-cover opacity-[0.22]"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 800px 500px at 15% 25%, rgba(255,56,60,0.22), transparent 65%), " +
              "radial-gradient(ellipse 700px 500px at 85% 70%, rgba(255,115,110,0.18), transparent 65%), " +
              "radial-gradient(ellipse 900px 600px at 50% 50%, rgba(10,10,10,0.35), transparent 70%)",
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-bg/55 via-bg/30 to-bg" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 px-6 pb-16 pt-10 text-center md:gap-6 md:pt-16">
        <Image
          src={hero.iconSrc}
          alt="hora Calendar icon"
          width={88}
          height={88}
          className="rounded-2xl drop-shadow-[0_18px_36px_rgba(255,56,60,0.28)]"
          priority
        />

        <h1 className="font-brand text-5xl font-normal leading-[1.2] tracking-tight md:text-[64px]">
          <span className="inline-block pr-[0.12em] pl-[0.04em]">
            {hero.title.prefix}
          </span>
          <span aria-hidden>{"\u00A0"}</span>
          <span className="inline-block bg-linear-to-br from-accent to-accent-glow bg-clip-text pr-[0.12em] pl-[0.04em] text-transparent">
            {hero.title.suffixGradient}
          </span>
        </h1>

        <p className="max-w-2xl text-balance text-2xl font-semibold leading-tight tracking-tight text-text md:text-3xl">
          {hero.tagline}
        </p>

        <WaitlistCard
          id="newsletter"
          headline={newsletter.headline}
          liveCount={liveCount}
          socialLabel={socialProof.label}
          avatars={socialProof.avatars}
          variant="hero"
          animatedCount={false}
          className="mt-4 max-w-xl md:mt-8"
        />

        <a
          href="#watch"
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-muted backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors hover:border-accent/60 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>{newsletter.watchDemoCtaLabel}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="md:animate-bounce"
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
