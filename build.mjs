import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, cpSync, rmSync } from 'fs';
import { join, basename } from 'path';
import { marked } from 'marked';

const ROOT = import.meta.dirname;
const DIST = join(ROOT, 'dist');

const MOBILE_NAV_JS = `<script>
function toggleMobileNav(){var m=document.getElementById('nav-mobile'),b=document.querySelector('.nav-hamburger'),o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);b.innerHTML=o?'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>':'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';document.body.style.overflow=o?'hidden':'';}
function closeMobileNav(){var m=document.getElementById('nav-mobile'),b=document.querySelector('.nav-hamburger');m.classList.remove('open');b.setAttribute('aria-expanded','false');b.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';document.body.style.overflow='';}
</script>`;
const POSTS_DIR = join(ROOT, 'posts');

// --- Clean & copy static files to dist ---
if (existsSync(DIST)) {
    rmSync(DIST, { recursive: true });
}
mkdirSync(DIST, { recursive: true });

// Copy all static files
for (const item of ['index.html', 'sitemap.xml', 'robots.txt', 'assets']) {
    const src = join(ROOT, item);
    if (existsSync(src)) {
        cpSync(src, join(DIST, item), { recursive: true });
    }
}

// --- Shared CTA block ---
const ctaBlock = `
<section style="max-width: 720px; margin: 0 auto; padding: 48px 24px 64px;">
    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 40px 36px; text-align: center;">
        <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.01em;">Stay in the loop</h3>
        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 24px;">Get notified when hora launches. No spam.</p>
        <form id="newsletter-form" style="display: flex; gap: 8px; margin-bottom: 24px;">
            <input type="email" name="email" required placeholder="you@email.com" style="flex: 1; padding: 11px 16px; border-radius: 10px; border: 1px solid var(--border); background: var(--bg); color: var(--text); font-family: inherit; font-size: 14px; outline: none;">
            <button type="submit" style="background: var(--accent); color: #fff; border: none; padding: 10px 20px; border-radius: 10px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap;">Subscribe</button>
        </form>
        <p id="newsletter-msg" style="display: none; font-size: 13px; margin-bottom: 24px;"></p>
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
            <span style="flex: 1; height: 1px; background: var(--border);"></span>
            <span style="font-size: 12px; color: #555; text-transform: uppercase; letter-spacing: 0.05em;">or follow along</span>
            <span style="flex: 1; height: 1px; background: var(--border);"></span>
        </div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
            <a href="https://x.com/moto_szama" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 6px; color: var(--text-muted); text-decoration: none; font-size: 13px; padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                @moto_szama
            </a>
            <a href="https://github.com/szamski/hora-web" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 6px; color: var(--text-muted); text-decoration: none; font-size: 13px; padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                Star on GitHub
            </a>
        </div>
    </div>
</section>
<script>
(function() {
    var form = document.getElementById('newsletter-form');
    var msg = document.getElementById('newsletter-msg');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var email = form.email.value;
            var btn = form.querySelector('button');
            btn.textContent = 'Sending...';
            btn.disabled = true;
            fetch('https://hora-newsletter.na-serio-maciej-szamowski.workers.dev/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            }).then(function(res) {
                if (res.ok) {
                    msg.textContent = "You're in! We'll let you know when hora launches.";
                    msg.style.color = '#4ade80';
                    msg.style.display = 'block';
                    form.style.display = 'none';
                } else { throw new Error(); }
            }).catch(function() {
                msg.textContent = 'Something went wrong. Try again or email hello@horacal.app.';
                msg.style.color = '#FF383C';
                msg.style.display = 'block';
                btn.textContent = 'Subscribe';
                btn.disabled = false;
            });
        });
    }
})();
</script>`;

