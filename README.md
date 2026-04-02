<p align="center">
  <img src="assets/hora-icon.png" alt="hora Calendar" width="128">
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
  <img src="https://img.shields.io/badge/macOS-15%2B-000?logo=apple&logoColor=white" alt="macOS 14+">
  <img src="https://img.shields.io/badge/Swift-6-F05138?logo=swift&logoColor=white" alt="Swift 6">
  <img src="https://img.shields.io/badge/SwiftUI-blue?logo=swift&logoColor=white" alt="SwiftUI">
  <img src="https://img.shields.io/badge/Google_Calendar_API-4285F4?logo=googlecalendar&logoColor=white" alt="Google Calendar API">
</p>

<p align="center">
  <a href="https://horacal.app/"><strong>Website</strong></a> &nbsp;&middot;&nbsp;
  <a href="https://horacal.app/privacy">Privacy</a> &nbsp;&middot;&nbsp;
  <a href="https://horacal.app/terms">Terms</a> &nbsp;&middot;&nbsp;
  <a href="https://x.com/moto_szama">Follow @moto_szama</a>
</p>

---

<p align="center">
  <img src="assets/hora-demo.gif" alt="hora Calendar demo" width="800">
</p>

---

### About this repo

Landing page, blog, and legal pages for hora Calendar.

```
index.html              Landing page (hero, features, roadmap, newsletter CTA)
build.mjs               Static site generator (Node.js + marked)
posts/                  Blog posts (Markdown with frontmatter)
assets/                 Icons, fonts, images, videos, demo GIF
dist/                   Generated output (gitignored)
newsletter-worker/      Cloudflare Worker for newsletter signups
.github/workflows/      deploy.yml (GitHub Pages) + social-copy.yml (AI social media)
.github/scripts/        generate-social-copy.py + push-to-buffer.py
```

### Development

```bash
npm ci
npm run build    # generates dist/
```

Push to `main` triggers auto-deploy to GitHub Pages.

### Blog

Add a post: create `posts/YYYY-MM-DD-slug.md` with frontmatter (title, date, description, tags, cover). On push, social media copy is auto-generated via Gemini AI and pushed to Buffer as drafts.

### Links

| | |
|---|---|
| Website | [horacal.app](https://horacal.app) |
| X / Twitter | [@moto_szama](https://x.com/moto_szama) |
| Developer | [szamowski.dev](https://szamowski.dev) |

---

<p align="center">
  <sub>Built with plain HTML + CSS. Hosted on GitHub Pages. No frameworks, no dependencies.</sub>
</p>
