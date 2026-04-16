import Link from "next/link";
import { PostCard, type PostCardData } from "@/components/molecules/PostCard";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";

export function BlogPreview({ posts }: { posts: readonly PostCardData[] }) {
  if (posts.length === 0) return null;
  const b = home.blogPreview;
  const [hero, ...rest] = posts;

  return (
    <section id="blog" className="mx-auto max-w-[960px] px-6 py-16 md:py-24">
      <SectionHeading heading={b.heading} subtitle={b.subtitle} className="mb-12" />
      <div className="grid gap-5 md:grid-cols-2">
        {hero ? <PostCard post={hero} variant="hero" /> : null}
        {rest.map((post) => (
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
