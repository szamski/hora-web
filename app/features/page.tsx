import type { Metadata } from "next";
import Image from "next/image";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import { GradientText } from "@/components/atoms/GradientText";
import { features } from "@/content/features";

export const metadata: Metadata = {
  title: features.seo.title,
  description: features.seo.description,
  alternates: { canonical: "/features/" },
  openGraph: {
    title: features.seo.ogTitle,
    description: features.seo.ogDescription,
    url: "https://horacal.app/features/",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <div className="mx-auto max-w-[960px] px-6 pb-12 pt-16 text-center md:pt-20">
        <h1 className="font-brand text-4xl font-normal leading-tight tracking-tight md:text-5xl">
          {features.hero.title.prefix}{" "}
          <GradientText>{features.hero.title.suffixGradient}</GradientText>
          {features.hero.title.after ? ` ${features.hero.title.after}` : null}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          {features.hero.subtitle}
        </p>
      </div>

      {features.sections.map((section) => (
        <section
          key={section.label}
          className="mx-auto max-w-[960px] px-6 pb-16"
        >
          <div className="mb-5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
            <span>{section.label}</span>
            <span className="h-px flex-1 bg-border" aria-hidden />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {"wideShortcutsCard" in section && section.wideShortcutsCard ? (
              <div className="rounded-xl border border-border bg-white/[0.02] p-6 md:col-span-2">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex-1">
                    <h3 className="mb-1.5 text-base font-semibold text-text">
                      {section.wideShortcutsCard.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {section.wideShortcutsCard.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 rounded-lg bg-surface p-4 font-mono text-[13px] text-muted">
                    {section.wideShortcutsCard.shortcuts.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-2 py-1.5"
                      >
                        <span className="flex gap-1">
                          {s.keys.map((k) => (
                            <kbd
                              key={k}
                              className="inline-flex min-w-[26px] items-center justify-center rounded-md border border-white/10 bg-white/[0.08] px-2 py-0.5 text-xs text-text"
                            >
                              {k}
                            </kbd>
                          ))}
                        </span>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            {section.items.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                description={item.description}
                badges={"badges" in item ? item.badges : undefined}
              />
            ))}
          </div>

          {"screenshot" in section && section.screenshot ? (
            <div className="relative mt-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mx-auto my-auto h-[60%] w-[70%] rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(255,56,60,0.08) 0%, transparent 70%)",
                }}
              />
              <div className="relative overflow-hidden rounded-xl border border-border shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.5)]">
                <Image
                  src={section.screenshot.src}
                  alt={section.screenshot.alt}
                  width={1600}
                  height={1000}
                  className="h-auto w-full"
                />
              </div>
            </div>
          ) : null}
        </section>
      ))}
    </>
  );
}
