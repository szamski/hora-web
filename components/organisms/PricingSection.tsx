import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { home } from "@/content/home";

export function PricingSection() {
  const pricing = home.pricing;

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-y border-white/8 bg-[#0b0c0f] py-20 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 740px 420px at 16% 0%, rgba(255,56,60,0.10), transparent 66%)," +
            "radial-gradient(ellipse 760px 460px at 86% 94%, rgba(131,199,255,0.08), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 82%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1180px] px-6">
        <div className="grid gap-6 rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] md:grid-cols-[0.9fr_1.1fr] md:items-center md:p-8">
          <div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-text md:text-5xl">
              {pricing.heading.prefix}{" "}
              <span className="text-accent">{pricing.heading.suffixGradient}</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
              {pricing.body}
            </p>
            <p className="mt-3 text-sm font-medium text-muted">
              {pricing.crossPlatform}
            </p>
            <Link
              href={pricing.comparisonCta.href}
              className="mt-4 inline-flex h-10 items-center rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm text-muted transition-colors hover:border-accent/40 hover:bg-white/[0.07] hover:text-text"
            >
              {pricing.comparisonCta.label}
            </Link>
          </div>

          <div className="grid gap-3">
            <div className="inline-flex h-11 w-fit items-center gap-2 rounded-md border border-white/14 bg-white/[0.06] px-4 text-sm font-semibold text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <Icon name="apple" size={18} className="text-accent" />
              {pricing.appStoreLabel}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  One-time
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-text">
                  {pricing.oneTime}
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Subscription
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-text">
                  {pricing.yearly}
                </p>
              </div>
            </div>
            <div className="grid gap-2 rounded-md border border-white/10 bg-white/[0.02] p-4">
              {pricing.comparison.map((item) => (
                <div
                  key={item.name}
                  className="grid gap-1 border-b border-white/8 pb-2 last:border-b-0 last:pb-0 md:grid-cols-[0.95fr_1.05fr]"
                >
                  <p className="text-sm font-semibold text-text">{item.name}</p>
                  <p className="text-sm text-muted">{item.price}</p>
                  <p className="text-xs text-muted md:col-span-2">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
