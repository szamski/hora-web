export const site = {
  brand: {
    name: "hora Calendar",
    shortName: "Calendar",
    tagline: "The Google Calendar client that macOS deserves.",
    logoSrc: "/assets/hora-icon.png",
  },
  url: "https://horacal.app",
  author: {
    name: "Maciej Szamowski",
    url: "https://szamowski.dev",
    twitter: "@moto_szama",
    github: "https://github.com/szamski",
  },
  nav: [
    { label: "Features", href: "/features/" },
    { label: "Roadmap", href: "/#roadmap" },
    { label: "Blog", href: "/blog/" },
  ],
  cta: {
    primary: { label: "Join the TestFlight", href: "/" },
  },
  footer: {
    copyright: "© 2026 hora Calendar",
    developedBy: { label: "szamowski.dev", href: "https://szamowski.dev" },
    links: [
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
    ],
    socials: [
      { label: "Email", href: "mailto:hello@horacal.app", icon: "mail" },
      { label: "GitHub", href: "https://github.com/szamski/hora-web", icon: "github" },
      { label: "X / Twitter", href: "https://x.com/moto_szama", icon: "x" },
    ],
  },
  defaultOg: "/assets/og-image.png",
  contactEmail: "hello@horacal.app",
  newsletter: {
    endpoint: "/api/subscribe",
  },
  cookieBanner: {
    message:
      "We use Google Ads and Google Analytics cookies to measure campaign performance and site usage. Plausible (cookieless) analytics runs regardless.",
    privacyLink: { label: "Privacy Policy", href: "/privacy/" },
    accept: "Accept",
    decline: "Decline",
  },
} as const;

export type Site = typeof site;
