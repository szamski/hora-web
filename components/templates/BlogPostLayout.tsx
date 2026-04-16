import Link from "next/link";
import { Prose } from "@/components/atoms/Prose";
import { Tag } from "@/components/atoms/Tag";
import { CtaBlock } from "@/components/organisms/CtaBlock";
import type { PostFrontmatter } from "@/lib/mdx";

export function BlogPostLayout({
  frontmatter,
  children,
}: {
  frontmatter: PostFrontmatter;
  children: React.ReactNode;
}) {
  return (
    <>
      <article className="mx-auto max-w-article px-6 py-12 md:py-16">
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
      </article>

      <CtaBlock />
    </>
  );
}
