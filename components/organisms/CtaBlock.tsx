import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import { SectionHeading } from "@/components/atoms/SectionHeading";

export function CtaBlock({
  heading = { prefix: "Join the", suffixGradient: "Waitlist" },
  subtitle = "Be first to know when hora Calendar launches.",
}: {
  heading?: { prefix: string; suffixGradient: string; after?: string };
  subtitle?: string;
}) {
  return (
    <section className="mx-auto my-16 max-w-2xl rounded-2xl border border-border bg-surface px-6 py-12 text-center md:my-24 md:px-12">
      <SectionHeading heading={heading} subtitle={subtitle} className="mb-8" />
      <div className="flex justify-center">
        <NewsletterForm />
      </div>
    </section>
  );
}
