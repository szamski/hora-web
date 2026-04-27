"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedCount({
  value,
  duration = 800,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // SSR + initial paint with the final value so the LCP element doesn't grow
  // from "0+" → "245+". The IntersectionObserver below briefly counts up the
  // last ~30 to keep the visual flourish without changing rect width
  // (tabular-nums keeps digit width identical).
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        const span = Math.min(30, value);
        const startVal = Math.max(0, value - span);
        setDisplay(startVal);
        const start = performance.now();
        const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setDisplay(Math.round(startVal + ease(t) * span));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
    </span>
  );
}
