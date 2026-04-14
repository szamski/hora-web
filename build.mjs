import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, cpSync, rmSync } from 'fs';
import { join, basename } from 'path';
import { marked } from 'marked';

const ROOT = import.meta.dirname;
const DIST = join(ROOT, 'dist');

const MOBILE_NAV_JS = `<script>
function _preventTouch(e){var m=document.getElementById('nav-mobile');if(m&&m.contains(e.target))return;e.preventDefault();}
function _lockScroll(lock){var h=document.documentElement,b=document.body;h.style.overflow=lock?'hidden':'';b.style.overflow=lock?'hidden':'';if(lock)document.addEventListener('touchmove',_preventTouch,{passive:false});else document.removeEventListener('touchmove',_preventTouch);}
function toggleMobileNav(){var m=document.getElementById('nav-mobile'),b=document.querySelector('.nav-hamburger'),o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);b.innerHTML=o?'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>':'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';_lockScroll(o);}
function closeMobileNav(){var m=document.getElementById('nav-mobile'),b=document.querySelector('.nav-hamburger');m.classList.remove('open');b.setAttribute('aria-expanded','false');b.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';_lockScroll(false);}
</script>`;

const FOOTER_CSS = `
        footer { border-top: 1px solid var(--border); padding: 32px 24px; text-align: center; }
        footer p { font-size: 13px; color: #9CA3AF; }
        .footer-inner { max-width: 960px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .footer-inner a { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
        .footer-inner a:hover { color: var(--text); }
        .footer-links { display: flex; align-items: center; gap: 16px; }
        .footer-links a { font-size: 13px; }
        @media (max-width: 768px) { .footer-inner { flex-direction: column; gap: 12px; text-align: center; } }`;

const FOOTER_HTML = `<footer>
    <div class="footer-inner">
        <p>&copy; 2026 hora Calendar. Developed by <a href="https://szamowski.dev" style="text-decoration: underline;">szamowski.dev</a></p>
        <div class="footer-links">
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <a href="mailto:hello@horacal.app" aria-label="Email"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
            <a href="https://github.com/szamski/hora-web" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a>
            <a href="https://x.com/moto_szama" aria-label="X / Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        </div>
    </div>
</footer>`;

const GOOGLE_ADS_TAG = `<!-- Google Ads (conversion tracking only, no GA4) with Consent Mode v2 -->
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        var _c = null; try { _c = localStorage.getItem('cookie-consent'); } catch(e){}
        gtag('consent', 'default', {
            ad_storage: _c === 'accepted' ? 'granted' : 'denied',
            ad_user_data: _c === 'accepted' ? 'granted' : 'denied',
            ad_personalization: _c === 'accepted' ? 'granted' : 'denied',
            analytics_storage: 'denied'
        });
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18070613857"></script>
    <script>
        gtag('js', new Date());
        gtag('config', 'AW-18070613857');
    </script>`;

const COOKIE_BANNER_CSS = `
        .cookie-banner { position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; background: var(--surface); border-top: 1px solid var(--border); padding: 16px 24px; transform: translateY(100%); transition: transform 0.3s ease; }
        .cookie-banner.visible { transform: translateY(0); }
        .cookie-inner { max-width: 960px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .cookie-inner p { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0; }
        .cookie-inner a { color: var(--text); text-decoration: underline; }
        .cookie-btns { display: flex; gap: 8px; flex-shrink: 0; }
        .cookie-btns button { font-family: inherit; font-size: 13px; padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: none; }
        .cookie-accept { background: var(--accent); color: #fff; }
        .cookie-accept:hover { filter: brightness(1.1); }
        .cookie-decline { background: transparent; color: var(--text-muted); border: 1px solid var(--border) !important; }
        .cookie-decline:hover { color: var(--text); }
        @media (max-width: 768px) { .cookie-inner { flex-direction: column; align-items: stretch; text-align: center; } .cookie-btns { justify-content: center; } }`;

