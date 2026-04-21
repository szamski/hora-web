import type { Metadata } from "next";
import { PostCard, type PostCardData } from "@/components/molecules/PostCard";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { StayInLoopCta } from "@/components/organisms/StayInLoopCta";
import { blog } from "@/content/blog";
import { getAllPosts } from "@/lib/mdx";

export const revalidate = 600;

export const metadata: Metadata = {
  title: blog.seo.title,
  description: blog.seo.description,
  alternates: {
    canonical: "/blog/",
    types: {
      "application/rss+xml": [
        { url: "/blog/feed.xml", title: "hora Calendar Blog" },
      ],
    },
  },
  openGraph: {
    title: blog.seo.ogTitle,
    description: blog.seo.ogDescription,
    url: "https://horacal.app/blog/",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const cards: PostCardData[] = posts.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    date: p.frontmatter.date,
    tags: p.frontmatter.tags,
    cover: p.frontmatter.cover,
  }));
  const [hero, ...rest] = cards;

  return (
    <>
      <section className="mx-auto max-w-page px-6 pt-16 md:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            {blog.eyebrow}
          </span>
          <div className="mt-5">
            <SectionHeading heading={blog.heading} as="h1" />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted md:text-lg">
            {blog.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 py-12 md:py-16">
        {posts.length === 0 ? (
          <p className="text-center text-muted">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {hero ? <PostCard post={hero} variant="hero" /> : null}
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} variant="list" />
            ))}
          </div>
        )}
      </section>

      <StayInLoopCta />
    </>
  );
}
