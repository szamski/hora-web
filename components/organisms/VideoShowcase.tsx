import { SectionHeading } from "@/components/atoms/SectionHeading";
import { VideoShowcaseMedia } from "@/components/organisms/VideoShowcaseMedia";
import { home } from "@/content/home";

const YT_VIDEO_ID = "ahVV5J25cYM";

export function VideoShowcase() {
  const v = home.videoShowcase;
  const demo = home.hero.demo;

  return (
    <section id="watch" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 50%, black 40%, transparent 90%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 8% 0%, rgba(255,56,60,0.18), transparent 65%)," +
            "radial-gradient(ellipse 800px 500px at 92% 100%, rgba(255,115,110,0.14), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            {v.eyebrow}
          </span>
          <div className="mt-5">
            <SectionHeading heading={v.heading} />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted md:text-lg">
            {v.description}
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl md:mt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[28px] blur-3xl md:-inset-10"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 55%, rgba(255,56,60,0.2), transparent 70%)",
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-16 -bottom-3 h-8 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,56,60,0.4) 0%, transparent 70%)",
            }}
          />

          <VideoShowcaseMedia
            videoId={YT_VIDEO_ID}
            ariaLabel={demo.ariaLabel}
          />

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-10 md:gap-3">
            {v.highlights.map((h) => (
              <li
                key={h}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 text-xs text-muted backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:text-sm"
              >
                <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_rgba(255,56,60,0.85)]" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