const COOKIE_BANNER_HTML = `<div class="cookie-banner" id="cookie-banner" role="dialog" aria-label="Cookie consent">
    <div class="cookie-inner">
        <p>We use Google Ads cookies to measure campaign performance. Plausible (cookieless) analytics runs regardless. See our <a href="/privacy/">Privacy Policy</a>.</p>
        <div class="cookie-btns">
            <button class="cookie-decline" id="cookie-decline">Decline</button>
            <button class="cookie-accept" id="cookie-accept">Accept</button>
        </div>
    </div>
</div>
<script>
(function(){
    var stored; try { stored = localStorage.getItem('cookie-consent'); } catch(e){}
    if (stored) return;
    var banner = document.getElementById('cookie-banner');
    setTimeout(function(){ banner.classList.add('visible'); }, 800);
    function record(v){ try { localStorage.setItem('cookie-consent', v); } catch(e){} banner.classList.remove('visible'); }
    document.getElementById('cookie-accept').addEventListener('click', function(){
        record('accepted');
        if (typeof gtag === 'function') {
            gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
        }
    });
    document.getElementById('cookie-decline').addEventListener('click', function(){ record('declined'); });
})();
</script>`;

const POSTS_DIR = join(ROOT, 'posts');

// --- Clean & copy static files to dist ---
if (existsSync(DIST)) {
    rmSync(DIST, { recursive: true });
}
mkdirSync(DIST, { recursive: true });

// Copy all static files
for (const item of ['index.html', 'sitemap.xml', 'robots.txt', 'llms.txt', 'assets']) {
    const src = join(ROOT, item);
    if (existsSync(src)) {
        cpSync(src, join(DIST, item), { recursive: true });
    }
}

