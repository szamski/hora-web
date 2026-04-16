import type { Metadata } from "next";
import { PostCard, type PostCardData } from "@/components/molecules/PostCard";
import { GradientText } from "@/components/atoms/GradientText";
import { StayInLoopCta } from "@/components/organisms/StayInLoopCta";
import { blog } from "@/content/blog";
import { getAllPosts } from "@/lib/mdx";

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
      <section className="mx-auto max-w-prose px-6 pt-12 md:pt-16">
        <h1 className="font-brand text-4xl font-normal tracking-tight md:text-5xl">
          {blog.heading.prefix}{" "}
          <GradientText>{blog.heading.suffixGradient}</GradientText>
        </h1>
        <p className="mt-2 text-muted">{blog.subtitle}</p>
      </section>

      <section className="mx-auto max-w-prose px-6 py-10">
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
