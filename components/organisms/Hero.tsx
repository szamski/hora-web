import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { GradientText } from "@/components/atoms/GradientText";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import { home } from "@/content/home";

export function Hero() {
  const hero = home.hero;

  return (
    <section className="relative flex flex-col items-center gap-8 px-6 pb-16 pt-16 text-center md:pb-24 md:pt-24">
      <Image
        src={hero.iconSrc}
        alt="hora Calendar icon"
        width={96}
        height={96}
        className="rounded-2xl"
        priority
      />

      <h1 className="font-brand text-5xl font-normal leading-tight tracking-tight md:text-7xl">
        {hero.title.prefix}{" "}
        <GradientText>{hero.title.suffixGradient}</GradientText>
      </h1>

      <div className="space-y-2">
        <p className="text-xl text-text md:text-2xl">{hero.subtitle}</p>
        <p className="text-base text-muted md:text-lg">{hero.tagline}</p>
      </div>

      <div id="newsletter" className="w-full max-w-md">
        <NewsletterForm className="mx-auto" />
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
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={hero.demo.posterSrc}
            aria-label={hero.demo.ariaLabel}
            className="block h-auto w-full"
          >
            <source src={hero.demo.videoSrc} type="video/mp4" />
            <track
              kind="captions"
              src={hero.demo.captionsSrc}
              srcLang="en"
              label="English"
              default
            />
          </video>
        </div>
      </div>

      <div
        id="download"
        className="mt-4 flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
      >
        {hero.downloads.map((d) => (
          <Button
            key={d.label}
            href={d.href}
            size="lg"
            variant={d.icon === "apple" ? "primary" : "outline"}
            aria-disabled={d.disabled || undefined}
            tabIndex={d.disabled ? -1 : undefined}
            className={d.disabled ? "pointer-events-none opacity-60" : ""}
          >
            <Icon name={d.icon as IconName} size={16} />
            {d.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
