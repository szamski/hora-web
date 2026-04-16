import Link from "next/link";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";

export function FeaturesStory() {
  const f = home.features;
  return (
    <section
      id="features"
      className="mx-auto max-w-article px-6 py-16 md:py-20"
    >
      <SectionHeading heading={f.heading} className="mb-12" />

      <div className="space-y-12 md:space-y-16">
        {f.sections.map((section) => (
          <article key={section.title} className="space-y-3">
            <h3 className="text-xl font-semibold tracking-tight text-text md:text-2xl">
              {section.title}
            </h3>

            {"intro" in section && section.intro ? (
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-muted">
                {section.intro.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            ) : null}

            {"bullets" in section && section.bullets ? (
              <ul className="list-disc space-y-1 pl-5 text-muted marker:text-accent">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}

            <p className="text-muted leading-relaxed">{section.body}</p>
          </article>
        ))}
      </div>

      <p className="mt-12 text-center">
        <Link
          href={f.allFeaturesLink.href}
          className="text-sm text-muted transition-colors hover:text-text"
        >
          {f.allFeaturesLink.label}
        </Link>
      </p>
    </section>
  );
}
