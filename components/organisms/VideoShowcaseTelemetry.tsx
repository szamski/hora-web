"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

type YTPlayer = {
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  isMuted: () => boolean;
  destroy: () => void;
};

type YTPlayerEvent = { target: YTPlayer; data?: number };

type YTPlayerConstructor = new (
  el: HTMLElement | string,
  opts: {
    events?: {
      onReady?: (event: YTPlayerEvent) => void;
      onStateChange?: (event: YTPlayerEvent) => void;
    };
  },
) => YTPlayer;

declare global {
  interface Window {
    YT?: { Player: YTPlayerConstructor };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
  return ytApiPromise;
}

export function VideoShowcaseTelemetry({
  iframeId,
  iframeLoaded,
  videoId,
}: {
  iframeId: string;
  iframeLoaded: boolean;
  videoId: string;
}) {
  const playerRef = useRef<YTPlayer | null>(null);
  const trackedViewedRef = useRef(false);
  const trackedPlayedRef = useRef(false);
  const trackedUnmutedRef = useRef(false);
  const trackedQuartilesRef = useRef<Set<number>>(new Set());
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    if (trackedViewedRef.current) return;
    trackedViewedRef.current = true;
    track("demo_viewed", { asset: "hero_gif" });
  }, []);

  useEffect(() => {
    if (!iframeLoaded) return;
    const iframe = document.getElementById(iframeId);
    if (!iframe) return;

    let cancelled = false;
    void loadYouTubeAPI().then(() => {
      if (cancelled || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player(iframe, {
        events: {
          onReady: () => {
            if (!cancelled) setPlayerReady(true);
          },
          onStateChange: (event) => {
            if (event.data === 1 && !trackedPlayedRef.current) {
              trackedPlayedRef.current = true;
              track("demo_played", { video_id: videoId });
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* no-op */
      }
      playerRef.current = null;
    };
  }, [iframeId, iframeLoaded, videoId]);

  useEffect(() => {
    if (!playerReady) return;
    const id = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      try {
        if (!trackedUnmutedRef.current && player.isMuted() === false) {
          trackedUnmutedRef.current = true;
          track("demo_unmuted", { video_id: videoId });
        }
        if (player.getPlayerState() !== 1) return;
        const duration = player.getDuration();
        if (!duration) return;
        const pct = (player.getCurrentTime() / duration) * 100;
        for (const quartile of [25, 50, 75, 95] as const) {
          if (pct >= quartile && !trackedQuartilesRef.current.has(quartile)) {
            trackedQuartilesRef.current.add(quartile);
            track("demo_progress", {
              video_id: videoId,
              quartile,
            });
          }
        }
      } catch {
        /* try again next tick */
      }
    }, 2000);
    return () => window.clearInterval(id);
  }, [playerReady, videoId]);

  return null;
}
