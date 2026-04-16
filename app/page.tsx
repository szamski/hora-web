import Script from "next/script";
import { Hero } from "@/components/organisms/Hero";
import { FeaturesGrid } from "@/components/organisms/FeaturesGrid";
import { Journey } from "@/components/organisms/Journey";
import { Faq } from "@/components/organisms/Faq";
import { BlogPreview } from "@/components/organisms/BlogPreview";
import type { PostCardData } from "@/components/molecules/PostCard";
import { getAllPosts } from "@/lib/mdx";

const softwareAppLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "hora Calendar",
  description:
    "Native macOS client for Google Calendar. Built with SwiftUI. No Electron. No CalDAV. Just fast.",
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
  sameAs: ["https://x.com/moto_szama", "https://github.com/szamski"],
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
      <FeaturesGrid />
      <Journey />
      <Faq />
      <BlogPreview posts={posts} />
      <Script
        id="software-app-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }}
      />
      <Script
        id="person-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
    </>
  );
}
