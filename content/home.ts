export const home = {
  seo: {
    title: "hora Calendar — Native macOS Google Calendar Client",
    description:
      "The Mac calendar Google never built. Fast, native, private — designed for people who find Apple Calendar too limited and everything else too much.",
    ogTitle: "hora Calendar — The Mac calendar Google never built",
    ogDescription:
      "Fast. Native. Private. A native macOS calendar designed to feel right — not overloaded, not limited.",
  },

  hero: {
    iconSrc: "/assets/hora-icon.png",
    title: { prefix: "hora", suffixGradient: "Calendar" },
    tagline: "The Mac calendar Google never built.",
    pillars: ["Fast", "Native", "Private"],
    descriptor:
      "Built for people who find Apple Calendar too limited — and everything else too much.",
    personalNote: [
      "I've been using calendar apps for years, and they always felt off.",
      "Too simple. Too complex. Too slow.",
      "So I started building my own.",
      "hora is a native macOS calendar designed to feel right.",
      "Not overloaded, not limited.",
    ],
    newsletter: {
      placeholder: "you@email.com",
      button: "Join the Waitlist",
      hint: "Be first to know when we launch",
      githubLabel: "Star on GitHub",
      githubHref: "https://github.com/szamski/hora-web",
    },
    demo: {
      videoSrc: "/assets/hora-demo.mp4",
      posterSrc: "/assets/hora-demo-poster.webp",
      captionsSrc: "/assets/hora-demo.vtt",
      ariaLabel:
        "hora Calendar demo showing week view, event creation, and calendar navigation",
    },
  },

  features: {
    heading: { prefix: "Native macOS Calendar", suffixGradient: "Features" },
    sections: [
      {
        title: "Feels like a real Mac app. Because it is.",
        intro: ["Opens instantly.", "Scrolls smoothly.", "No Electron. No web views."],
        body: "Just a fast, lightweight calendar that respects your system.",
      },
      {
        title: "Plan your day without friction.",
        bullets: [
          "Week and month views with smooth transitions",
          "Drag & drop to create and reschedule events",
          "Resize events directly on the timeline",
          "Fast search across all your calendars",
        ],
        body: "Everything stays simple — even as your schedule grows.",
      },
      {
        title: "Your next meeting. Always visible.",
        body: "See what's coming up directly from the menu bar and join in one click. No opening apps. No searching. No context switching.",
      },
      {
        title: "Works with Google Calendar — without the usual friction.",
        bullets: [
          "Multiple Google accounts",
          "Color-coded calendars",
          "Add and join meetings via links (Meet, Zoom, Teams)",
        ],
        body: "Everything stays in sync, without getting in your way.",
      },
      {
        title: "Built for speed.",
        body: "Use familiar Google Calendar-style shortcuts to navigate, create, and search. Stay in flow — without reaching for the mouse.",
      },
      {
        title: "Your data stays between you and Google.",
        intro: [
          "No servers.",
          "No tracking.",
          "No data stored outside your device.",
        ],
        body: "Just a direct connection to Google Calendar.",
      },
    ],
    allFeaturesLink: {
      label: "See all features in detail →",
      href: "/features/",
    },
  },

  whyHora: {
    heading: { prefix: "Why", suffixGradient: "hora?" },
    positioning: [
      "Apple Calendar is too limited.",
      "Fantastical is too much.",
      "Hora aims for the balance.",
    ],
    bio: [
      "Still in development. Actively tested and improved.",
      "Built by me — a solo developer.",
      "Shaped by real usage, not feature checklists.",
    ],
  },

  betaCta: {
    heading: "Want to try it early?",
    subtitle: "Join the beta and help shape the product.",
    note: "Early access via TestFlight.",
    button: { label: "Join the beta", href: "#newsletter" },
    footnote:
      "If you've ever felt like your calendar is either too simple or too complex, you'll probably understand why hora exists.",
  },

  roadmap: {
    heading: { prefix: "What's", suffixGradient: "Next" },
    items: [
      {
        n: 1,
        title: "Mac App Store Launch",
        description:
          "Final QA sprint, macOS 27 compatibility, performance optimization.",
      },
      {
        n: 2,
        title: "iOS & iPadOS App",
        description:
          "A native companion app for iPhone and iPad. Same SwiftUI foundation, designed for touch.",
      },
      {
        n: 3,
        title: "Apple Intelligence",
        description:
          "Smart scheduling, focus time planning, and meeting prep briefings powered by on-device intelligence.",
      },
      {
        n: 4,
        title: "Google Workspace",
        description:
          "Gmail context for meetings, contact enrichment, and deeper Google ecosystem integration.",
      },
    ],
  },

  faq: {
    heading: { prefix: "Frequently", suffixGradient: "Asked Questions" },
    items: [
      {
        q: "What is hora Calendar?",
        a: "hora is a native macOS desktop app for Google Calendar. It connects directly to the Google Calendar API — no CalDAV, no web views, no Electron. Built entirely in SwiftUI for speed and a native feel.",
      },
      {
        q: "Who is hora for?",
        a: "Anyone on macOS who uses Google Calendar and wants a faster, keyboard-friendly experience. It's especially useful if you manage multiple Google accounts or prefer native apps over browser tabs.",
      },
      {
        q: "How is hora different from Fantastical or Cron?",
        a: "hora focuses exclusively on Google Calendar and uses the official API for direct access. There's no CalDAV translation layer, which means faster sync and full feature support like Google Meet link creation. It's also built purely in SwiftUI with no Electron or web technologies.",
      },
      {
        q: "Is hora free?",
        a: "Pricing hasn't been finalized yet. The goal is to keep it accessible. Subscribe to the newsletter to be the first to know about pricing and launch details.",
      },
      {
        q: "When does hora launch?",
        a: "hora is currently in pre-launch development. A public beta is planned — sign up for the newsletter above to get notified when it's available.",
      },
      {
        q: "Does hora work with Outlook or iCloud calendars?",
        a: "Not at the moment. hora is built specifically for Google Calendar. Support for other providers may come in the future, but the focus right now is on making the best possible Google Calendar experience on macOS.",
      },
    ],
  },

  blogPreview: {
    heading: { prefix: "From the", suffixGradient: "Blog" },
    subtitle:
      "Building hora in public. Updates, dev logs, and honest progress reports.",
    allPostsLink: { label: "View all posts →", href: "/blog/" },
  },
} as const;

export type Home = typeof home;
