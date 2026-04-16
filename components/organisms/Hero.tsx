import Image from "next/image";
import { GradientText } from "@/components/atoms/GradientText";
import { PillChip } from "@/components/atoms/PillChip";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import { ParallaxIcon } from "@/components/molecules/ParallaxIcon";
import { home } from "@/content/home";

export function Hero() {
  const hero = home.hero;

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background video */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={hero.demo.posterSrc}
          className="h-full w-full object-cover opacity-40 motion-reduce:hidden"
        >
          <source src={hero.demo.videoSrc} type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.demo.posterSrc}
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover opacity-40 motion-reduce:block"
        />
        {/* Soft top + strong bottom fade so content stays readable and video bleeds into page bg */}
        <div className="absolute inset-0 bg-linear-to-b from-bg/50 via-bg/30 to-bg" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 pb-24 pt-16 text-center md:pb-32 md:pt-24">
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

        <div className="mx-auto max-w-xl space-y-1 text-sm text-muted/90 md:text-base">
          {hero.personalNote.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div
          id="newsletter"
          className="mt-6 w-full max-w-120 scroll-mt-24 rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur"
        >
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