// --- Shared CTA block ---
const ctaBlock = `
<style>
    .cta-form { display: flex; gap: 8px; margin-bottom: 24px; }
    .cta-form input { flex: 1; min-width: 0; padding: 11px 16px; border-radius: 10px; border: 1px solid var(--border); background: var(--bg); color: var(--text); font-family: inherit; font-size: 14px; outline: none; }
    .cta-form button { background: var(--accent); color: #fff; border: none; padding: 11px 20px; border-radius: 10px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; }
    @media (max-width: 480px) {
        .cta-form { flex-direction: column; }
        .cta-form button { width: 100%; }
    }
</style>
<section style="max-width: 720px; margin: 0 auto; padding: 48px 24px 64px;">
    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 32px clamp(16px, 5vw, 36px); text-align: center; overflow: hidden;">
        <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.01em;">Stay in the loop</h3>
        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 24px;">Get notified when hora launches. No spam.</p>
        <form id="newsletter-form" class="cta-form">
            <input type="email" name="email" required placeholder="you@email.com">
            <button type="submit">Subscribe</button>
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
function blogTemplate(title, date, content, description, tags, slug, cover, ogImage) {
    const tagsHtml = tags.length
        ? `<div class="tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
        : '';
    const og = ogImage || cover;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — hora Calendar Blog</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="https://horacal.app/blog/${slug}/">
    <link rel="icon" href="/assets/hora-icon.png" type="image/png">
    ${GOOGLE_ADS_TAG}
    <link rel="alternate" type="application/rss+xml" title="hora Calendar Blog" href="/blog/feed.xml">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="https://horacal.app/blog/${slug}/">
    <meta property="og:image" content="https://horacal.app${og || '/assets/og-image.png'}">
    <meta property="og:site_name" content="hora Calendar">
    <meta property="article:published_time" content="${date}">
    <meta property="article:author" content="Maciej Szamowski">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@moto_szama">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="https://horacal.app${og || '/assets/og-image.png'}">
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
      "image": "https://horacal.app${og || '/assets/og-image.png'}",
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
        .nav-mobile { display: none; position: fixed; top: 56px; left: 0; right: 0; bottom: 0; background: #0a0a0a; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 49; padding: 24px; flex-direction: column; gap: 8px; overflow-y: auto; }
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

${FOOTER_CSS}
${COOKIE_BANNER_CSS}

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
    <!-- Privacy-friendly analytics by Plausible -->
    <script async src="https://plausible.io/js/pa-K3DR1kRxwm1G-J9Q8KBme.js"></script>
    <script>
        window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
        plausible.init()
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
            <a href="/#roadmap">Journey</a>
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
    <a href="/#roadmap">Journey</a>
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
${FOOTER_HTML}
${MOBILE_NAV_JS}
${COOKIE_BANNER_HTML}
</body>
</html>`;
}

function blogIndexTemplate(posts) {
    const postList = posts.map((p, i) => {
        const tagsHtml = p.tags.length
            ? `<div class="post-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
            : '';
        const coverHtml = p.cover && i === 0
            ? `<div class="post-cover post-cover--hero"><img src="${p.cover}" alt="" loading="eager"></div>`
            : '';
        const isHero = i === 0;
        return `
        <a href="${p.slug}/" class="post-card${isHero ? ' post-card--hero' : ''}">
            ${coverHtml}
            <div class="post-body">
                <p class="post-date">${p.date}</p>
                <h3>${p.title}</h3>
                <p class="post-desc">${p.description}</p>
                ${tagsHtml}
            </div>
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
    ${GOOGLE_ADS_TAG}
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
        .nav-mobile { display: none; position: fixed; top: 56px; left: 0; right: 0; bottom: 0; background: #0a0a0a; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 49; padding: 24px; flex-direction: column; gap: 8px; overflow-y: auto; }
        .nav-mobile.open { display: flex; }
        .nav-mobile a { color: var(--text-muted); text-decoration: none; font-size: 18px; padding: 12px 0; border-bottom: 1px solid var(--border); transition: color 0.2s; }
        .nav-mobile a:hover { color: var(--text); }
        .nav-mobile a.btn { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--accent), var(--accent-glow)); color: #fff; font-weight: 600; border: none; border-radius: 999px; padding: 12px 24px; margin-top: 8px; font-size: 15px; }

        .blog-header { max-width: var(--max-w); margin: 0 auto; padding: 64px 24px 40px; }
        .blog-header h1 { font-size: 36px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 8px; }
        .blog-header p { color: var(--text-muted); font-size: 16px; }

        .posts { max-width: var(--max-w); margin: 0 auto; padding: 0 24px 80px; display: flex; flex-direction: column; gap: 16px; }
        .post-card { display: block; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; text-decoration: none; transition: border-color 0.2s, transform 0.2s; overflow: hidden; }
        .post-card:hover { border-color: #333; transform: translateY(-2px); }
        .post-body { padding: 20px 24px 24px; }
        .post-card h3 { font-size: 18px; font-weight: 600; color: var(--text); margin-bottom: 8px; line-height: 1.3; }
        .post-card .post-date { font-size: 13px; color: var(--text-muted); margin-bottom: 8px; }
        .post-card .post-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 0; }
        .post-cover img { width: 100%; height: 200px; object-fit: cover; display: block; }
        .post-card--hero .post-cover img { height: 320px; }
        .post-card--hero h3 { font-size: 22px; }
        .post-card--hero .post-desc { font-size: 15px; }
        .post-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 12px; }
        .tag { display: inline-block; font-size: 11px; color: var(--text-muted); background: var(--bg); border: 1px solid var(--border); border-radius: 5px; padding: 2px 8px; }

        .empty { max-width: var(--max-w); margin: 0 auto; padding: 40px 24px 80px; text-align: center; color: var(--text-muted); }

${FOOTER_CSS}
${COOKIE_BANNER_CSS}

        @media (max-width: 768px) {
            .blog-header { padding: 40px 16px 32px; }
            .blog-header h1 { font-size: 28px; }
            .posts { padding: 0 16px 60px; gap: 12px; }
            .post-cover img { height: 160px; }
            .post-card--hero .post-cover img { height: 220px; }
            .post-card--hero h3 { font-size: 20px; }
            .post-body { padding: 16px 20px 20px; }
            .nav-links { display: none; }
            .nav-hamburger { display: block; }
            .nav-inner { padding: 0 16px; }
        }
        @media (max-width: 480px) {
            .nav-inner { padding: 0 12px; }
            .nav-brand { font-size: 15px; gap: 6px; }
            .nav-brand img { width: 24px; height: 24px; }
            .post-cover img { height: 140px; }
            .post-card--hero .post-cover img { height: 180px; }
            .post-card--hero h3 { font-size: 18px; }
            .post-body { padding: 14px 16px 18px; }
        }
    </style>
    <!-- Privacy-friendly analytics by Plausible -->
    <script async src="https://plausible.io/js/pa-K3DR1kRxwm1G-J9Q8KBme.js"></script>
    <script>
        window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
        plausible.init()
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
            <a href="/#roadmap">Journey</a>
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
    <a href="/#roadmap">Journey</a>
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
${FOOTER_HTML}
${MOBILE_NAV_JS}
${COOKIE_BANNER_HTML}
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
        writeFileSync(join(postDir, 'index.html'), blogTemplate(title, date, html, description, tags, slug, meta.cover, meta.ogImage));

        const cover = meta.cover || '';
        posts.push({ slug, title, date, description, tags, cover });
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

// --- Inject latest blog posts into index.html ---
const latestPosts = posts.slice(0, 3);
const blogPreviewCards = latestPosts.map(p => {
    const dateFormatted = new Date(p.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const coverImg = p.cover ? `<img src="${p.cover}" alt="${p.title}" loading="lazy">` : '';
    return `        <a href="/blog/${p.slug}/" class="blog-preview-card">
            ${coverImg}
            <div class="blog-preview-body">
                <span class="blog-preview-date">${dateFormatted}</span>
                <h3>${p.title}</h3>
                <p>${p.description.slice(0, 120)}${p.description.length > 120 ? '...' : ''}</p>
            </div>
        </a>`;
}).join('\n');

let indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');
indexHtml = indexHtml.replace('<!-- BLOG_PREVIEW_CARDS -->', blogPreviewCards);
writeFileSync(join(DIST, 'index.html'), indexHtml);

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
    ${GOOGLE_ADS_TAG}
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
        .nav-mobile { display: none; position: fixed; top: 56px; left: 0; right: 0; bottom: 0; background: #0a0a0a; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 49; padding: 24px; flex-direction: column; gap: 8px; overflow-y: auto; }
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
${FOOTER_CSS}
${COOKIE_BANNER_CSS}

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
            <a href="/#roadmap">Journey</a>
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
    <a href="/#roadmap">Journey</a>
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
${FOOTER_HTML}
${MOBILE_NAV_JS}
${COOKIE_BANNER_HTML}
</body>
</html>`;
}

