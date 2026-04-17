"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / range));
      setProgress(p);
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, [ref]);
  return progress;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = () => setReduced(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}

export function HeroScene({ liveCount }: { liveCount: number }) {
  const hero = home.hero;
  const newsletter = hero.newsletter;
  const socialProof = newsletter.socialProof;

  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const rawProgress = useScrollProgress(sectionRef);
  const p = reducedMotion ? 0 : rawProgress;

  // Content: fades out as we scroll; done by ~0.55 so the last bit is pure video.
  const contentOpacity = Math.max(0, 1 - p * 1.8);
  const contentTranslate = -p * 48;

  // Video: starts dim, reaches full brightness as content fades out; subtle zoom.
  const videoOpacity = 0.35 + p * 0.65;
  const videoScale = 0.98 + p * 0.04;

  // Readability overlays: dim the video less as we approach the bottom.
  const overlayOpacity = Math.max(0.15, 1 - p * 0.85);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: reducedMotion ? "100svh" : "180svh" }}
    >
      <div className="sticky top-0 flex h-svh w-full flex-col overflow-hidden">
        {/* Background: video + tints + gradient */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={hero.demo.posterSrc}
            className="h-full w-full object-cover motion-reduce:hidden"
            style={{
              opacity: videoOpacity,
              transform: `scale(${videoScale})`,
              willChange: "opacity, transform",
            }}
          >
            {hero.demo.videoSources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.demo.posterSrc}
            alt=""
            className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
            style={{ opacity: videoOpacity }}
          />

          <div
            className="absolute inset-0"
            style={{
              opacity: overlayOpacity,
              background:
                "radial-gradient(ellipse 800px 500px at 15% 25%, rgba(255,56,60,0.22), transparent 65%), " +
                "radial-gradient(ellipse 700px 500px at 85% 70%, rgba(255,115,110,0.18), transparent 65%), " +
                "radial-gradient(ellipse 900px 600px at 50% 50%, rgba(10,10,10,0.35), transparent 70%)",
            }}
          />

          <div
            className="absolute inset-0 bg-linear-to-b from-bg/45 via-bg/20 to-bg"
            style={{ opacity: overlayOpacity }}
          />
        </div>

        {/* Foreground content — fades + floats up as we scroll */}
        <div
          className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6 pb-10 pt-6 text-center md:gap-6 md:pt-10"
          style={{ pointerEvents: contentOpacity < 0.15 ? "none" : "auto" }}
        >
          {/* Top group fades/translates together — isolation is fine here, no backdrop-filter children */}
          <div
            className="flex flex-col items-center gap-5 md:gap-6"
            style={{
              opacity: contentOpacity,
              transform: `translate3d(0, ${contentTranslate}px, 0)`,
              willChange: "opacity, transform",
            }}
          >
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
          </div>

          {/* Card lives as a flex sibling — own opacity/transform don't block its backdrop-filter */}
          <WaitlistCard
            id="newsletter"
            headline={newsletter.headline}
            liveCount={liveCount}
            socialLabel={socialProof.label}
            avatars={socialProof.avatars}
            variant="hero"
            className="mt-4 max-w-xl md:mt-8"
            style={{
              opacity: contentOpacity,
              transform: `translate3d(0, ${contentTranslate}px, 0)`,
              willChange: "opacity, transform",
            }}
          />
        </div>
      </div>
    </section>
  );
}
