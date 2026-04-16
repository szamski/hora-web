import type { Metadata } from "next";
import { PostCard, type PostCardData } from "@/components/molecules/PostCard";
import { SectionHeading } from "@/components/atoms/SectionHeading";
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
  const cardData: PostCardData[] = posts.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    date: p.frontmatter.date,
    tags: p.frontmatter.tags,
    cover: p.frontmatter.cover,
  }));
  const [hero, ...rest] = cardData;

  return (
    <section className="mx-auto max-w-[960px] px-6 py-16 md:py-20">
      <SectionHeading
        heading={blog.heading}
        subtitle={blog.subtitle}
        className="mb-12"
        as="h1"
      />
      {posts.length === 0 ? (
        <p className="text-center text-muted">No posts yet.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {hero ? <PostCard post={hero} variant="hero" /> : null}
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
