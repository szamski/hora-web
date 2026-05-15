import { FaqItem } from "@/components/molecules/FaqItem";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";

export function Faq() {
  const faq = home.faq;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_420px_at_15%_0%,rgba(255,56,60,0.09),transparent_68%)]"
      />

      <div className="relative mx-auto max-w-[1180px] px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading heading={faq.heading} />
            <p className="mt-4 max-w-xl text-base text-muted">
              {faq.subtitle}
            </p>
          </div>
          <div className="text-sm text-muted">
            Still have questions?{" "}
            <a
              href="mailto:hello@horacal.app"
              className="text-accent underline decoration-accent/40 underline-offset-4 hover:text-text"
            >
              Contact us
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {faq.items.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
