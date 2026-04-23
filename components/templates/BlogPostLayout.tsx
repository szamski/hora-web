import Link from "next/link";
import { Prose } from "@/components/atoms/Prose";
import { Tag } from "@/components/atoms/Tag";
import { StayInLoopCta } from "@/components/organisms/StayInLoopCta";
import type { PostFrontmatter, PostMeta } from "@/lib/mdx";

type Adjacent = Pick<PostMeta, "slug"> & { title: string };

export function BlogPostLayout({
  frontmatter,
  previous,
  next,
  children,
}: {
  frontmatter: PostFrontmatter;
  previous?: Adjacent | null;
  next?: Adjacent | null;
  children: React.ReactNode;
}) {
  return (
    <>
      <article className="mx-auto max-w-page px-6 py-12 md:py-16">
        <Link
          href="/blog/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
        >
          ← All posts
        </Link>

        <p className="text-sm text-muted">{frontmatter.date}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-text md:text-4xl">
          {frontmatter.title}
        </h1>

        {frontmatter.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {frontmatter.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}

        <Prose className="mt-10">{children}</Prose>

        {previous || next ? (
          <nav
            aria-label="More posts"
            className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/blog/${previous.slug}/`}
                className="group rounded-xl border border-border bg-white/2 p-5 transition-colors hover:border-accent/40 hover:bg-white/4"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  ← Previous
                </span>
                <span className="mt-2 block text-base font-semibold text-text group-hover:text-accent">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}/`}
                className="group rounded-xl border border-border bg-white/2 p-5 text-right transition-colors hover:border-accent/40 hover:bg-white/4 sm:text-right"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Next →
                </span>
                <span className="mt-2 block text-base font-semibold text-text group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        ) : null}
      </article>

      <StayInLoopCta />
    </>
  );
}
