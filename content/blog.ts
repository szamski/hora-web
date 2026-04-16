export const blog = {
  seo: {
    title: "Blog",
    description:
      "Updates, dev logs, and announcements from building hora Calendar — a native macOS Google Calendar client.",
    ogTitle: "hora Calendar Blog — Building a native macOS calendar in public",
    ogDescription:
      "Updates, dev logs, and announcements from building hora.",
  },
  heading: { prefix: "hora", suffixGradient: "Blog" },
  subtitle: "Updates, dev logs, and announcements.",
  rss: { label: "RSS feed", href: "/blog/feed.xml" },
  footerCta: {
    heading: "Stay in the loop",
    subtitle: "Get notified when hora launches. No spam.",
    followLabel: "OR FOLLOW ALONG",
    socials: [
      { label: "@moto_szama", href: "https://x.com/moto_szama", icon: "x" as const },
      { label: "Star on GitHub", href: "https://github.com/szamski/hora-web", icon: "github" as const },
    ],
  },
} as const;

export type Blog = typeof blog;
