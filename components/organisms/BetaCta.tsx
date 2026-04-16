import { Button } from "@/components/atoms/Button";
import { home } from "@/content/home";

export function BetaCta() {
  const cta = home.betaCta;
  return (
    <section className="mx-auto my-12 max-w-article rounded-2xl border border-border bg-surface px-6 py-12 text-center md:my-16 md:px-12">
      <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
        {cta.heading}
      </h2>
      <p className="mt-3 text-base text-muted">{cta.subtitle}</p>
      <p className="mt-1 text-xs text-muted">{cta.note}</p>

      <div className="mt-6 flex justify-center">
        <Button href={cta.button.href} size="lg">
          {cta.button.label}
        </Button>
      </div>

      <p className="mx-auto mt-8 max-w-md text-xs italic text-muted/80">
        {cta.footnote}
      </p>
    </section>
  );
}
