import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/atoms/Tag";
import { cn } from "@/lib/cn";

export type PostCardData = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: readonly string[];
  cover?: string;
};

export type PostCardVariant = "hero" | "standard" | "list";

export function PostCard({
  post,
  variant = "standard",
  className,
}: {
  post: PostCardData;
  variant?: PostCardVariant;
  className?: string;
}) {
  const isHero = variant === "hero";
  const isList = variant === "list";

  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={cn(
        "group block overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-[#2a2a2a]",
        className,
      )}
    >
      {post.cover && !isList ? (
        <div
          className={cn(
            "relative w-full overflow-hidden border-b border-border bg-bg",
            isHero ? "aspect-[2/1]" : "aspect-[16/9]",
          )}
        >
          <Image
            src={post.cover}
            alt=""
            fill
            sizes={isHero ? "(min-width: 768px) 720px, 100vw" : "(min-width: 768px) 480px, 100vw"}
            className="object-cover"
            priority={isHero}
          />
        </div>
      ) : null}
      <div
        className={cn(
          "space-y-2",
          isHero ? "p-7 md:p-8" : isList ? "p-6" : "p-6",
        )}
      >
        <p className="text-xs text-muted">{post.date}</p>
        <h3
          className={cn(
            "font-semibold tracking-tight text-text transition-colors group-hover:text-accent",
            isHero ? "text-2xl md:text-3xl" : "text-lg",
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "text-muted leading-relaxed",
            isHero || isList ? "text-sm md:text-base" : "text-sm line-clamp-3",
          )}
        >
          {post.description}
        </p>
        {post.tags && post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {post.tags.slice(0, 6).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
