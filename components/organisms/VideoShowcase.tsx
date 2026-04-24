"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LuPlay } from "react-icons/lu";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const YT_VIDEO_ID = "ahVV5J25cYM";
const YT_EMBED_URL =
  `https://www.youtube.com/embed/${YT_VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${YT_VIDEO_ID}` +
  `&modestbranding=1&rel=0&playsinline=1`;
const YT_THUMBNAIL_URL = `https://i.ytimg.com/vi/${YT_VIDEO_ID}/maxresdefault.jpg`;
const YT_THUMBNAIL_FALLBACK_URL = `https://i.ytimg.com/vi/${YT_VIDEO_ID}/hqdefault.jpg`;

export function VideoShowcase() {
  const v = home.videoShowcase;
  const demo = home.hero.demo;
  const [thumbnailSrc, setThumbnailSrc] = useState(YT_THUMBNAIL_URL);

  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manuallyStarted, setManuallyStarted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) return;
    let seen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !seen) {
          seen = true;
          track("demo_viewed", { asset: "hero_gif" });
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(container);
    return () => io.disconnect();
  }, []);

  const startReducedMotionPlayback = useCallback(() => {
    setManuallyStarted(true);
  }, []);

  const showIframe = !reducedMotion || manuallyStarted;
  const showPoster = !showIframe || !iframeLoaded;
  const showReducedMotionPlayButton = reducedMotion && !manuallyStarted;

  return (
    <section id="watch" className="relative overflow-hidden py-24 md:py-32">
      {/* Ambient dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 50%, black 40%, transparent 90%)",
        }}
      />

      {/* Warm edge glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 8% 0%, rgba(255,56,60,0.18), transparent 65%)," +
            "radial-gradient(ellipse 800px 500px at 92% 100%, rgba(255,115,110,0.14), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            {v.eyebrow}
          </span>
          <div className="mt-5">
            <SectionHeading heading={v.heading} />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted md:text-lg">
            {v.description}
          </p>
        </div>

        {/* Frame */}
        <div
          ref={containerRef}
          className="relative mx-auto mt-14 max-w-6xl md:mt-20"
        >
          {/* Warm halo — tight around frame, not to overpower section ambient */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[28px] blur-3xl md:-inset-10"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 55%, rgba(255,56,60,0.2), transparent 70%)",
            }}
          />

          {/* Floor reflection glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-16 -bottom-3 h-8 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,56,60,0.4) 0%, transparent 70%)",
            }}
          />

          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_60px_120px_-30px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)]">
            {showIframe ? (
              <iframe
                src={YT_EMBED_URL}
                title={demo.ariaLabel}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
                className={cn(
                  "absolute inset-0 h-full w-full border-0 transition-opacity duration-300",
                  iframeLoaded ? "opacity-100" : "opacity-0",
                )}
              />
            ) : null}

            {/* Poster overlay — shown while iframe loads, or as reduced-motion fallback */}
            {showPoster ? (
              <button
                type="button"
                onClick={
                  showReducedMotionPlayButton ? startReducedMotionPlayback : undefined
                }
                tabIndex={showReducedMotionPlayButton ? 0 : -1}
                aria-label="Play demo video"
                aria-hidden={!showReducedMotionPlayButton}
                className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- external YT thumbnail, not worth wiring through next.config remotePatterns for a single asset */}
                <img
                  src={thumbnailSrc}
                  alt="hora Calendar macOS app demo preview"
                  onError={() => {
                    if (thumbnailSrc !== YT_THUMBNAIL_FALLBACK_URL) {
                      setThumbnailSrc(YT_THUMBNAIL_FALLBACK_URL);
                    }
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                {showReducedMotionPlayButton ? (
                  <>
                    <span className="pointer-events-none absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                    <span className="pointer-events-none relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_40px_rgba(255,56,60,0.45)]">
                      <LuPlay size={24} aria-hidden />
                    </span>
                  </>
                ) : null}
              </button>
            ) : null}
          </div>

          {/* Highlights — what you're watching */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-10 md:gap-3">
            {v.highlights.map((h) => (
              <li
                key={h}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 text-xs text-muted backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:text-sm"
              >
                <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_rgba(255,56,60,0.85)]" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
