import { Hero } from "@/components/organisms/Hero";
import { VideoShowcase } from "@/components/organisms/VideoShowcase";
import { FeaturesStory } from "@/components/organisms/FeaturesStory";
import { WhyHora } from "@/components/organisms/WhyHora";
import { BetaCta } from "@/components/organisms/BetaCta";
import { Roadmap } from "@/components/organisms/Roadmap";
import { Faq } from "@/components/organisms/Faq";
import { BlogPreview } from "@/components/organisms/BlogPreview";
import type { PostCardData } from "@/components/molecules/PostCard";
import { getAllPosts } from "@/lib/mdx";

export const revalidate = 600;

const softwareAppLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "hora Calendar",
  description:
    "The Mac calendar Google never built. Fast, native, private — a native macOS Google Calendar client built with SwiftUI.",
  url: "https://horacal.app",
  applicationCategory: "BusinessApplication",
  operatingSystem: "macOS",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: {
    "@type": "Person",
    name: "Maciej Szamowski",
    url: "https://szamowski.dev",
  },
  image: "https://horacal.app/assets/hora-icon.png",
  screenshot: "https://horacal.app/assets/hora-demo.gif",
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Maciej Szamowski",
  url: "https://szamowski.dev",
  sameAs: [
    "https://x.com/moto_szama",
    "https://bsky.app/profile/szamski.bsky.social",
    "https://github.com/szamski",
  ],
};

export default async function Home() {
  const allPosts = await getAllPosts();
  const posts: PostCardData[] = allPosts.slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    date: p.frontmatter.date,
    tags: p.frontmatter.tags,
    cover: p.frontmatter.cover,
  }));

  return (
    <>
      <Hero />
      <VideoShowcase />
      <FeaturesStory />
      <WhyHora />
      <BetaCta />
      <Roadmap />
      <Faq />
      <BlogPreview posts={posts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
    </>
  );
}
