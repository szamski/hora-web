"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function HeroVideo({
  src,
  poster,
  captionsSrc,
  ariaLabel,
  className,
}: {
  src: string;
  poster: string;
  captionsSrc?: string;
  ariaLabel?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manuallyPlaying, setManuallyPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reducedMotion]);

  if (reducedMotion && !manuallyPlaying) {
    return (
      <button
        type="button"
        onClick={() => {
          setManuallyPlaying(true);
          requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
        }}
        className={cn(
          "group relative block w-full overflow-hidden rounded-2xl border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          className,
        )}
        aria-label={`${ariaLabel ?? "Play demo video"} — motion is reduced; click to play.`}
      >
        <Image
          src={poster}
          alt="hora Calendar on macOS showing week view"
          width={1600}
          height={900}
          priority
          sizes="(min-width: 768px) 960px, 100vw"
          className="block h-auto w-full"
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity group-hover:bg-black/40">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay={!reducedMotion}
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={ariaLabel}
      className={cn("block h-auto w-full", className)}
    >
      <source src={src} type="video/mp4" />
      {captionsSrc ? (
        <track
          kind="captions"
          src={captionsSrc}
          srcLang="en"
          label="English"
          default
        />
      ) : null}
    </video>
  );
}
