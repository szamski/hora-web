"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  LuMaximize2,
  LuMinimize2,
  LuPlay,
  LuVolume2,
  LuVolumeX,
} from "react-icons/lu";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function VideoShowcase() {
  const v = home.videoShowcase;
  const demo = home.hero.demo;

  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manuallyStarted, setManuallyStarted] = useState(false);

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

  // Muted autoplay when section enters viewport (skipped for reduced motion).
  useEffect(() => {
    if (reducedMotion && !manuallyStarted) return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(container);
    return () => io.disconnect();
  }, [reducedMotion, manuallyStarted]);

  useEffect(() => {
    const video = videoRef.current;
    const onFsChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element | null };
      const fsEl = doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
      setIsFullscreen(fsEl === frameRef.current);
    };
    const onVideoFsBegin = () => setIsFullscreen(true);
    const onVideoFsEnd = () => setIsFullscreen(false);
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    video?.addEventListener("webkitbeginfullscreen", onVideoFsBegin);
    video?.addEventListener("webkitendfullscreen", onVideoFsEnd);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
      video?.removeEventListener("webkitbeginfullscreen", onVideoFsBegin);
      video?.removeEventListener("webkitendfullscreen", onVideoFsEnd);
    };
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.muted = false;
      video.currentTime = 0;
      video.play().catch(() => {});
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    const el = frameRef.current as
      | (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> | void })
      | null;
    const video = videoRef.current as
      | (HTMLVideoElement & {
          webkitEnterFullscreen?: () => void;
          webkitExitFullscreen?: () => void;
          webkitDisplayingFullscreen?: boolean;
        })
      | null;
    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => Promise<void> | void;
    };

    const isInFs =
      !!(doc.fullscreenElement ?? doc.webkitFullscreenElement) ||
      !!video?.webkitDisplayingFullscreen;

    if (isInFs) {
      if (typeof doc.exitFullscreen === "function") {
        doc.exitFullscreen().catch(() => {});
      } else if (typeof doc.webkitExitFullscreen === "function") {
        doc.webkitExitFullscreen();
      } else if (typeof video?.webkitExitFullscreen === "function") {
        video.webkitExitFullscreen();
      }
      return;
    }

    if (el && typeof el.requestFullscreen === "function") {
      el.requestFullscreen().catch(() => {});
    } else if (el && typeof el.webkitRequestFullscreen === "function") {
      const result = el.webkitRequestFullscreen();
      if (result && typeof (result as Promise<void>).catch === "function") {
        (result as Promise<void>).catch(() => {});
      }
    } else if (video && typeof video.webkitEnterFullscreen === "function") {
      // iOS Safari: Fullscreen API is only available on <video>.
      try {
        video.webkitEnterFullscreen();
      } catch {
        /* no-op */
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const startReducedMotionPlayback = useCallback(() => {
    setManuallyStarted(true);
    requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video) return;
      video.play().catch(() => {});
    });
  }, []);

  const showReducedMotionPoster = reducedMotion && !manuallyStarted;

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

          <div
            ref={frameRef}
            className={cn(
              "relative overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_60px_120px_-30px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)]",
              isFullscreen && "flex h-full w-full items-center justify-center rounded-none",
            )}
          >
              <video
                ref={videoRef}
                loop
                muted={isMuted}
                playsInline
                preload="none"
                poster={demo.videoPosterSrc}
                controls={false}
                onClick={showReducedMotionPoster ? undefined : togglePlay}
                aria-label={demo.ariaLabel}
                className={cn(
                  "block w-full cursor-pointer",
                  isFullscreen ? "h-full max-h-full object-contain" : "h-auto",
                  showReducedMotionPoster && "invisible",
                )}
              >
                {demo.videoSources.map((source) => (
                  <source key={source.src} src={source.src} type={source.type} />
                ))}
              </video>

              {/* Reduced-motion fallback: poster + big play button */}
              {showReducedMotionPoster ? (
                <button
                  type="button"
                  onClick={startReducedMotionPlayback}
                  aria-label="Play demo video"
                  className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none"
                >
                  <Image
                    src={demo.posterSrc}
                    alt="hora Calendar macOS app demo preview"
                    fill
                    sizes="(min-width: 1024px) 1152px, 100vw"
                    className="object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                  <span className="pointer-events-none relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_40px_rgba(255,56,60,0.45)]">
                    <LuPlay size={24} aria-hidden />
                  </span>
                </button>
              ) : (
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? v.minimizeLabel : v.enlargeLabel}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_30px_-10px_rgba(0,0,0,0.65)] transition-colors hover:border-accent/60 hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {isFullscreen ? (
                      <LuMinimize2 size={14} aria-hidden />
                    ) : (
                      <LuMaximize2 size={14} aria-hidden />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? v.unmuteLabel : v.muteLabel}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_30px_-10px_rgba(0,0,0,0.65)] transition-colors hover:border-accent/60 hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {isMuted ? <LuVolumeX size={14} /> : <LuVolume2 size={14} />}
                    <span>{isMuted ? v.unmuteLabel : v.muteLabel}</span>
                  </button>
                </div>
              )}
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
