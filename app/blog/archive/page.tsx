import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { StayInLoopCta } from "@/components/organisms/StayInLoopCta";
import { getMonthlyArchives } from "@/lib/blog";
import { breadcrumbList } from "@/lib/jsonld";
import { getAllPosts } from "@/lib/mdx";
import { defaultOg } from "@/lib/og";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Blog Archive",
  description: "Browse hora Calendar blog posts by month.",
  alternates: { canonical: "/blog/archive/" },
  openGraph: defaultOg({
    title: "hora Calendar Blog Archive",
    description: "Browse hora Calendar blog posts by month.",
    url: "https://horacal.app/blog/archive/",
  }),
};

export default async function BlogArchiveIndexPage() {
  const posts = await getAllPosts();
  const archives = getMonthlyArchives(posts);
  const breadcrumbs = breadcrumbList([
    { name: "Home", url: "https://horacal.app/" },
    { name: "Blog", url: "https://horacal.app/blog/" },
    { name: "Archive", url: "https://horacal.app/blog/archive/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <section className="mx-auto max-w-page px-6 pt-16 md:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            Blog archive
          </span>
          <div className="mt-5">
            <SectionHeading
              heading={{ prefix: "Monthly", suffixGradient: "Archive" }}
              as="h1"
            />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted md:text-lg">
            Browse every hora Calendar update by month.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        <div className="flex flex-col gap-3">
          {archives.map((archive) => (
            <Link
              key={archive.slug}
              href={archive.href}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/4 px-5 py-4 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-accent/35 hover:text-text"
            >
              <span className="font-medium">{archive.label}</span>
              <span className="text-sm">{archive.count} posts</span>
            </Link>
          ))}
        </div>
      </section>

      <StayInLoopCta />
    </>
  );
}
