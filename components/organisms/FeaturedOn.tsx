import { home } from "@/content/home";

export function FeaturedOn() {
  const f = home.featuredOn;

  return (
    <section
      aria-label={f.label}
      className="relative overflow-hidden py-12 md:py-16"
    >
      {/* Ambient glow — ties the strip into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 220px at 50% 50%, rgba(255,56,60,0.08), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 70% 90% at 50% 50%, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-6">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted/70">
            {f.label}
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {f.badges.map((badge) => (
              <li key={badge.href} className="flex items-center">
                <a
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    width={badge.width}
                    height={badge.height}
                    loading="lazy"
                    decoding="async"
                    className="block h-11 w-auto md:h-13.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
