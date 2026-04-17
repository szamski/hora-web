import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuAppWindow,
  LuBell,
  LuCalendarRange,
  LuCommand,
  LuRefreshCw,
  LuShieldCheck,
} from "react-icons/lu";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";
import { home } from "@/content/home";

type FeatureIconKey =
  | "app-window"
  | "calendar"
  | "bell"
  | "sync"
  | "command"
  | "shield";

const iconMap: Record<FeatureIconKey, IconType> = {
  "app-window": LuAppWindow,
  calendar: LuCalendarRange,
  bell: LuBell,
  sync: LuRefreshCw,
  command: LuCommand,
  shield: LuShieldCheck,
};

export function FeaturesStory() {
  const f = home.features;

  return (
    <section id="features" className="relative overflow-hidden py-24 md:py-36">
      {/* Ambient dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 85%)",
        }}
      />

      {/* Warm edge glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 0% 10%, rgba(255,56,60,0.12), transparent 60%)," +
            "radial-gradient(ellipse 700px 500px at 100% 40%, rgba(255,115,110,0.08), transparent 60%)," +
            "radial-gradient(ellipse 900px 500px at 50% 100%, rgba(255,56,60,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            {f.eyebrow}
          </span>
          <div className="mt-5">
            <SectionHeading heading={f.heading} />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted md:text-lg">
            {f.description}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-6 lg:grid-cols-3">
          {f.items.map((item, i) => {
            const IconComponent = iconMap[item.icon];
            return (
              <ScrollReveal
                key={item.title}
                as="article"
                delay={i * 60}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_60px_-30px_rgba(0,0,0,0.65)] transition-[transform,border-color,background-color] duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/6 md:p-7"
              >
                {/* Per-tile warm halo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,56,60,0.35) 0%, transparent 70%)",
                  }}
                />

                <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_24px_rgba(255,56,60,0.25)]">
                  <IconComponent size={20} aria-hidden />
                </span>

                <h3 className="relative mt-5 text-lg font-semibold leading-tight tracking-tight text-text md:text-xl">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                  {item.body}
                </p>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-16 text-center md:mt-20">
          <Link
            href={f.allFeaturesLink.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-muted backdrop-blur-xl transition-all hover:border-accent/60 hover:bg-white/8 hover:text-text hover:shadow-[0_0_30px_rgba(255,56,60,0.25)]"
          >
            {f.allFeaturesLink.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
