"use client";

import Image from "next/image";
import { LuChevronDown } from "react-icons/lu";
import { ParallaxIcon } from "@/components/molecules/ParallaxIcon";
import { WaitlistCard } from "@/components/molecules/WaitlistCard";
import { home } from "@/content/home";

function WordRise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-block pr-[0.12em] pl-[0.04em] will-change-[transform,opacity,filter] motion-reduce:animate-none ${className ?? ""}`.trim()}
      style={{
        animation: "letter-rise 1000ms cubic-bezier(0.22, 1, 0.36, 1) both",
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </span>
  );
}

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
          sizes="100vw"
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
        <ParallaxIcon>
          <Image
            src={hero.iconSrc}
            alt="hora Calendar icon"
            width={88}
            height={88}
            className="rounded-2xl drop-shadow-[0_18px_36px_rgba(255,56,60,0.28)]"
            priority
          />
        </ParallaxIcon>

        <h1 className="font-brand text-5xl font-normal leading-[1.2] tracking-tight md:text-[64px]">
          <WordRise delay={0}>{hero.title.prefix}</WordRise>
          <span aria-hidden>{"\u00A0"}</span>
          <WordRise
            delay={220}
            className="bg-linear-to-br from-accent to-accent-glow bg-clip-text text-transparent"
          >
            {hero.title.suffixGradient}
          </WordRise>
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
          className="mt-4 max-w-xl md:mt-8"
        />

        <a
          href="#watch"
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-muted backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors hover:border-accent/60 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>{newsletter.watchDemoCtaLabel}</span>
          <LuChevronDown size={14} className="animate-bounce motion-reduce:animate-none" aria-hidden />
        </a>
      </div>
    </section>
  );
}
