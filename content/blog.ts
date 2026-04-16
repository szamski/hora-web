export const blog = {
  seo: {
    title: "Blog",
    description:
      "Dev logs, technical deep dives, and honest progress reports from building hora Calendar — a native macOS Google Calendar client.",
    ogTitle: "hora Calendar Blog — Building a native macOS calendar in public",
    ogDescription:
      "Dev logs, technical deep dives, and honest progress reports from building hora.",
  },
  heading: { prefix: "Dev", suffixGradient: "Log" },
  subtitle:
    "Building hora in public. Technical deep dives, shipping updates, and lessons learned.",
  rss: { label: "RSS feed", href: "/blog/feed.xml" },
} as const;

export type Blog = typeof blog;
