import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const base = site.url;
  const today = new Date().toISOString().split("T")[0];
  const latestPostDate = posts[0]?.frontmatter.date ?? today;

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}/`,
    lastModified: p.frontmatter.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/blog/`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postEntries,
    {
      url: `${base}/features/`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/testflight/`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/about/`,
      lastModified: "2026-04-24",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/privacy/`,
      lastModified: "2026-03-25",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms/`,
      lastModified: "2026-03-25",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
