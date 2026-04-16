import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

export function FeaturesStory() {
  const f = home.features;
  return (
    <section
      id="features"
      className="mx-auto max-w-page px-6 py-20 md:py-28"
    >
      <SectionHeading heading={f.heading} className="mb-16 md:mb-20" />

      <div className="space-y-20 md:space-y-32">
        {f.sections.map((section, i) => {
          const imageLeft = i % 2 === 1;
          return (
            <ScrollReveal
              key={section.title}
              as="article"
              delay={80}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-14"
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
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
              </div>

              <div
                className={cn(
                  "relative",
                  imageLeft && "md:order-first",
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-8 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(255,56,60,0.10) 0%, transparent 70%)",
                  }}
                />
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={1200}
                    height={800}
                    sizes="(min-width: 768px) 480px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <p className="mt-16 text-center">
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
