import { getAllPosts } from "@/lib/mdx";
import { site } from "@/content/site";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map((post) => {
      const { slug, frontmatter } = post;
      const url = `${site.url}/blog/${slug}/`;
      return `    <item>
      <title>${escapeXml(frontmatter.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(frontmatter.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.brand.name}</title>
    <link>${site.url}/blog/</link>
    <description>Building hora in public. Dev logs, technical deep dives, and honest progress reports.</description>
    <language>en-us</language>
    <atom:link href="${site.url}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
