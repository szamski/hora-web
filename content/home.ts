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
    newsletter: {
      placeholder: "you@email.com",
      button: "Sign up for TestFlight",
      hint: "Support this project on GitHub",
      githubLabel: "Star on GitHub",
      githubHref: "https://github.com/szamski/hora-web",
      eyebrow: "Worth the click",
      headline: "Get in before launch.",
      subheadline:
        "When hora goes live, you'll get the invite — and a founding‑user discount — before anyone else.",
      watchDemoCtaLabel: "Watch the demo",
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
      posterSrc: "/assets/hero_image.webp",
      captionsSrc: "/assets/hora-demo.vtt",
      ariaLabel:
        "hora Calendar demo showing week view, event creation, and calendar navigation",
    },
  },

  videoShowcase: {
    eyebrow: "See it in action",
    heading: { prefix: "Watch", suffixGradient: "hora" },
    description: "A video tour of how hora Calendar feels on macOS.",
    highlights: [
      "Day, week, and month views",
      "Drag & drop",
      "Create, Edit, Reschedule",
      "Focus on what's next",
    ],
    unmuteLabel: "Unmute sound",
    muteLabel: "Mute sound",
    enlargeLabel: "Enlarge",
    minimizeLabel: "Exit fullscreen",
  },

  features: {
    eyebrow: "Built for Mac",
    heading: { prefix: "Native macOS Calendar", suffixGradient: "Features" },
    description:
      "Six things nobody else quite gets right on macOS. Here's how hora does them.",
    items: [
      {
        icon: "app-window" as const,
        title: "Feels like a real Mac app",
        body: "Opens instantly. Scrolls smoothly. No Electron, no web views — just native SwiftUI.",
      },
      {
        icon: "calendar" as const,
        title: "Plan without friction",
        body: "Week and month views with drag-and-drop, timeline resize, and fast search across all calendars.",
      },
      {
        icon: "bell" as const,
        title: "Next meeting. Always visible.",
        body: "See what's coming up from the menu bar and join it in one click. No app switching.",
      },
      {
        icon: "sync" as const,
        title: "Google Calendar, done right",
        body: "Multiple accounts, color-coded calendars, and native Meet, Zoom, and Teams links.",
      },
      {
        icon: "command" as const,
        title: "Built for speed",
        body: "Familiar Google Calendar-style shortcuts. Stay in flow without reaching for the mouse.",
      },
      {
        icon: "shield" as const,
        title: "Your data stays yours",
        body: "A direct connection between your Mac and Google. No servers, no tracking, no middleware.",
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
      twitterHref: "https://x.com/moto_szama",
      twitterLabel: "Follow @moto_szama",
      blueskyHref: "https://bsky.app/profile/szamski.bsky.social",
      blueskyLabel: "Follow @szamski.bsky.social",
    },
  },

  betaCta: {
    eyebrow: "Beta access",
    heading: "Want to try it early?",
    subtitle: "Join the beta and help shape the product.",
    note: "Early access via TestFlight.",
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
        a: "hora will be a paid app. At launch there's a limited-time one-time purchase for $49, or a $30/year subscription — both include Family Sharing. The TestFlight beta is free to join.",
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
