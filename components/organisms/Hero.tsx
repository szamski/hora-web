import Image from "next/image";
import { GradientText } from "@/components/atoms/GradientText";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import { HeroVideo } from "@/components/molecules/HeroVideo";
import { home } from "@/content/home";

export function Hero() {
  const hero = home.hero;

  return (
    <section className="relative flex flex-col items-center gap-6 px-6 pb-16 pt-12 text-center md:pt-16">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,56,60,0.25) 0%, transparent 70%)",
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

      <h1 className="font-brand text-4xl font-normal leading-[1.1] tracking-tight md:text-[56px]">
        {hero.title.prefix}{" "}
        <GradientText>{hero.title.suffixGradient}</GradientText>
      </h1>

      <p className="text-lg text-text md:text-xl">{hero.tagline}</p>

      <p className="text-base font-medium tracking-wide text-muted">
        {hero.pillars.join(". ")}.
      </p>

      <p className="max-w-xl text-sm text-muted md:text-base">
        {hero.descriptor}
      </p>

      <div className="mx-auto max-w-xl space-y-1.5 text-sm text-muted md:text-base">
        {hero.personalNote.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div
        id="newsletter"
        className="mt-2 w-full max-w-120 scroll-mt-24 rounded-2xl border border-border bg-surface p-6"
      >
        <NewsletterForm />
      </div>

      <div className="relative mt-6 w-full max-w-4xl">
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
