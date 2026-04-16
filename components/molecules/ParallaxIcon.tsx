"use client";

import { useEffect, useRef, useState } from "react";

export function ParallaxIcon({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const update = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let lastY = -1;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (y === lastY) return;
      lastY = y;
      // Subtle: move down 0.08× scroll, tilt up to ~4deg
      const translate = Math.min(y * 0.08, 48);
      const rotate = Math.min(y * 0.02, 4);
      el.style.transform = `translate3d(0, ${translate}px, 0) rotateX(${rotate}deg)`;
    };

    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
        perspective: "600px",
      }}
    >
      {children}
    </div>
  );
}
