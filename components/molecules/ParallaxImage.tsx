"use client";

import { useEffect, useRef, useState } from "react";

export function ParallaxImage({
  children,
  strength = 40,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  const [enabled, setEnabled] = useState(
    () =>
      !(
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ),
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnabled = () => setEnabled(!mq.matches);
    mq.addEventListener("change", updateEnabled);
    if (mq.matches) {
      return () => mq.removeEventListener("change", updateEnabled);
    }

    const el = ref.current;
    if (!el) {
      return () => mq.removeEventListener("change", updateEnabled);
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const offset = (center - viewportH / 2) / viewportH;
      setY(-offset * strength);
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      mq.removeEventListener("change", updateEnabled);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: enabled ? `translate3d(0, ${y}px, 0)` : undefined,
        willChange: enabled ? "transform" : undefined,
      }}
    >
      {children}
    </div>
  );
}
