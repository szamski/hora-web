import { GradientText } from "@/components/atoms/GradientText";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";

export function WhyHora() {
  const w = home.whyHora;
  const [first, second, climax] = w.positioning;

  return (
    <section className="mx-auto max-w-page px-6 py-20 md:py-28">
      <SectionHeading heading={w.heading} className="mb-12 md:mb-16" />

      <div className="mx-auto max-w-2xl space-y-3 text-center md:space-y-4">
        <p className="text-2xl text-muted md:text-3xl">{first}</p>
        <p className="text-2xl text-muted md:text-3xl">{second}</p>
        <p className="text-3xl font-semibold tracking-tight text-text md:text-4xl">
          Hora aims for the <GradientText>balance</GradientText>.
        </p>
        <span className="sr-only">{climax}</span>
      </div>

      <div className="mx-auto mt-16 max-w-md space-y-2 rounded-xl border border-border bg-surface/40 p-6 text-center text-sm text-muted md:text-base">
        {w.bio.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </section>
  );
}
