import { Button } from "@/components/atoms/Button";
import { home } from "@/content/home";

export function BetaCta() {
  const cta = home.betaCta;
  return (
    <section className="relative mx-auto my-16 max-w-article px-6 md:my-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -top-4 h-40 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,56,60,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-surface/80 p-10 text-center backdrop-blur md:p-14">
        <h2 className="text-3xl font-semibold tracking-tight text-text md:text-4xl">
          {cta.heading}
        </h2>
        <p className="mt-3 text-base text-muted">{cta.subtitle}</p>
        <p className="mt-1 text-xs text-muted">{cta.note}</p>

        <div className="mt-7 flex justify-center">
          <Button
            href={cta.button.href}
            size="lg"
            className="shadow-[0_0_0_0_rgba(255,56,60,0)] transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(255,56,60,0.45)]"
          >
            {cta.button.label}
          </Button>
        </div>

        <p className="mx-auto mt-10 max-w-md text-xs italic text-muted/80">
          {cta.footnote}
        </p>
      </div>
    </section>
  );
}