const privacyContent = `
    <p>Hora Calendar is a native macOS application that connects to Google Calendar. Your privacy matters&nbsp;&mdash; here is exactly what we access and how we use it.</p>

    <h3>Data We Access</h3>
    <ul>
        <li>Google Calendar: events and calendars (read &amp; write)</li>
        <li>Google Other Contacts: names and emails (read only, for guest autocomplete)</li>
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
        <li>Hora does not operate any backend servers &mdash; there is no server-side data storage</li>
        <li>This website uses Plausible Analytics &mdash; a privacy-friendly, cookieless analytics service that does not collect any personal data or track visitors across sites</li>
    </ul>

    <h3>Website Cookies &amp; Advertising</h3>
    <p>The Hora Calendar macOS application does not set cookies or use any advertising tracking. The marketing website at horacal.app uses a limited set of third-party technologies:</p>
    <ul>
        <li><strong>Plausible Analytics</strong> &mdash; cookieless, privacy-friendly traffic analytics. No personal data, no cross-site tracking.</li>
        <li><strong>Google Ads conversion tracking</strong> &mdash; when you arrive from a Google Ads click, Google's gtag.js sets first-party cookies (<code>_gcl_au</code> and related) to measure whether you later complete the newsletter signup. This is used solely to report Ads campaign performance to us; Google may also use this data per its own policies. No GA4, no remarketing lists, no cross-site profiling is enabled on this site.</li>
    </ul>
    <p>You can opt out of Google Ads personalization at <a href="https://adssettings.google.com">adssettings.google.com</a>, or block these cookies in your browser.</p>

    <h3>Data Protection</h3>
    <ul>
        <li>All communication with Google APIs is encrypted in transit using HTTPS (TLS)</li>
        <li>OAuth authentication tokens are stored in the macOS Keychain, which provides hardware-backed encryption and is protected by your system login credentials</li>
        <li>Calendar data cached locally via SwiftData is stored within the macOS application sandbox, accessible only to Hora Calendar</li>
        <li>Hora requests only the minimum Google API scopes necessary to provide its functionality (calendar read/write, contacts read-only, user email)</li>
        <li>Hora does not use any artificial intelligence (AI) services or third-party AI integrations &mdash; your data is never processed by AI models</li>
        <li>No user data is collected, transmitted to, or stored on any external servers beyond the Google APIs required for calendar synchronization</li>
    </ul>

    <h3>Data Sharing</h3>
    <ul>
        <li>We do not share your data with anyone</li>
        <li>We do not sell your data</li>
        <li>We do not use your calendar, contacts, or app data for advertising or profiling (website Ads conversion cookies are described above and measure only signup completion)</li>
    </ul>

    <h3>Data Retention &amp; Deletion</h3>
    <ul>
        <li>Hora retains your data only on your local device for as long as you use the application</li>
        <li>Sign out in Hora Settings to remove all locally stored data, including cached calendar events and authentication tokens</li>
        <li>Uninstalling Hora removes all application data from your Mac</li>
        <li>Revoke access at <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a> to disconnect Hora from your Google account</li>
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
writeFileSync(join(privacyDir, 'index.html'), legalPageTemplate('Privacy Policy', 'April 14, 2026', privacyContent));

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

// --- Build features page ---
const featuresPageTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Features — hora Calendar</title>
    <meta name="description" content="Every feature in hora Calendar — a native macOS Google Calendar client. Week, month, day views, keyboard shortcuts, Pomodoro, availability sharing, and more.">
    <link rel="canonical" href="https://horacal.app/features/">
    <link rel="icon" href="/assets/hora-icon.png" type="image/png">
    ${GOOGLE_ADS_TAG}
    <meta property="og:title" content="Features — hora Calendar">
    <meta property="og:description" content="Every feature in hora Calendar — native macOS Google Calendar client built with Swift and SwiftUI.">
    <meta property="og:url" content="https://horacal.app/features/">
    <meta property="og:image" content="https://horacal.app/assets/og-image.png">
    <style>
        @font-face { font-family: 'Bumbbled'; src: url('/assets/Bumbbled.otf') format('opentype'); font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Medium.woff2') format('woff2'); font-weight: 500; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-SemiBold.woff2') format('woff2'); font-weight: 600; font-display: swap; }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --bg: #0A0A0A; --surface: #141414; --border: #222; --border-light: #2a2a2a; --text: #FAFAFA; --text-muted: #9CA3AF; --accent: #FF383C; --accent-glow: #FF736E; }
        body { font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; -webkit-font-smoothing: antialiased; min-height: 100vh; display: flex; flex-direction: column; }
        main { flex: 1; }
        .branded { font-family: 'Bumbbled', 'Geist', sans-serif; font-weight: 400; }
        .gradient-text { background: linear-gradient(135deg, var(--accent), var(--accent-glow)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        nav { position: sticky; top: 0; z-index: 50; background: rgba(10,10,10,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-inner { max-width: 960px; margin: 0 auto; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text); font-family: 'Bumbbled', 'Geist', sans-serif; font-weight: 400; font-size: 17px; }
        .nav-brand img { width: 28px; height: 28px; border-radius: 6px; }
        .nav-links { display: flex; align-items: center; gap: 24px; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 400; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .nav-links a.active { color: var(--text); }
        .nav-links a.btn { color: #fff; font-weight: 600; }
        .nav-links a.btn:hover { color: #fff; }
        .btn { display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, var(--accent), var(--accent-glow)); color: #fff; border: none; border-radius: 999px; padding: 8px 18px; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; transition: opacity 0.2s; }
        .btn:hover { opacity: 0.9; }
        .nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--text); }
        .nav-hamburger svg { display: block; }
        .nav-mobile { display: none; position: fixed; top: 56px; left: 0; right: 0; bottom: 0; background: #0a0a0a; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 49; padding: 24px; flex-direction: column; gap: 8px; overflow-y: auto; }
        .nav-mobile.open { display: flex; }
        .nav-mobile a { color: var(--text-muted); text-decoration: none; font-size: 18px; padding: 12px 0; border-bottom: 1px solid var(--border); }
        .nav-mobile a:hover { color: var(--text); }
        .nav-mobile a.btn { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--accent), var(--accent-glow)); color: #fff; font-weight: 600; border: none; border-radius: 999px; padding: 12px 24px; margin-top: 8px; font-size: 15px; }

        .features-hero { max-width: 960px; margin: 0 auto; padding: 64px 24px 48px; text-align: center; }
        .features-hero h1 { font-family: 'Bumbbled', 'Geist', sans-serif; font-size: 40px; font-weight: 400; margin-bottom: 12px; letter-spacing: -0.02em; }
        .features-hero p { font-size: 16px; color: var(--text-muted); max-width: 560px; margin: 0 auto; }

        .features-section { max-width: 960px; margin: 0 auto; padding: 0 24px 64px; }
        .features-section-label { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 20px; }
        .features-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

        .feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .feat-card { padding: 24px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); transition: all 0.2s; }
        .feat-card:hover { border-color: var(--border-light); }
        .feat-card h3 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
        .feat-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
        .feat-card .feat-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .feat-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; color: var(--text-muted); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 999px; padding: 3px 9px; }

        .feat-card-wide { grid-column: span 2; display: flex; gap: 32px; align-items: center; }
        .feat-card-wide .feat-text { flex: 1; }
        .feat-card-wide .feat-visual { flex-shrink: 0; font-size: 13px; color: var(--text-muted); background: var(--surface); border-radius: 8px; padding: 16px 20px; font-family: 'SF Mono', 'Fira Code', monospace; }
        .feat-card-wide .feat-visual .shortcut-row { display: flex; align-items: center; gap: 6px; padding: 6px 0; }
        .feat-card-wide .feat-visual .shortcut-keys { display: flex; gap: 3px; }
        .feat-card-wide .feat-visual kbd { display: inline-flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 5px; padding: 3px 8px; font-size: 12px; color: var(--text); font-family: inherit; min-width: 26px; text-align: center; }

        .feat-screenshot { max-width: 960px; margin: 0 auto; padding: 16px 24px 56px; position: relative; }
        .feat-screenshot::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 70%; height: 60%; background: radial-gradient(ellipse, rgba(255,56,60,0.08) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .feat-screenshot img { position: relative; z-index: 1; width: 100%; border-radius: 10px; box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.5), 0 0 80px rgba(255,56,60,0.04); }

${FOOTER_CSS}
${COOKIE_BANNER_CSS}

        @media (max-width: 768px) {
            .feat-grid { grid-template-columns: 1fr; }
            .feat-card-wide { grid-column: span 1; flex-direction: column; }
            .features-hero { padding: 40px 16px 32px; }
            .features-hero h1 { font-size: 30px; }
            .features-section { padding: 0 16px 48px; }
            .nav-links { display: none; }
            .nav-hamburger { display: block; }
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
            <a href="/features/" class="active">Features</a>
            <a href="/#roadmap">Journey</a>
            <a href="/blog/">Blog</a>
            <a href="/#download" class="btn">Get the App</a>
        </div>
        <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" onclick="toggleMobileNav()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
        </button>
    </div>
</nav>
<div class="nav-mobile" id="nav-mobile">
    <a href="/features/" onclick="closeMobileNav()">Features</a>
    <a href="/#roadmap" onclick="closeMobileNav()">Journey</a>
    <a href="/blog/" onclick="closeMobileNav()">Blog</a>
    <a href="/#download" class="btn" onclick="closeMobileNav()">Get the App</a>
</div>

<main>
<div class="features-hero">
    <h1 class="branded">Every <span class="gradient-text">Feature</span> in hora</h1>
    <p>A native macOS Google Calendar client built with Swift and SwiftUI. Here's everything it does today.</p>
</div>

<!-- Calendar Views -->
<div class="features-section">
    <div class="features-section-label">Calendar Views</div>
    <div class="feat-grid">
        <div class="feat-card">
            <h3>Week View</h3>
            <p>Full 7-day or 5-day work week with hourly grid. Color-coded events from multiple calendars, time indicators, and smooth scrolling. Click any empty slot to create an event instantly.</p>
            <div class="feat-badges"><span class="feat-badge">5/7 day toggle</span><span class="feat-badge">Hourly grid</span></div>
        </div>
        <div class="feat-card">
            <h3>Month View</h3>
            <p>Bird's eye view of your entire month with event density indicators. All-day events displayed as colored bars, timed events as compact rows. Click any day to drill down.</p>
            <div class="feat-badges"><span class="feat-badge">Event density</span><span class="feat-badge">All-day events</span></div>
        </div>
        <div class="feat-card">
            <h3>Day View</h3>
            <p>Focused single-day view with detailed time slots. See every event, meeting link, and attendee at a glance. Perfect for busy days with back-to-back meetings.</p>
            <div class="feat-badges"><span class="feat-badge">Detailed view</span><span class="feat-badge">Attendee list</span></div>
        </div>
        <div class="feat-card">
            <h3>Mini Calendar</h3>
            <p>Sidebar mini calendar for quick date navigation. Click any date to jump there instantly. Shows event density dots for each day.</p>
            <div class="feat-badges"><span class="feat-badge">Quick navigation</span></div>
        </div>
    </div>
</div>

<div class="feat-screenshot">
    <img src="/assets/features/views.webp" alt="hora Calendar — Week, Month, and Day views" loading="lazy">
</div>

<!-- Event Management -->
<div class="features-section">
    <div class="features-section-label">Event Management</div>
    <div class="feat-grid">
        <div class="feat-card">
            <h3>Create Events</h3>
            <p>Click an empty time slot or press ⌘N. Set title, time, calendar, location, description, and conference link. Optimistic UI — the event appears instantly before sync confirms.</p>
        </div>
        <div class="feat-card">
            <h3>Edit &amp; Delete</h3>
            <p>Click any event to edit. Change time, title, attendees, recurrence — everything syncs back to Google Calendar in real time. Delete with confirmation or ⌘⌫.</p>
        </div>
        <div class="feat-card">
            <h3>Drag &amp; Drop</h3>
            <p>Move events between days and time slots by dragging. Visual feedback shows the new position before you drop. Works across all calendar views.</p>
        </div>
        <div class="feat-card">
            <h3>Resize Events</h3>
            <p>Drag the bottom edge of any event to change its duration. The time updates live as you drag. Quick way to extend or shorten meetings.</p>
        </div>
        <div class="feat-card">
            <h3>Recurring Events</h3>
            <p>Full recurrence support — daily, weekly, monthly, yearly, custom patterns. Edit single occurrences or the entire series. Syncs with Google's recurrence rules.</p>
        </div>
        <div class="feat-card">
            <h3>Invitation Management</h3>
            <p>Accept, decline, or tentatively accept meeting invitations directly from hora. See pending invitations styled differently (dashed borders) so they stand out.</p>
            <div class="feat-badges"><span class="feat-badge">Accept</span><span class="feat-badge">Decline</span><span class="feat-badge">Maybe</span></div>
        </div>
    </div>
</div>

<div class="feat-screenshot feat-screenshot-sm">
    <img src="/assets/features/events.webp" alt="hora Calendar — Event creation and drag &amp; drop" loading="lazy">
</div>

<!-- Google Integration -->
<div class="features-section">
    <div class="features-section-label">Google Integration</div>
    <div class="feat-grid">
        <div class="feat-card">
            <h3>Multi-Account</h3>
            <p>Sign in with multiple Google accounts. Each account's calendars are color-coded and can be toggled independently. Work and personal calendars, one app.</p>
        </div>
        <div class="feat-card">
            <h3>Direct API</h3>
            <p>hora talks directly to Google Calendar REST API. No third-party servers, no middleware, no CalDAV translation layer. Your data goes straight between your Mac and Google.</p>
        </div>
        <div class="feat-card">
            <h3>Incremental Sync</h3>
            <p>Uses Google's sync tokens for efficient incremental updates. Only fetches what changed since the last sync. Configurable sync intervals — from 30 seconds to manual.</p>
        </div>
        <div class="feat-card">
            <h3>Google Meet</h3>
            <p>Add Google Meet conference links when creating events. One-click join button on events that have meeting links. No need to open a browser to find the link.</p>
        </div>
    </div>
</div>

<div class="feat-screenshot">
    <img src="/assets/features/sync.webp" alt="hora Calendar — Multi-account Google Calendar sync" loading="lazy">
</div>

<!-- Productivity -->
<div class="features-section">
    <div class="features-section-label">Productivity</div>
    <div class="feat-grid">
        <div class="feat-card-wide feat-card">
            <div class="feat-text">
                <h3>Keyboard Shortcuts</h3>
                <p>Full keyboard navigation inspired by Google Calendar. Navigate between views, create events, jump to today, and move between dates — all without touching the mouse.</p>
            </div>
            <div class="feat-visual">
                <div class="shortcut-row"><span class="shortcut-keys"><kbd>D</kbd><kbd>W</kbd><kbd>M</kbd></span> Switch views</div>
                <div class="shortcut-row"><span class="shortcut-keys"><kbd>⌘</kbd><kbd>N</kbd></span> New event</div>
                <div class="shortcut-row"><span class="shortcut-keys"><kbd>⌘</kbd><kbd>T</kbd></span> Jump to today</div>
                <div class="shortcut-row"><span class="shortcut-keys"><kbd>←</kbd><kbd>→</kbd></span> Navigate dates</div>
                <div class="shortcut-row"><span class="shortcut-keys"><kbd>⌘</kbd><kbd>⇧</kbd><kbd>A</kbd></span> Share availability</div>
            </div>
        </div>
        <div class="feat-card">
            <h3>Pomodoro Timer</h3>
            <p>Built-in Pomodoro timer in the day view. Start a focus session tied to your current task. Visual countdown in the sidebar — no need for a separate app.</p>
        </div>
        <div class="feat-card">
            <h3>Availability Sharing</h3>
            <p>Press ⌘⇧A to generate your free time slots using Google's FreeBusy API. Copies formatted availability to your clipboard. Paste into Slack, email, anywhere.</p>
        </div>
        <div class="feat-card">
            <h3>Menu Bar Widget</h3>
            <p>Always-visible menu bar widget shows your next upcoming event. Quick glance at what's next without switching to the calendar. Click to expand for more detail.</p>
        </div>
        <div class="feat-card">
            <h3>Go to Date</h3>
            <p>Jump to any date with the date picker or ⌘G. Navigate months and years without scrolling. Get to that meeting from 3 months ago in two clicks.</p>
        </div>
    </div>
</div>

<div class="feat-screenshot feat-screenshot-sm">
    <img src="/assets/features/productivity.webp" alt="hora Calendar — Menu bar widget with upcoming events" loading="lazy">
</div>

<!-- Appearance & Localization -->
<div class="features-section">
    <div class="features-section-label">Appearance &amp; Localization</div>
    <div class="feat-grid">
        <div class="feat-card">
            <h3>Light &amp; Dark Mode</h3>
            <p>Full support for light mode, dark mode, and auto (follows system). Carefully tuned contrast and opacity values for readability in both modes.</p>
        </div>
        <div class="feat-card">
            <h3>9 Languages</h3>
            <p>English, Polish, German, Spanish, French, Italian, Japanese, Portuguese, and Simplified Chinese. Interface adapts to your system language automatically.</p>
        </div>
        <div class="feat-card">
            <h3>Calendar Colors</h3>
            <p>Each calendar gets its own color, matching your Google Calendar settings. Events are color-coded so you can instantly tell which account and calendar they belong to.</p>
        </div>
        <div class="feat-card">
            <h3>Window State</h3>
            <p>hora remembers your window size and position between launches. Open it up and it's exactly where you left it. Plays nice with Stage Manager and Spaces.</p>
        </div>
    </div>
</div>

<div class="feat-screenshot feat-screenshot-sm">
    <img src="/assets/features/settings.webp" alt="hora Calendar — Appearance and language settings" loading="lazy">
</div>

<!-- Privacy & Technical -->
<div class="features-section">
    <div class="features-section-label">Privacy &amp; Technical</div>
    <div class="feat-grid">
        <div class="feat-card">
            <h3>Privacy First</h3>
            <p>No analytics on your calendar data. No third-party servers. No tracking. hora connects directly to Google — your events never touch any other server. Ever.</p>
        </div>
        <div class="feat-card">
            <h3>Native macOS</h3>
            <p>Built with Swift 6 and SwiftUI. No Electron, no web views, no browser engine. Uses a fraction of the memory and CPU compared to web-based alternatives.</p>
            <div class="feat-badges"><span class="feat-badge">Swift 6</span><span class="feat-badge">SwiftUI</span><span class="feat-badge">SwiftData</span></div>
        </div>
        <div class="feat-card">
            <h3>Notifications</h3>
            <p>Native macOS notifications for upcoming events. Uses the system notification center — supports Do Not Disturb, Focus modes, and notification grouping.</p>
        </div>
        <div class="feat-card">
            <h3>Xcode Cloud CI/CD</h3>
            <p>Every commit is tested, every build is reproducible. Automated builds via Xcode Cloud with TestFlight distribution for beta testers.</p>
        </div>
    </div>
</div>

</main>

${FOOTER_HTML}
${MOBILE_NAV_JS}
${COOKIE_BANNER_HTML}
</body>
</html>`;

const featuresDir = join(DIST, 'features');
mkdirSync(featuresDir, { recursive: true });
writeFileSync(join(featuresDir, 'index.html'), featuresPageTemplate);

// Add features to sitemap
sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf-8');
const today = new Date().toISOString().split('T')[0];
sitemap = sitemap.replace('</urlset>', `  <url>
    <loc>https://horacal.app/features/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`Built ${posts.length} blog post(s) → dist/blog/`);
console.log('Built legal pages → dist/privacy/, dist/terms/');
console.log('Built features page → dist/features/');
