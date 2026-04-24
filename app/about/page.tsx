import type { Metadata } from "next";
import Image from "next/image";
import { FaXTwitter, FaBluesky, FaGithub } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { getPageMdx } from "@/lib/mdx";
import { Prose } from "@/components/atoms/Prose";
import { defaultOg } from "@/lib/og";
import { site } from "@/content/site";
import { AboutContactLink } from "@/components/molecules/AboutContactLink";
import { AboutCtaFooter } from "@/components/organisms/AboutCtaFooter";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageMdx("about");
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: "/about/" },
    openGraph: defaultOg({
      title: frontmatter.title,
      description: frontmatter.description,
      url: "https://horacal.app/about/",
    }),
  };
}

const stats: ReadonlyArray<{ value: string; label: string; sub: string }> = [
  { value: "16+", label: "years", sub: "in marketing" },
  { value: "3", label: "big-tech stints", sub: "Samsung · TikTok · Ubisoft" },
  { value: "16k+", label: "lines of Swift", sub: "shipped in 24 months" },
  { value: "1", label: "solo dev", sub: "from Poland, in public" },
];

const contacts: ReadonlyArray<{
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  external?: boolean;
}> = [
  { href: `mailto:${site.contactEmail}`, label: site.contactEmail, Icon: LuMail },
  { href: "https://x.com/moto_szama", label: "@moto_szama", Icon: FaXTwitter, external: true },
  {
    href: "https://bsky.app/profile/szamski.bsky.social",
    label: "@szamski.bsky.social",
    Icon: FaBluesky,
    external: true,
  },
  { href: "https://github.com/szamski", label: "@szamski", Icon: FaGithub, external: true },
];

export default async function AboutPage() {
  const { content } = await getPageMdx("about");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Maciej Szamowski",
    url: "https://horacal.app/about/",
    image: "https://horacal.app/assets/maciej_szamowski.jpg",
    jobTitle: "Independent macOS developer",
    worksFor: { "@id": "https://horacal.app/#organization" },
    nationality: "Polish",
    sameAs: [
      "https://szamowski.dev",
      "https://x.com/moto_szama",
      "https://github.com/szamski",
      "https://bsky.app/profile/szamski.bsky.social",
    ],
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 700px 420px at 15% 20%, rgba(255,56,60,0.22), transparent 65%), " +
              "radial-gradient(ellipse 600px 380px at 85% 40%, rgba(255,115,110,0.14), transparent 65%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-bg" />

        <div className="relative mx-auto max-w-page px-6 pt-16 pb-10 md:pt-24 md:pb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            About
          </span>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
            <div className="relative shrink-0">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full opacity-60 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,56,60,0.45), transparent 70%)",
                }}
              />
              <Image
                src="/assets/maciej_szamowski.jpg"
                alt="Maciej Szamowski"
                width={144}
                height={144}
                className="relative rounded-full border border-white/15 shadow-[0_18px_48px_-16px_rgba(255,56,60,0.45)]"
                priority
              />
            </div>

            <div>
              <h1 className="font-brand text-4xl font-normal leading-[1.2] tracking-tight md:text-[56px]">
                Maciej{" "}
                <span className="inline-block bg-linear-to-br from-accent to-accent-glow bg-clip-text pr-[0.12em] pb-[0.18em] pl-[0.04em] text-transparent">
                  Szamowski
                </span>
              </h1>
              <p className="mt-3 max-w-xl text-lg text-muted md:text-xl">
                Marketer of 16 years. Solo developer of one. Building hora
                Calendar — a native macOS Google Calendar client — from Poland.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {contacts.map(({ href, label, Icon, external }) => (
                  <AboutContactLink
                    key={label}
                    href={href}
                    external={external}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-muted backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-accent/40 hover:bg-white/6 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Icon size={12} aria-hidden />
                    {label}
                  </AboutContactLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-page px-6 pb-12 md:pb-16">
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map(({ value, label, sub }) => (
            <div
              key={label}
              className="group relative rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_-28px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/6 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_28px_52px_-22px_rgba(255,56,60,0.28)]"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                {label}
              </dt>
              <dd className="mt-2 font-brand text-3xl font-normal leading-none md:text-4xl">
                <span className="inline-block bg-linear-to-br from-accent to-accent-glow bg-clip-text pr-[0.18em] pb-[0.12em] pl-[0.04em] tracking-[0.04em] text-transparent">
                  {value}
                </span>
              </dd>
              <p className="mt-2 text-xs text-muted">{sub}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* PULL QUOTE */}
      <section className="mx-auto max-w-page px-6 pb-12 md:pb-16">
        <figure className="relative overflow-hidden rounded-3xl border border-accent/20 p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 600px 280px at 50% 0%, rgba(255,56,60,0.22), rgba(255,56,60,0.04) 60%), #140a0a",
            }}
          />
          <blockquote className="relative">
            <p className="font-brand text-2xl leading-tight tracking-tight text-text md:text-[32px]">
              “The Mac calendar Google never built.
              <br />
              <span className="inline-block bg-linear-to-br from-accent to-accent-glow bg-clip-text pr-[0.12em] pb-[0.12em] pl-[0.04em] text-transparent">
                Shipped by one person, in public, from Poland.
              </span>
              ”
            </p>
          </blockquote>
        </figure>
      </section>

      {/* BODY */}
      <article className="mx-auto max-w-page px-6 pb-12 md:pb-16">
        <Prose>{content}</Prose>
      </article>

      {/* CTA FOOTER */}
      <AboutCtaFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
