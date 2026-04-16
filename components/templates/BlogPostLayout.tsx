import Image from "next/image";
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
      <article className="mx-auto max-w-[var(--container-prose)] px-6 py-16 md:py-20">
        <Link
          href="/blog/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
        >
          ← All posts
        </Link>

        <p className="text-sm text-muted">{frontmatter.date}</p>
        <h1 className="mt-2 font-brand text-3xl font-normal leading-tight tracking-tight md:text-5xl">
          {frontmatter.title}
        </h1>

        {frontmatter.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {frontmatter.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}

        {frontmatter.cover ? (
          <div className="relative mt-8 overflow-hidden rounded-xl border border-border">
            <Image
              src={frontmatter.cover}
              alt=""
              width={1600}
              height={900}
              priority
              sizes="(min-width: 768px) 720px, 100vw"
              className="h-auto w-full"
            />
          </div>
        ) : null}

        <Prose className="mt-10">{children}</Prose>
      </article>

      <CtaBlock />
    </>
  );
}
