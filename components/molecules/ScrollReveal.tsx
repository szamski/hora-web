"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
};

export function ScrollReveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const rect = el.getBoundingClientRect();
    const belowFold = rect.top > window.innerHeight;
    if (!belowFold) return;
    setVisible(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setTimeout(() => setVisible(true), delay);
        io.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    const fallback = setTimeout(() => setVisible(true), 1500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        "transition-all duration-700 ease-out will-change-[opacity,transform]",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
