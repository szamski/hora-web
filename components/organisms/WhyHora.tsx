import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";

export function WhyHora() {
  const w = home.whyHora;
  return (
    <section className="mx-auto max-w-article px-6 py-16 md:py-20">
      <SectionHeading heading={w.heading} className="mb-10" />

      <div className="space-y-2 text-center text-lg text-text md:text-xl">
        {w.positioning.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-md space-y-2 text-center text-sm text-muted md:text-base">
        {w.bio.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </section>
  );
}
