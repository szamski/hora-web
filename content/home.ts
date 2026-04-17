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
    newsletter: {
      placeholder: "you@email.com",
      button: "Join the TestFlight",
      hint: "Be first to know when we launch",
      githubLabel: "Star on GitHub",
      githubHref: "https://github.com/szamski/hora-web",
      twitterLabel: "Follow @moto_szama on X",
      twitterHref: "https://x.com/moto_szama",
      eyebrow: "Worth the click",
      headline: "Get in before launch.",
      subheadline:
        "When hora goes live, you'll get the invite — and a founding‑user discount — before anyone else.",
      socialProof: {
        count: 842,
        label: "Mac folks already on the Beta TestFlight waitlist",
        avatars: [
          {
            src: "https://randomuser.me/api/portraits/thumb/men/32.jpg",
            alt: "Waitlist member avatar",
          },
          {
            src: "https://randomuser.me/api/portraits/thumb/women/44.jpg",
            alt: "Waitlist member avatar",
          },
          {
            src: "https://randomuser.me/api/portraits/thumb/men/86.jpg",
            alt: "Waitlist member avatar",
          },
          {
            src: "https://randomuser.me/api/portraits/thumb/women/12.jpg",
            alt: "Waitlist member avatar",
          },
          {
            src: "https://randomuser.me/api/portraits/thumb/men/67.jpg",
            alt: "Waitlist member avatar",
          },
        ],
      },
    },
    demo: {
      videoSources: [
        { src: "/assets/horus_demo_new.webm", type: "video/webm" },
        { src: "/assets/hora_demo_new.mp4", type: "video/mp4" },
      ],
      posterSrc: "/assets/hero_demo_new.webp",
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
        image: {
          src: "/assets/hero_features/native.webp",
          alt: "hora Calendar week and month views",
          framed: true,
        },
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
        image: {
          src: "/assets/hero_features/planning.webp",
          alt: "Creating and editing events in hora",
          framed: true,
        },
      },
      {
        title: "Your next meeting. Always visible.",
        body: "See what's coming up directly from the menu bar and join in one click. No opening apps. No searching. No context switching.",
        image: {
          src: "/assets/hero_features/menubar.webp",
          alt: "hora menu bar widget showing upcoming meeting",
          framed: true,
        },
      },
      {
        title: "Works with Google Calendar — without the usual friction.",
        bullets: [
          "Multiple Google accounts",
          "Color-coded calendars",
          "Add and join meetings via links (Meet, Zoom, Teams)",
        ],
        body: "Everything stays in sync, without getting in your way.",
        image: {
          src: "/assets/hero_features/google.webp",
          alt: "Multi-account Google Calendar sync in hora",
          framed: true,
        },
      },
      {
        title: "Built for speed.",
        body: "Use familiar Google Calendar-style shortcuts to navigate, create, and search. Stay in flow — without reaching for the mouse.",
        image: {
          src: "/assets/hero_features/speed.svg",
          alt: "Command key — symbolizing Google Calendar-style keyboard shortcuts",
        },
      },
      {
        title: "Your data stays between you and Google.",
        intro: [
          "No servers.",
          "No tracking.",
          "No data stored outside your device.",
        ],
        body: "Just a direct connection to Google Calendar.",
        image: {
          src: "/assets/hero_features/privacy.svg",
          alt: "A shield encapsulating your Mac and Google Calendar — symbolizing a direct, protected connection with no middleware",
        },
      },
    ],
    allFeaturesLink: {
      label: "See all features in detail →",
      href: "/features/",
    },
  },

  whyHora: {
    eyebrow: "Just right",
    heading: { prefix: "Why", suffixGradient: "hora?" },
    descriptor:
      "Built for people who find Apple Calendar too limited — and everything else too much.",
    comparison: [
      { name: "Apple Calendar", tag: "Too limited", tone: "muted" as const },
      { name: "Fantastical", tag: "Too much", tone: "muted" as const },
      { name: "hora Calendar", tag: "Just right", tone: "accent" as const },
    ],
    climax: {
      prefix: "hora Calendar aims for the",
      highlight: "balance",
      suffix: ".",
    },
    personalNote: [
      "I've been using calendar apps for years, and they always felt off.",
      "Too simple. Too complex. Too slow.",
      "So I started building my own.",
      "hora is a native macOS calendar designed to feel right.",
    ],
    personalNoteAuthor: {
      name: "Maciej",
      role: "Founder & Developer",
    },
    bio: [
      { icon: "testflight" as const, text: "Live in TestFlight beta" },
      { icon: "edit" as const, text: "Shaped by real usage, not checklists" },
      { icon: "shield" as const, text: "Privacy-first by default" },
    ],
  },

  betaCta: {
    eyebrow: "Beta access",
    heading: "Want to try it early?",
    subtitle: "Join the beta and help shape the product.",
    note: "Early access via TestFlight.",
    cardEyebrow: "Join the TestFlight",
    cardHeadline: "Be a founding user.",
    cardSubheadline:
      "Drop your email, get the invite, and help shape the first cut of hora.",
    footnote:
      "If you've ever felt like your calendar is either too simple or too complex, you'll probably understand why hora exists.",
  },

  roadmap: {
    eyebrow: "The roadmap",
    heading: { prefix: "What's", suffixGradient: "Next" },
    subtitle:
      "Where hora is going. Shipped when it's ready, not when it's scheduled.",
    items: [
      {
        n: 1,
        status: "Open Beta Tests" as const,
        title: "TestFlight Launch",
        description:
          "Final QA sprint, performance tuning, stability checks.",
      },
      {
        n: 2,
        status: "Up next" as const,
        title: "Apple Intelligence",
        description:
          "Quick-add with Natural Language, Focus Time Planning, quality of life improvements powered by on-device ML.",
      },
      {
        n: 3,
        status: "Planned" as const,
        title: "iOS & iPadOS App",
        description:
          "A native companion app for iPhone and iPad. Same SwiftUI foundation, designed for touch.",
      },
      {
        n: 4,
        status: "On the horizon" as const,
        title: "Google Workspace",
        description:
          "Gmail context for meetings, contact enrichment, and deeper Google ecosystem integration.",
      },
    ],
  },

  faq: {
    eyebrow: "Good to know",
    heading: { prefix: "Frequently", suffixGradient: "Asked Questions" },
    subtitle:
      "Short answers to the things people ask before joining the beta.",
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
    eyebrow: "From the build log",
    heading: { prefix: "From the", suffixGradient: "Blog" },
    subtitle:
      "Building hora in public. Updates, dev logs, and honest progress reports.",
    allPostsLink: { label: "View all posts →", href: "/blog/" },
  },
} as const;

export type Home = typeof home;
