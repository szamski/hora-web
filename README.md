<p align="center">
  <img src="https://horacal.app/assets/hora-icon.png" alt="hora Calendar" width="128">
</p>

<h1 align="center">hora Calendar</h1>

<h3 align="center">
  The Google Calendar client that macOS deserves.
</h3>

<p align="center">
  Pure SwiftUI. Direct Google Calendar API. Zero compromises.<br>
  <strong>No Electron. No CalDAV. Just fast.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/macOS-14%2B-000?logo=apple&logoColor=white" alt="macOS 14+">
  <img src="https://img.shields.io/badge/Swift-6-F05138?logo=swift&logoColor=white" alt="Swift 6">
  <img src="https://img.shields.io/badge/SwiftUI-blue?logo=swift&logoColor=white" alt="SwiftUI">
  <img src="https://img.shields.io/badge/Google_Calendar_API-4285F4?logo=googlecalendar&logoColor=white" alt="Google Calendar API">
</p>

<p align="center">
  <a href="https://horacal.app"><strong>Website</strong></a> &nbsp;&middot;&nbsp;
  <a href="https://horacal.app/features/">Features</a> &nbsp;&middot;&nbsp;
  <a href="https://horacal.app/blog">Blog</a> &nbsp;&middot;&nbsp;
  <a href="https://horacal.app/privacy">Privacy</a> &nbsp;&middot;&nbsp;
  <a href="https://horacal.app/terms">Terms</a> &nbsp;&middot;&nbsp;
  <a href="https://x.com/moto_szama">@moto_szama</a>
</p>

---

<p align="center">
  <img src="assets/hora-demo.gif" alt="hora Calendar demo" width="800">
</p>

---

### Features

| | Feature | Description |
|---|---|---|
| **Day, Week & Month** | 3 Calendar Views | Apple Calendar–style layout with smooth transitions between views. |
| **Drag & Drop** | Full CRUD | Create, edit, resize, delete events. Feels native because it is. |
| **One Click** | Google Meet | Add conference links when creating events. Join instantly. |
| **D/W/M · C · / · J/K · T** | Keyboard Shortcuts | Google Calendar shortcuts you already know. |
| **Incremental** | Smart Sync | Configurable intervals. Native macOS notifications for upcoming events. |
| **Multi-Account** | Color-Coded | Multiple Google accounts, each with its own color scheme. |
| **Autocomplete** | Attendees | Invite people from Google Contacts with instant suggestions. |
| **Pomodoro** | Focus Timer | Built-in pomodoro timer with configurable work/break intervals. |
| **Cmd+Shift+A** | Availability Sharing | Query free slots via FreeBusy API, copy to clipboard. |
| **Menu Bar** | Widget | Pill-shaped indicators, upcoming events, countdown to next meeting. |
| **Recurring** | Events | Full support for recurring rules with exception handling. |
| **9 Languages** | Localization | EN, PL, DE, ES, FR, IT, JA, PT, ZH. |
| **Undo/Redo** | Cmd+Z | Full undo/redo for create, edit, and delete operations. |
| **Light & Dark** | Appearance | Matches system appearance. Polished contrast in both modes. |

See [horacal.app/features](https://horacal.app/features/) for the full list.

### Stack

| | |
|---|---|
| Language | Swift 6 |
| UI | SwiftUI + AppKit |
| API | Google Calendar REST API (direct, no CalDAV) |
| Auth | OAuth 2.0 + PKCE via `ASWebAuthenticationSession` |
| Storage | SwiftData (local cache, Google API as source of truth) |
| Architecture | 3 Swift Packages (HoraCore, HoraGoogleAPI, HoraSync) + main target |
| CI/CD | Xcode Cloud (builds + TestFlight) + GitHub Actions (tests on PR) |
| Distribution | Mac App Store / TestFlight |

### Journey

**Shipped (24+ features, 25+ bugs squashed)** — Day / Week / Month views, full CRUD, drag & drop, resize, multi-account sync, Google OAuth, incremental sync, keyboard shortcuts, menu bar widget, pomodoro timer, availability sharing, invitation management, calendar visibility, recurring events, 9 languages, light & dark mode, 5/7-day week toggle, one-click meeting join, window state restore, Xcode Cloud CI/CD.

**Working on now** — Focus mode & DND integration · Quick "Running late" reply · Email attendees from event detail · Invitation "Ignore" option · Light mode contrast polish · Dynamic Dock icon (macOS 26) · Localization native review.

**What's next**

| # | Milestone |
|---|---|
| 1 | Mac App Store launch — final QA sprint, macOS 27 compatibility, performance |
| 2 | iOS & iPadOS companion — same SwiftUI foundation, designed for touch |
| 3 | Apple Intelligence — smart scheduling, focus time planning, meeting prep briefings |
| 4 | Google Workspace — Gmail context, contact enrichment, deeper integration |

### Links

| | |
|---|---|
| Website | [horacal.app](https://horacal.app) |
| Blog | [horacal.app/blog](https://horacal.app/blog) ([RSS](https://horacal.app/blog/feed.xml)) |
| X / Twitter | [@moto_szama](https://x.com/moto_szama) |
| Developer | [szamowski.dev](https://szamowski.dev) |

---

<p align="center">
  <sub>Built with SwiftUI + AppKit. No Electron. No web views. Pure native macOS.</sub>
</p>
