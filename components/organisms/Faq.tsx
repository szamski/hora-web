import Script from "next/script";
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
    <section id="faq" className="bg-surface/20 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading heading={faq.heading} className="mb-12" />
        <div className="space-y-3">
          {faq.items.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
