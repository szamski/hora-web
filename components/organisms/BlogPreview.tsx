import Link from "next/link";
import { PostCard, type PostCardData } from "@/components/molecules/PostCard";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";

export function BlogPreview({ posts }: { posts: readonly PostCardData[] }) {
  if (posts.length === 0) return null;
  const b = home.blogPreview;

  return (
    <section id="blog" className="relative overflow-hidden py-24 md:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 80% 0%, rgba(255,56,60,0.10), transparent 65%)," +
            "radial-gradient(ellipse 800px 500px at 20% 100%, rgba(255,115,110,0.07), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 50%, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,60,0.95)]" />
            {b.eyebrow}
          </span>
          <div className="mt-5">
            <SectionHeading heading={b.heading} />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted md:text-lg">
            {b.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center md:mt-16">
          <Link
            href={b.allPostsLink.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-muted backdrop-blur-xl transition-all hover:border-accent/60 hover:bg-white/8 hover:text-text hover:shadow-[0_0_30px_rgba(255,56,60,0.25)]"
          >
            {b.allPostsLink.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
