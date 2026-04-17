import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ParallaxImage } from "@/components/molecules/ParallaxImage";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

type FeatureMeta = { icon: IconName; tag: string };
const featureMeta: FeatureMeta[] = [
  { icon: "apple", tag: "Native" },
  { icon: "calendar", tag: "Planning" },
  { icon: "meet", tag: "Menu bar" },
  { icon: "sync", tag: "Google sync" },
  { icon: "keyboard", tag: "Shortcuts" },
  { icon: "shield", tag: "Privacy" },
];

function FeatureTag({ icon, label }: { icon: IconName; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
      <Icon name={icon} size={12} />
      {label}
    </span>
  );
}

function Numeral({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="font-brand text-7xl leading-none tracking-tight text-transparent md:text-[112px]"
      style={{
        WebkitTextStroke: "1px rgba(255,56,60,0.35)",
        textShadow: "0 0 40px rgba(255,56,60,0.15)",
      }}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

export function FeaturesStory() {
  const f = home.features;
  return (
    <section id="features" className="relative overflow-hidden py-24 md:py-36">
      {/* Ambient dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 85%)",
        }}
      />

      {/* Warm edge glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 0% 10%, rgba(255,56,60,0.12), transparent 60%)," +
            "radial-gradient(ellipse 700px 500px at 100% 40%, rgba(255,115,110,0.08), transparent 60%)," +
            "radial-gradient(ellipse 900px 500px at 50% 100%, rgba(255,56,60,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            Built for Mac
          </span>
          <div className="mt-5">
            <SectionHeading heading={f.heading} />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted md:text-lg">
            Six things nobody else quite gets right on macOS. Here's how hora
            does them.
          </p>
        </div>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-40">
          {f.sections.map((section, i) => {
            const imageLeft = i % 2 === 1;
            const meta = featureMeta[i] ?? featureMeta[0]!;
            const tiltClass = imageLeft
              ? "md:-rotate-[1.5deg]"
              : "md:rotate-[1.5deg]";
            return (
              <ScrollReveal
                key={section.title}
                as="article"
                delay={80}
                className="relative grid items-center gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16"
              >
                {/* Per-feature warm halo behind the image */}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-1/2 h-[60%] w-[55%] -translate-y-1/2 rounded-full blur-3xl",
                    imageLeft ? "left-0" : "right-0",
                  )}
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(255,56,60,0.28) 0%, rgba(255,115,110,0.08) 40%, transparent 70%)",
                  }}
                />

                <div className="relative">
                  <div className="flex items-center gap-4">
                    <Numeral n={i + 1} />
                    <FeatureTag icon={meta.icon} label={meta.tag} />
                  </div>

                  <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-text md:text-[40px]">
                    {section.title}
                  </h3>

                  {"intro" in section && section.intro ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {section.intro.map((line) => (
                        <span
                          key={line}
                          className="inline-flex items-center rounded-full border border-white/8 bg-white/3 px-3 py-1 text-sm text-muted backdrop-blur-xl"
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {"bullets" in section && section.bullets ? (
                    <ul className="mt-5 space-y-2.5">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-muted">
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(255,56,60,0.35)]">
                            <Icon name="check" size={11} />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <p className="mt-5 text-base leading-relaxed text-muted md:text-[17px]">
                    {section.body}
                  </p>
                </div>

                <div
                  className={cn(
                    "relative",
                    imageLeft && "md:order-first",
                  )}
                >
                  <ParallaxImage strength={36}>
                    <div className={cn("relative transition-transform duration-700 motion-reduce:transform-none", tiltClass)}>
                      {(() => {
                        const media = section.image.src.endsWith(".svg") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            className="block h-auto w-full rounded-xl"
                          />
                        ) : (
                          <Image
                            src={section.image.src}
                            alt={section.image.alt}
                            width={1200}
                            height={800}
                            sizes="(min-width: 768px) 560px, 100vw"
                            className="block h-auto w-full rounded-xl"
                            priority
                            loading="eager"
                          />
                        );
                        const framed = "framed" in section.image && section.image.framed;
                        return framed ? (
                          <div className="rounded-2xl bg-linear-to-b from-accent/18 to-accent/2 p-2 ring-2 ring-accent/65 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),0_0_40px_rgba(255,56,60,0.2)]">
                            <div className="rounded-[14px] border border-dashed border-accent/35 p-1.5">
                              {media}
                            </div>
                          </div>
                        ) : (
                          <div className="drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
                            {media}
                          </div>
                        );
                      })()}
                      {/* Reflection floor */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-6 -bottom-4 h-8 rounded-full blur-2xl"
                        style={{
                          background:
                            "radial-gradient(ellipse, rgba(255,56,60,0.45) 0%, transparent 70%)",
                        }}
                      />
                    </div>
                  </ParallaxImage>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-20 text-center md:mt-28">
          <Link
            href={f.allFeaturesLink.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-muted backdrop-blur-xl transition-all hover:border-accent/60 hover:bg-white/8 hover:text-text hover:shadow-[0_0_30px_rgba(255,56,60,0.25)]"
          >
            {f.allFeaturesLink.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
