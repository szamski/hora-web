import Link from "next/link";
import { PostCard, type PostCardData } from "@/components/molecules/PostCard";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";

export function BlogPreview({ posts }: { posts: readonly PostCardData[] }) {
  if (posts.length === 0) return null;
  const b = home.blogPreview;

  return (
    <section id="blog" className="mx-auto max-w-page px-6 py-16 md:py-20">
      <SectionHeading heading={b.heading} subtitle={b.subtitle} className="mb-10" />
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <p className="mt-8 text-center">
        <Link
          href={b.allPostsLink.href}
          className="text-sm text-muted transition-colors hover:text-text"
        >
          {b.allPostsLink.label}
        </Link>
      </p>
    </section>
  );
}
