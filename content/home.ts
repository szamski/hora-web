export const home = {
  seo: {
    title: "hora Calendar — Native macOS Google Calendar Client",
    description:
      "hora Calendar is a native macOS client for Google Calendar. Built with SwiftUI. No Electron. No CalDAV. Just fast.",
    ogTitle: "hora Calendar — Native macOS Google Calendar Client",
    ogDescription:
      "The Google Calendar client that macOS deserves. Built with SwiftUI. No Electron. No CalDAV. Just fast.",
  },

  hero: {
    iconSrc: "/assets/hora-icon.png",
    title: { prefix: "hora", suffixGradient: "Calendar" },
    subtitle: "Native Google Calendar app for Mac",
    tagline: "No Electron. No CalDAV. Just fast, native SwiftUI.",
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
    downloads: [
      { label: "Mac App Store — Coming Soon", icon: "apple", disabled: true, href: "#" },
      { label: "TestFlight Beta — Coming Soon", icon: "testflight", disabled: true, href: "#" },
    ],
  },

  features: {
    heading: { prefix: "Native macOS Calendar", suffixGradient: "Features" },
    subtitle: "Built for speed. Designed for clarity.",
    items: [
      {
        icon: "calendar",
        title: "3 Calendar Views",
        description:
          "Week and Month views styled after Apple Calendar. Day View coming soon. Smooth transitions between views.",
      },
      {
        icon: "edit",
        title: "Full CRUD",
        description:
          "Create, edit, delete events with drag and drop. Resize events by dragging edges.",
      },
      {
        icon: "meet",
        title: "Google Meet",
        description:
          "Add conference links directly when creating events. One click to join meetings.",
      },
      {
        icon: "keyboard",
        title: "Keyboard Shortcuts",
        description:
          "Google Calendar-style: D/W/M for views, C to create, / to search, J/K to navigate, T for today.",
      },
      {
        icon: "sync",
        title: "Smart Sync",
        description:
          "Incremental sync with configurable intervals. Native macOS notifications for upcoming events.",
      },
      {
        icon: "users",
        title: "Multi-Account",
        description:
          "Multiple Google accounts with color-coded calendars. Switch context without switching apps.",
      },
    ],
    allFeaturesLink: { label: "See all features in detail →", href: "/features/" },
  },

  journey: {
    heading: { prefix: "The", suffixGradient: "Journey" },
    subtitle: "What's shipped, what's in progress, and what's next.",
    shipped: {
      label: "Shipped",
      items: [
        "Week view",
        "Month view",
        "Day view",
        "Event creation",
        "Event editing",
        "Drag & drop",
        "Event resize",
        "Multi-account sync",
        "Google OAuth",
        "Incremental sync",
        "Keyboard shortcuts",
        "Menu bar widget",
        "Pomodoro timer",
        "Availability sharing",
        "Invitation management",
        "Calendar visibility",
        "Recurring events",
        "9 languages",
        "Light & Dark mode",
        "Go to date",
        "5/7 day week toggle",
        "One-click meeting join",
        "Window state restore",
        "Xcode Cloud CI/CD",
      ],
      footnote: "24 features shipped · 25+ bugs squashed",
    },
    now: {
      label: "Working on now",
      items: [
        { tag: "feat", text: "Focus mode & DND integration" },
        { tag: "feat", text: 'Quick "Running late" reply' },
        { tag: "feat", text: "Email attendees from event detail" },
        { tag: "feat", text: 'Invitation "Ignore" option' },
        { tag: "bug", text: "Light mode contrast polish" },
        { tag: "feat", text: "Dynamic Dock icon (macOS 26)" },
        { tag: "feat", text: "Localization native review" },
      ],
    },
    next: {
      label: "What's next",
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
    subtitle: "Building hora in public. Updates, dev logs, and honest progress reports.",
    allPostsLink: { label: "View all posts →", href: "/blog/" },
  },
} as const;

export type Home = typeof home;
