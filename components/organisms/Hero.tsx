import Image from "next/image";
import { GradientText } from "@/components/atoms/GradientText";
import { PillChip } from "@/components/atoms/PillChip";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import { HeroVideo } from "@/components/molecules/HeroVideo";
import { ParallaxIcon } from "@/components/molecules/ParallaxIcon";
import { home } from "@/content/home";

export function Hero() {
  const hero = home.hero;

  return (
    <section className="relative flex flex-col items-center gap-8 px-6 pb-20 pt-16 text-center md:pb-28 md:pt-24">
      <ParallaxIcon>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,56,60,0.28) 0%, transparent 70%)",
            }}
          />
          <Image
            src={hero.iconSrc}
            alt="hora Calendar icon"
            width={96}
            height={96}
            className="relative rounded-2xl"
            priority
          />
        </div>
      </ParallaxIcon>

      <h1 className="font-brand text-5xl font-normal leading-[1.05] tracking-tight md:text-[64px]">
        {hero.title.prefix}{" "}
        <GradientText>{hero.title.suffixGradient}</GradientText>
      </h1>

      <p className="max-w-2xl text-balance text-2xl font-semibold leading-tight tracking-tight text-text md:text-3xl">
        {hero.tagline}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {hero.pillars.map((p) => (
          <PillChip key={p}>{p}</PillChip>
        ))}
      </div>

      <p className="max-w-xl text-balance text-base text-muted md:text-lg">
        {hero.descriptor}
      </p>

      <blockquote className="mx-auto max-w-xl border-l-2 border-accent/60 pl-6 text-left">
        <div className="space-y-1.5 text-sm italic text-muted md:text-base">
          {hero.personalNote.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </blockquote>

      <div
        id="newsletter"
        className="mt-4 w-full max-w-120 scroll-mt-24 rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur"
      >
        <NewsletterForm />
      </div>

      <div className="relative mt-8 w-full max-w-4xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 mx-auto my-auto h-3/4 w-3/4 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,56,60,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 overflow-hidden rounded-2xl border border-border shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.5),0_0_80px_rgba(255,56,60,0.04)]">
          <HeroVideo
            src={hero.demo.videoSrc}
            poster={hero.demo.posterSrc}
            captionsSrc={hero.demo.captionsSrc}
            ariaLabel={hero.demo.ariaLabel}
          />
        </div>
      </div>
    </section>
  );
}
