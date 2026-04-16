# hora Calendar — Website & Blog

Landing page + blog for hora Calendar. Static site, deployed to GitHub Pages.

## Stack

- Static HTML (`index.html`) + Node.js build script (`build.mjs`) + `marked` for Markdown
- Deploy: GitHub Actions -> GitHub Pages (on push to main)
- Domain: horacal.app
- Analytics: Plausible (cookieless, no consent banner needed); custom events via `plausible(name, { props })`
- Newsletter: Cloudflare Worker (`newsletter-worker/`)
- Fonts: Bumbbled (custom, `assets/Bumbbled.otf`) + Geist (CDN)

## How to add a blog post

1. Create `posts/YYYY-MM-DD-slug.md` with frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: YYYY-MM-DD
   description: "Meta description for SEO"
   tags: tag1, tag2, tag3
   cover: /assets/blog/image.webp
   ---
   ```
2. Put images/videos in `assets/blog/` (use .webp for images, .webm for video)
3. Run `npm run build` to generate `dist/`
4. Push to main — GitHub Actions deploys automatically

Build generates: blog listing page, individual post pages, RSS feed (`/blog/feed.xml`), copies static files to `dist/`.

## Social media automation

On new blog post push to main:
1. `.github/workflows/social-copy.yml` detects new .md in `posts/`
2. `.github/scripts/generate-social-copy.py` sends post to Gemini AI (gemini-2.5-flash) -> generates copy for X, LinkedIn, Threads
3. `.github/scripts/push-to-buffer.py` pushes drafts to Buffer API

Secrets needed: `GEMINI_API_KEY`, `BUFFER_API_KEY`, `BUFFER_LINKEDIN_CHANNEL_ID`, `BUFFER_X_CHANNEL_ID`, `BUFFER_THREADS_CHANNEL_ID`

Can also run manually: `workflow_dispatch` with `post_file` input.

## Newsletter worker

`newsletter-worker/` — Cloudflare Worker that handles newsletter signups from the site form. Config in `newsletter-worker/wrangler.toml`.

## Structure

```
index.html          Landing page (hero, features, roadmap, newsletter CTA, footer)
build.mjs           Build script — generates blog pages, RSS, copies static to dist/
posts/              Blog posts (Markdown with frontmatter)
assets/             Static assets (icons, fonts, images, videos)
dist/               Generated output (gitignored)
newsletter-worker/  Cloudflare Worker for newsletter signups
.github/workflows/  deploy.yml (GitHub Pages) + social-copy.yml (AI social media)
.github/scripts/    generate-social-copy.py + push-to-buffer.py
```

## SEO

- Open Graph + Twitter Card meta tags
- Structured data (SoftwareApplication schema)
- sitemap.xml + robots.txt
- RSS feed at /blog/feed.xml
- Canonical URLs on all pages
