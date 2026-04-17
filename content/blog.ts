export const blog = {
  seo: {
    title: "Blog",
    description:
      "Updates, dev logs, and announcements from building hora Calendar — a native macOS Google Calendar client.",
    ogTitle: "hora Calendar Blog — Building a native macOS calendar in public",
    ogDescription:
      "Updates, dev logs, and announcements from building hora.",
  },
  eyebrow: "Building in public",
  heading: { prefix: "hora", suffixGradient: "Blog" },
  subtitle:
    "Updates, dev logs, and announcements from shipping a native macOS calendar.",
  rss: { label: "RSS feed", href: "/blog/feed.xml" },
  footerCta: {
    eyebrow: "Stay in the loop",
    heading: "Get launch updates.",
    subtitle: "Be first to know when hora launches. No spam.",
    cardHeadline: "Skip the refresh cycle.",
    cardSubheadline:
      "Drop your email, get the invite the moment hora ships.",
  },
} as const;

export type Blog = typeof blog;
