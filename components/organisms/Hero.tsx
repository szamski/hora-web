import Image from "next/image";
import { GradientText } from "@/components/atoms/GradientText";
import { PillChip } from "@/components/atoms/PillChip";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import { ParallaxIcon } from "@/components/molecules/ParallaxIcon";
import { home } from "@/content/home";
import { site } from "@/content/site";

export function Hero() {
  const hero = home.hero;
  const author = hero.personalNoteAuthor;

  return (
    <section className="relative overflow-hidden">
      {/* Layer 1: ambient background video */}
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

        {/* Layer 2: brand-tinted radial overlays (separate layer between video and text) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 800px 500px at 15% 25%, rgba(255,56,60,0.22), transparent 65%), " +
              "radial-gradient(ellipse 700px 500px at 85% 70%, rgba(255,115,110,0.18), transparent 65%), " +
              "radial-gradient(ellipse 900px 600px at 50% 50%, rgba(10,10,10,0.35), transparent 70%)",
          }}
        />

        {/* Layer 3: vertical readability gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-bg/45 via-bg/20 to-bg" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-7 px-6 pb-24 pt-14 text-center md:pb-32 md:pt-20">
        <ParallaxIcon>
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(255,56,60,0.32) 0%, transparent 70%)",
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

        <div
          id="newsletter"
          className="mt-2 w-full max-w-120 scroll-mt-24 rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur"
        >
          <NewsletterForm />
        </div>

        <p className="mt-8 max-w-xl text-balance text-base text-muted md:text-lg">
          {hero.descriptor}
        </p>

        {/* Signed personal note — visibly a human thought */}
        <figure className="relative mx-auto mt-2 max-w-xl rounded-2xl border border-border/60 bg-surface/30 px-8 py-7 text-left backdrop-blur">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-5 left-5 bg-bg px-2 font-brand text-5xl leading-none text-accent"
            style={{ textShadow: "0 0 20px rgba(255,56,60,0.5)" }}
          >
            &ldquo;
          </span>

          <blockquote className="space-y-1.5 text-[15px] text-text/90 md:text-base">
            {hero.personalNote.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </blockquote>

          <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
            <Image
              src={site.brand.logoSrc}
              alt=""
              width={32}
              height={32}
              className="rounded-lg border border-border"
            />
            <div className="leading-tight">
              <p className="text-sm font-medium text-text">{author.name}</p>
              <p className="text-xs text-muted">{author.role}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