// --- Blog template (matches site design) ---
function blogTemplate(title, date, content, description, tags, slug) {
    const tagsHtml = tags.length
        ? `<div class="tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
        : '';
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — hora Calendar Blog</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="https://horacal.app/blog/${slug}/">
    <link rel="icon" href="/assets/hora-icon.png" type="image/png">
    <link rel="alternate" type="application/rss+xml" title="hora Calendar Blog" href="/blog/feed.xml">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="https://horacal.app/blog/${slug}/">
    <meta property="og:image" content="https://horacal.app/assets/og-image.png">
    <meta property="og:site_name" content="hora Calendar">
    <meta property="article:published_time" content="${date}">
    <meta property="article:author" content="Maciej Szamowski">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@moto_szama">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${title}",
      "description": "${description}",
      "datePublished": "${date}",
      "dateModified": "${date}",
      "author": { "@type": "Person", "name": "Maciej Szamowski", "url": "https://szamowski.dev" },
      "publisher": { "@type": "Organization", "name": "hora Calendar", "url": "https://horacal.app" },
      "url": "https://horacal.app/blog/${slug}/",
      "image": "https://horacal.app/assets/og-image.png",
      "mainEntityOfPage": "https://horacal.app/blog/${slug}/"
    }
    </script>
    <style>
        @font-face { font-family: 'Bumbbled'; src: url('/assets/Bumbbled.otf') format('opentype'); font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Medium.woff2') format('woff2'); font-weight: 500; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-SemiBold.woff2') format('woff2'); font-weight: 600; font-display: swap; }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --bg: #0A0A0A; --surface: #141414; --border: #222; --text: #FAFAFA; --text-muted: #9CA3AF; --accent: #FF383C; --accent-glow: #FF736E; --accent-hover: #E6322F; --max-w: 720px; }
        html { scroll-behavior: smooth; overflow-y: scroll; }
        body { font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; -webkit-font-smoothing: antialiased; min-height: 100vh; display: flex; flex-direction: column; }
        main { flex: 1; }
        .branded { font-family: 'Bumbbled', 'Geist', sans-serif; font-weight: 400; }

        nav { position: sticky; top: 0; z-index: 50; background: rgba(10,10,10,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-inner { max-width: 960px; margin: 0 auto; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text); font-family: 'Bumbbled', 'Geist', sans-serif; font-weight: 400; font-size: 17px; }
        .nav-brand img { width: 28px; height: 28px; border-radius: 6px; }
        .nav-links { display: flex; align-items: center; gap: 24px; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 400; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .nav-links a.btn { color: #fff; font-weight: 600; }
        .nav-links a.btn:hover { color: #fff; }
        .btn { display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, var(--accent), var(--accent-glow)); color: #fff; border: none; border-radius: 999px; padding: 8px 18px; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; transition: opacity 0.2s; }
        .btn:hover { opacity: 0.9; }
        .nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--text); }
        .nav-hamburger svg { display: block; }
        .nav-mobile { display: none; position: fixed; top: 56px; left: 0; right: 0; bottom: 0; background: rgba(10,10,10,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 49; padding: 24px; flex-direction: column; gap: 8px; }
        .nav-mobile.open { display: flex; }
        .nav-mobile a { color: var(--text-muted); text-decoration: none; font-size: 18px; padding: 12px 0; border-bottom: 1px solid var(--border); transition: color 0.2s; }
        .nav-mobile a:hover { color: var(--text); }
        .nav-mobile a.btn { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--accent), var(--accent-glow)); color: #fff; font-weight: 600; border: none; border-radius: 999px; padding: 12px 24px; margin-top: 8px; font-size: 15px; }

        article { max-width: var(--max-w); margin: 0 auto; padding: 64px 24px 80px; }
        article .meta { color: var(--text-muted); font-size: 14px; margin-bottom: 8px; }
        .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; }
        .tag { display: inline-block; font-size: 12px; color: var(--text-muted); background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 3px 10px; text-decoration: none; transition: all 0.2s; }
        .tag:hover { border-color: var(--accent); color: var(--accent); }
        article h1 { font-size: 36px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 16px; }
        article h2 { font-size: 24px; font-weight: 600; margin-top: 48px; margin-bottom: 16px; letter-spacing: -0.01em; }
        article h3 { font-size: 18px; font-weight: 600; margin-top: 32px; margin-bottom: 12px; }
        article p { color: var(--text-muted); margin-bottom: 20px; font-size: 16px; }
        article a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
        article a:hover { text-decoration: underline; }
        article ul, article ol { color: var(--text-muted); margin-bottom: 20px; padding-left: 24px; font-size: 16px; }
        article li { margin-bottom: 8px; }
        article img { max-width: 100%; border-radius: 12px; border: 1px solid var(--border); margin: 24px 0; }
        article code { background: var(--surface); padding: 2px 6px; border-radius: 4px; font-size: 14px; }
        article pre { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px; overflow-x: auto; margin-bottom: 20px; }
        article pre code { background: none; padding: 0; font-size: 14px; }
        article blockquote { border-left: 3px solid var(--accent); padding-left: 16px; margin: 20px 0; color: var(--text-muted); font-style: italic; }
        article hr { border: none; border-top: 1px solid var(--border); margin: 40px 0; }

        .back-link { display: inline-flex; align-items: center; gap: 6px; color: var(--text-muted); text-decoration: none; font-size: 14px; margin-bottom: 32px; transition: color 0.2s; }
        .back-link:hover { color: var(--text); }

        footer { border-top: 1px solid var(--border); padding: 24px; text-align: center; }
        footer p { font-size: 13px; color: #555; }

        @media (max-width: 768px) {
            article { padding: 40px 16px 60px; }
            article h1 { font-size: 28px; }
            .nav-links { display: none; }
            .nav-hamburger { display: block; }
            .nav-inner { padding: 0 16px; }
        }
        @media (max-width: 480px) {
            .nav-inner { padding: 0 12px; }
            .nav-brand { font-size: 15px; gap: 6px; }
            .nav-brand img { width: 24px; height: 24px; }
        }
    </style>
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-WQZ32S81FX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WQZ32S81FX');
    </script>
</head>
<body>
<nav>
    <div class="nav-inner">
        <a href="/" class="nav-brand">
            <img src="/assets/hora-icon.png" alt="" width="28" height="28">
            Calendar
        </a>
        <div class="nav-links">
            <a href="/#features">Features</a>
            <a href="/#roadmap">Roadmap</a>
            <a href="/blog/">Blog</a>
            <a href="/#download" class="btn">Get the App</a>
        </div>
        <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" onclick="toggleMobileNav()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
    </div>
</nav>
<div class="nav-mobile" id="nav-mobile">
    <a href="/#features">Features</a>
    <a href="/#roadmap">Roadmap</a>
    <a href="/blog/">Blog</a>
    <a href="/#download" class="btn">Get the App</a>
</div>
<main>
<article>
    <a href="/blog/" class="back-link">&larr; All posts</a>
    <p class="meta">${date}</p>
    <h1>${title}</h1>
    ${tagsHtml}
    ${content}
</article>
${ctaBlock}
</main>
<footer style="border-top: 1px solid var(--border); padding: 24px; text-align: center;">
    <div style="max-width: 960px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
        <p style="font-size: 13px; color: #9CA3AF;">&copy; 2026 hora Calendar. Developed by <a href="https://szamowski.dev" style="color: #9CA3AF; text-decoration: underline;">szamowski.dev</a></p>
        <div style="display: flex; gap: 16px; align-items: center;">
            <a href="/privacy/" style="font-size: 13px; color: var(--text-muted); text-decoration: none; transition: color 0.2s;">Privacy</a>
            <a href="/terms/" style="font-size: 13px; color: var(--text-muted); text-decoration: none; transition: color 0.2s;">Terms</a>
            <a href="mailto:hello@horacal.app" aria-label="Email" style="color: var(--text-muted); transition: color 0.2s;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
            <a href="https://github.com/szamski" aria-label="GitHub" style="color: var(--text-muted); transition: color 0.2s;"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a>
            <a href="https://x.com/moto_szama" aria-label="X / Twitter" style="color: var(--text-muted); transition: color 0.2s;"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        </div>
    </div>
</footer>
${MOBILE_NAV_JS}
</body>
</html>`;
}

function blogIndexTemplate(posts) {
    const postList = posts.map(p => {
        const tagsHtml = p.tags.length
            ? `<div class="post-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
            : '';
        return `
        <a href="${p.slug}/" class="post-card">
            <p class="post-date">${p.date}</p>
            <h3>${p.title}</h3>
            <p class="post-desc">${p.description}</p>
            ${tagsHtml}
        </a>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog — hora Calendar</title>
    <meta name="description" content="Updates, dev logs, and announcements from the hora Calendar team.">
    <link rel="canonical" href="https://horacal.app/blog/">
    <link rel="icon" href="/assets/hora-icon.png" type="image/png">
    <link rel="alternate" type="application/rss+xml" title="hora Calendar Blog" href="/blog/feed.xml">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Blog — hora Calendar">
    <meta property="og:description" content="Updates, dev logs, and announcements from the hora Calendar team.">
    <meta property="og:image" content="https://horacal.app/assets/og-image.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@moto_szama">
    <style>
        @font-face { font-family: 'Bumbbled'; src: url('/assets/Bumbbled.otf') format('opentype'); font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-SemiBold.woff2') format('woff2'); font-weight: 600; font-display: swap; }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --bg: #0A0A0A; --surface: #141414; --surface-hover: #1a1a1a; --border: #222; --text: #FAFAFA; --text-muted: #9CA3AF; --accent: #FF383C; --accent-glow: #FF736E; --accent-hover: #E6322F; --max-w: 720px; }
        html { overflow-y: scroll; }
        body { font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased; min-height: 100vh; display: flex; flex-direction: column; }
        main { flex: 1; }
        .branded { font-family: 'Bumbbled', 'Geist', sans-serif; font-weight: 400; }
        .gradient-text { background: linear-gradient(135deg, var(--accent), var(--accent-glow)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        nav { position: sticky; top: 0; z-index: 50; background: rgba(10,10,10,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-inner { max-width: 960px; margin: 0 auto; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text); font-family: 'Bumbbled', 'Geist', sans-serif; font-weight: 400; font-size: 17px; }
        .nav-brand img { width: 28px; height: 28px; border-radius: 6px; }
        .nav-links { display: flex; align-items: center; gap: 24px; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 400; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .nav-links a.btn { color: #fff; font-weight: 600; }
        .nav-links a.btn:hover { color: #fff; }
        .btn { display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, var(--accent), var(--accent-glow)); color: #fff; border: none; border-radius: 999px; padding: 8px 18px; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; transition: opacity 0.2s; }
        .btn:hover { opacity: 0.9; }
        .nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--text); }
        .nav-hamburger svg { display: block; }
        .nav-mobile { display: none; position: fixed; top: 56px; left: 0; right: 0; bottom: 0; background: rgba(10,10,10,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 49; padding: 24px; flex-direction: column; gap: 8px; }
        .nav-mobile.open { display: flex; }
        .nav-mobile a { color: var(--text-muted); text-decoration: none; font-size: 18px; padding: 12px 0; border-bottom: 1px solid var(--border); transition: color 0.2s; }
        .nav-mobile a:hover { color: var(--text); }
        .nav-mobile a.btn { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--accent), var(--accent-glow)); color: #fff; font-weight: 600; border: none; border-radius: 999px; padding: 12px 24px; margin-top: 8px; font-size: 15px; }

        .blog-header { max-width: var(--max-w); margin: 0 auto; padding: 64px 24px 40px; }
        .blog-header h1 { font-size: 36px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 8px; }
        .blog-header p { color: var(--text-muted); font-size: 16px; }

        .posts { max-width: var(--max-w); margin: 0 auto; padding: 0 24px 80px; display: flex; flex-direction: column; gap: 12px; }
        .post-card { display: block; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; text-decoration: none; transition: background 0.2s, border-color 0.2s; }
        .post-card:hover { background: var(--surface-hover); border-color: #333; }
        .post-card h3 { font-size: 18px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
        .post-card .post-date { font-size: 13px; color: var(--text-muted); margin-bottom: 6px; }
        .post-card .post-desc { font-size: 14px; color: var(--text-muted); line-height: 1.5; margin-bottom: 0; }
        .post-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 10px; }
        .tag { display: inline-block; font-size: 11px; color: var(--text-muted); background: var(--bg); border: 1px solid var(--border); border-radius: 5px; padding: 2px 8px; }

        .empty { max-width: var(--max-w); margin: 0 auto; padding: 40px 24px 80px; text-align: center; color: var(--text-muted); }

        footer { border-top: 1px solid var(--border); padding: 24px; text-align: center; }
        footer p { font-size: 13px; color: #555; }

        @media (max-width: 768px) {
            .blog-header { padding: 40px 16px 32px; }
            .blog-header h1 { font-size: 28px; }
            .posts { padding: 0 16px 60px; }
            .nav-links { display: none; }
            .nav-hamburger { display: block; }
            .nav-inner { padding: 0 16px; }
        }
        @media (max-width: 480px) {
            .nav-inner { padding: 0 12px; }
            .nav-brand { font-size: 15px; gap: 6px; }
            .nav-brand img { width: 24px; height: 24px; }
        }
    </style>
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-WQZ32S81FX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WQZ32S81FX');
    </script>
</head>
<body>
<nav>
    <div class="nav-inner">
        <a href="/" class="nav-brand">
            <img src="/assets/hora-icon.png" alt="" width="28" height="28">
            Calendar
        </a>
        <div class="nav-links">
            <a href="/#features">Features</a>
            <a href="/#roadmap">Roadmap</a>
            <a href="/blog/">Blog</a>
            <a href="/#download" class="btn">Get the App</a>
        </div>
        <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" onclick="toggleMobileNav()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
    </div>
</nav>
<div class="nav-mobile" id="nav-mobile">
    <a href="/#features">Features</a>
    <a href="/#roadmap">Roadmap</a>
    <a href="/blog/">Blog</a>
    <a href="/#download" class="btn">Get the App</a>
</div>
<main>
<div class="blog-header">
    <h1 class="branded">hora <span class="gradient-text">Blog</span></h1>
    <p>Updates, dev logs, and announcements.</p>
</div>
<div class="posts">
    ${postList || '<p class="empty">No posts yet. Stay tuned!</p>'}
</div>
${ctaBlock}
</main>
<footer style="border-top: 1px solid var(--border); padding: 24px; text-align: center;">
    <div style="max-width: 960px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
        <p style="font-size: 13px; color: #9CA3AF;">&copy; 2026 hora Calendar. Developed by <a href="https://szamowski.dev" style="color: #9CA3AF; text-decoration: underline;">szamowski.dev</a></p>
        <div style="display: flex; gap: 16px; align-items: center;">
            <a href="/privacy/" style="font-size: 13px; color: var(--text-muted); text-decoration: none; transition: color 0.2s;">Privacy</a>
            <a href="/terms/" style="font-size: 13px; color: var(--text-muted); text-decoration: none; transition: color 0.2s;">Terms</a>
            <a href="mailto:hello@horacal.app" aria-label="Email" style="color: var(--text-muted); transition: color 0.2s;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
            <a href="https://github.com/szamski" aria-label="GitHub" style="color: var(--text-muted); transition: color 0.2s;"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a>
            <a href="https://x.com/moto_szama" aria-label="X / Twitter" style="color: var(--text-muted); transition: color 0.2s;"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        </div>
    </div>
</footer>
${MOBILE_NAV_JS}
</body>
</html>`;
}

// --- Parse frontmatter from MD files ---
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: content };
    const meta = {};
    for (const line of match[1].split('\n')) {
        const [key, ...rest] = line.split(':');
        if (key && rest.length) meta[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
    return { meta, body: match[2] };
}

// --- Build blog ---
const blogDir = join(DIST, 'blog');
mkdirSync(blogDir, { recursive: true });

const posts = [];

if (existsSync(POSTS_DIR)) {
    const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md')).sort().reverse();

    for (const file of files) {
        const raw = readFileSync(join(POSTS_DIR, file), 'utf-8');
        const { meta, body } = parseFrontmatter(raw);
        const slug = basename(file, '.md');
        const title = meta.title || slug;
        const date = meta.date || '';
        const description = meta.description || body.slice(0, 150).replace(/[#*\n]/g, '').trim();
        const tags = meta.tags ? meta.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
        const html = marked.parse(body);

        const postDir = join(blogDir, slug);
        mkdirSync(postDir, { recursive: true });
        writeFileSync(join(postDir, 'index.html'), blogTemplate(title, date, html, description, tags, slug));

        posts.push({ slug, title, date, description, tags });
    }
}

writeFileSync(join(blogDir, 'index.html'), blogIndexTemplate(posts));

// --- Update sitemap with blog ---
let sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf-8');
const blogUrls = posts.map(p => `  <url>
    <loc>https://horacal.app/blog/${p.slug}/</loc>
    <lastmod>${p.date || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

const blogIndexUrl = `  <url>
    <loc>https://horacal.app/blog/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

// Add image sitemap namespace
sitemap = sitemap.replace(
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
);

sitemap = sitemap.replace('</urlset>', `${blogIndexUrl}\n${blogUrls}\n</urlset>`);
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

// --- Generate RSS feed ---
const rssItems = posts.map(p => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>https://horacal.app/blog/${p.slug}/</link>
      <guid isPermaLink="true">https://horacal.app/blog/${p.slug}/</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.description}]]></description>
    </item>`).join('\n');

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>hora Calendar Blog</title>
    <link>https://horacal.app/blog/</link>
    <description>Dev logs, updates, and announcements from hora Calendar — a native macOS Google Calendar client.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://horacal.app/blog/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;

writeFileSync(join(blogDir, 'feed.xml'), rssFeed);
console.log(`Built RSS feed → dist/blog/feed.xml`);

// --- Build legal pages ---
function legalPageTemplate(title, lastUpdated, content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — hora Calendar</title>
    <meta name="description" content="${title} for hora Calendar, a native macOS Google Calendar client.">
    <link rel="canonical" href="https://horacal.app/${title.toLowerCase().replace(/\s+/g, '-')}/">
    <link rel="icon" href="/assets/hora-icon.png" type="image/png">
    <style>
        @font-face { font-family: 'Bumbbled'; src: url('/assets/Bumbbled.otf') format('opentype'); font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Medium.woff2') format('woff2'); font-weight: 500; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-SemiBold.woff2') format('woff2'); font-weight: 600; font-display: swap; }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --bg: #0A0A0A; --surface: #141414; --border: #222; --text: #FAFAFA; --text-muted: #9CA3AF; --accent: #FF383C; --accent-glow: #FF736E; --accent-hover: #E6322F; }
        body { font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; -webkit-font-smoothing: antialiased; min-height: 100vh; display: flex; flex-direction: column; }
        main { flex: 1; }

        nav { position: sticky; top: 0; z-index: 50; background: rgba(10,10,10,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-inner { max-width: 960px; margin: 0 auto; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text); font-family: 'Bumbbled', 'Geist', sans-serif; font-weight: 400; font-size: 17px; }
        .nav-brand img { width: 28px; height: 28px; border-radius: 6px; }
        .nav-links { display: flex; align-items: center; gap: 24px; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 400; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .nav-links a.btn { color: #fff; font-weight: 600; }
        .nav-links a.btn:hover { color: #fff; }
        .btn { display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, var(--accent), var(--accent-glow)); color: #fff; border: none; border-radius: 999px; padding: 8px 18px; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; transition: opacity 0.2s; }
        .btn:hover { opacity: 0.9; }
        .nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--text); }
        .nav-hamburger svg { display: block; }
        .nav-mobile { display: none; position: fixed; top: 56px; left: 0; right: 0; bottom: 0; background: rgba(10,10,10,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 49; padding: 24px; flex-direction: column; gap: 8px; }
        .nav-mobile.open { display: flex; }
        .nav-mobile a { color: var(--text-muted); text-decoration: none; font-size: 18px; padding: 12px 0; border-bottom: 1px solid var(--border); transition: color 0.2s; }
        .nav-mobile a:hover { color: var(--text); }
        .nav-mobile a.btn { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--accent), var(--accent-glow)); color: #fff; font-weight: 600; border: none; border-radius: 999px; padding: 12px 24px; margin-top: 8px; font-size: 15px; }

        .legal { max-width: 720px; margin: 0 auto; padding: 64px 24px 80px; }
        .legal h1 { font-size: 36px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 8px; }
        .legal .updated { font-size: 14px; color: var(--text-muted); margin-bottom: 32px; }
        .legal h3 { font-size: 16px; font-weight: 600; margin-top: 32px; margin-bottom: 12px; }
        .legal p { color: var(--text-muted); font-size: 15px; margin-bottom: 16px; line-height: 1.7; }
        .legal a { color: var(--accent); text-decoration: none; }
        .legal a:hover { text-decoration: underline; }
        .legal ul { color: var(--text-muted); font-size: 15px; margin-bottom: 16px; padding-left: 24px; list-style: none; }
        .legal li { position: relative; padding-left: 16px; margin-bottom: 8px; }
        .legal li::before { content: ''; position: absolute; left: 0; top: 10px; width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }

        footer { border-top: 1px solid var(--border); padding: 24px; text-align: center; }

        @media (max-width: 768px) {
            .legal { padding: 40px 16px 60px; }
            .legal h1 { font-size: 28px; }
            .nav-links { display: none; }
            .nav-hamburger { display: block; }
            .nav-inner { padding: 0 16px; }
        }
        @media (max-width: 480px) {
            .nav-inner { padding: 0 12px; }
            .nav-brand { font-size: 15px; gap: 6px; }
            .nav-brand img { width: 24px; height: 24px; }
        }
    </style>
</head>
<body>
<nav>
    <div class="nav-inner">
        <a href="/" class="nav-brand">
            <img src="/assets/hora-icon.png" alt="" width="28" height="28">
            Calendar
        </a>
        <div class="nav-links">
            <a href="/#features">Features</a>
            <a href="/#roadmap">Roadmap</a>
            <a href="/blog/">Blog</a>
            <a href="/#download" class="btn">Get the App</a>
        </div>
        <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" onclick="toggleMobileNav()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
    </div>
</nav>
<div class="nav-mobile" id="nav-mobile">
    <a href="/#features">Features</a>
    <a href="/#roadmap">Roadmap</a>
    <a href="/blog/">Blog</a>
    <a href="/#download" class="btn">Get the App</a>
</div>
<main>
<section class="legal">
    <h1>${title}</h1>
    <p class="updated">Last updated: ${lastUpdated}</p>
    ${content}
</section>
</main>
<footer>
    <div style="max-width: 960px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
        <p style="font-size: 13px; color: #9CA3AF;">&copy; 2026 hora Calendar. Developed by <a href="https://szamowski.dev" style="color: #9CA3AF; text-decoration: underline;">szamowski.dev</a></p>
        <div style="display: flex; gap: 16px;">
            <a href="/privacy/" style="font-size: 13px; color: var(--text-muted); text-decoration: none;">Privacy</a>
            <a href="/terms/" style="font-size: 13px; color: var(--text-muted); text-decoration: none;">Terms</a>
        </div>
    </div>
</footer>
${MOBILE_NAV_JS}
</body>
</html>`;
}

const privacyContent = `
    <p>Hora Calendar is a native macOS application that connects to Google Calendar. Your privacy matters&nbsp;&mdash; here is exactly what we access and how we use it.</p>

    <h3>Data We Access</h3>
    <ul>
        <li>Google Calendar: events and calendars (read &amp; write)</li>
        <li>Google Other Contacts: names and emails (read only, auto-suggested contacts for guest autocomplete)</li>
        <li>Google account email address</li>
    </ul>

    <h3>How We Use It</h3>
    <ul>
        <li>Display and manage your calendar events</li>
        <li>Provide autocomplete suggestions when adding guests to events</li>
        <li>Synchronize changes with Google Calendar</li>
    </ul>

    <h3>Data Storage</h3>
    <ul>
        <li>All data is stored locally on your Mac using SwiftData</li>
        <li>No data is sent to any server other than Google APIs</li>
        <li>This website uses Google Analytics to understand visitor behavior (with cookie consent)</li>
    </ul>

    <h3>Data Sharing</h3>
    <ul>
        <li>We do not share your data with anyone</li>
        <li>We do not sell your data</li>
    </ul>

    <h3>Data Deletion</h3>
    <ul>
        <li>Sign out in Hora Settings to remove all local data</li>
        <li>Revoke access at <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a></li>
    </ul>

    <h3>Contact</h3>
    <p>For privacy-related inquiries: <a href="mailto:hello@horacal.app">hello@horacal.app</a></p>
`;

const termsContent = `
    <p>By downloading or using Hora Calendar ("the App"), you agree to these terms.</p>

    <h3>Description of Service</h3>
    <p>Hora Calendar is native macOS application that provides a client interface for Google Calendar. The App communicates directly with Google APIs on your behalf.</p>

    <h3>Google Account</h3>
    <p>The App requires a Google account to function. Your use of Google services through the App is subject to <a href="https://policies.google.com/terms">Google's Terms of Service</a>. You are responsible for maintaining the security of your Google account credentials.</p>

    <h3>Acceptable Use</h3>
    <ul>
        <li>Use the App only for its intended purpose of managing your Google Calendar</li>
        <li>Do not attempt to reverse engineer, decompile, or modify the App</li>
        <li>Do not use the App to violate any applicable laws or regulations</li>
    </ul>

    <h3>Disclaimer</h3>
    <p>The App is provided "as is" without warranty of any kind, express or implied. We do not guarantee uninterrupted or error-free operation. We are not responsible for any data loss resulting from the use of the App.</p>

    <h3>Limitation of Liability</h3>
    <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the App.</p>

    <h3>Changes to Terms</h3>
    <p>We may update these terms from time to time. Continued use of the App constitutes acceptance of the updated terms.</p>

    <h3>Contact</h3>
    <p>Questions about these terms: <a href="mailto:hello@horacal.app">hello@horacal.app</a></p>
`;

const privacyDir = join(DIST, 'privacy');
mkdirSync(privacyDir, { recursive: true });
writeFileSync(join(privacyDir, 'index.html'), legalPageTemplate('Privacy Policy', 'March 25, 2026', privacyContent));

const termsDir = join(DIST, 'terms');
mkdirSync(termsDir, { recursive: true });
writeFileSync(join(termsDir, 'index.html'), legalPageTemplate('Terms of Service', 'March 25, 2026', termsContent));

// --- Update sitemap with legal pages ---
sitemap = sitemap.replace('</urlset>', `  <url>
    <loc>https://horacal.app/privacy/</loc>
    <lastmod>2026-03-25</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://horacal.app/terms/</loc>
    <lastmod>2026-03-25</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`);
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`Built ${posts.length} blog post(s) → dist/blog/`);
console.log('Built legal pages → dist/privacy/, dist/terms/');
