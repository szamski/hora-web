import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, cpSync, rmSync } from 'fs';
import { join, basename } from 'path';
import { marked } from 'marked';

const ROOT = import.meta.dirname;
const DIST = join(ROOT, 'dist');
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

// --- Blog template (matches site design) ---
function blogTemplate(title, date, content, description, tags) {
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
    <link rel="canonical" href="https://horacal.app/blog/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}/">
    <link rel="icon" href="/assets/hora-icon.png" type="image/png">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="https://horacal.app/assets/og-image.png">
    <meta property="og:site_name" content="hora Calendar">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@moto_szama">
    <style>
        @font-face { font-family: 'Bumbbled'; src: url('/assets/Bumbbled.otf') format('opentype'); font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Regular.woff2') format('woff2'); font-weight: 400; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Medium.woff2') format('woff2'); font-weight: 500; font-display: swap; }
        @font-face { font-family: 'Geist'; src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-SemiBold.woff2') format('woff2'); font-weight: 600; font-display: swap; }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --bg: #0A0A0A; --surface: #141414; --border: #222; --text: #FAFAFA; --text-muted: #888; --accent: #FF383C; --accent-glow: #FF736E; --max-w: 720px; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; -webkit-font-smoothing: antialiased; }
        .branded { font-family: 'Bumbbled', 'Geist', sans-serif; font-weight: 400; }

        nav { position: sticky; top: 0; z-index: 100; background: rgba(10,10,10,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 14px 24px; }
        .nav-inner { max-width: var(--max-w); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--text); font-weight: 600; font-size: 16px; }
        .nav-brand img { border-radius: 6px; }
        .nav-links { display: flex; gap: 20px; align-items: center; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }

        article { max-width: var(--max-w); margin: 0 auto; padding: 64px 24px 80px; }
        article .meta { color: var(--text-muted); font-size: 14px; margin-bottom: 8px; }
        .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; }
        .tag { display: inline-block; font-size: 12px; color: var(--text-muted); background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 3px 10px; text-decoration: none; transition: all 0.2s; }
        .tag:hover { border-color: var(--accent); color: var(--accent); }
        article h1 { font-size: 36px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 16px; }
        article h2 { font-size: 24px; font-weight: 600; margin-top: 48px; margin-bottom: 16px; letter-spacing: -0.01em; }
        article h3 { font-size: 18px; font-weight: 600; margin-top: 32px; margin-bottom: 12px; }
        article p { color: var(--text-muted); margin-bottom: 20px; font-size: 16px; }
        article a { color: var(--accent); text-decoration: none; }
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
            <a href="/blog/">Blog</a>
            <a href="/#features">Features</a>
            <a href="/#download">Get the App</a>
        </div>
    </div>
</nav>
<article>
    <a href="/blog/" class="back-link">&larr; All posts</a>
    <p class="meta">${date}</p>
    <h1>${title}</h1>
    ${tagsHtml}
    ${content}
</article>
<footer>
    <p>&copy; 2026 hora Calendar. Developed by <a href="https://szamowski.dev" style="color: #555; text-decoration: none;">szamowski.dev</a></p>
</footer>
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
        :root { --bg: #0A0A0A; --surface: #141414; --surface-hover: #1a1a1a; --border: #222; --text: #FAFAFA; --text-muted: #888; --accent: #FF383C; --accent-glow: #FF736E; --max-w: 720px; }
        body { font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased; }
        .branded { font-family: 'Bumbbled', 'Geist', sans-serif; font-weight: 400; }
        .gradient-text { background: linear-gradient(135deg, var(--accent), var(--accent-glow)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        nav { position: sticky; top: 0; z-index: 100; background: rgba(10,10,10,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 14px 24px; }
        .nav-inner { max-width: var(--max-w); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--text); font-weight: 600; font-size: 16px; }
        .nav-brand img { border-radius: 6px; }
        .nav-links { display: flex; gap: 20px; align-items: center; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }

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
            <a href="/blog/">Blog</a>
            <a href="/#features">Features</a>
            <a href="/#download">Get the App</a>
        </div>
    </div>
</nav>
<div class="blog-header">
    <h1 class="branded">hora <span class="gradient-text">Blog</span></h1>
    <p>Updates, dev logs, and announcements.</p>
</div>
<div class="posts">
    ${postList || '<p class="empty">No posts yet. Stay tuned!</p>'}
</div>
<footer>
    <p>&copy; 2026 hora Calendar. Developed by <a href="https://szamowski.dev" style="color: #555; text-decoration: none;">szamowski.dev</a></p>
</footer>
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
        if (key && rest.length) meta[key.trim()] = rest.join(':').trim();
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
        writeFileSync(join(postDir, 'index.html'), blogTemplate(title, date, html, description, tags));

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

sitemap = sitemap.replace('</urlset>', `${blogIndexUrl}\n${blogUrls}\n</urlset>`);
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`Built ${posts.length} blog post(s) → dist/blog/`);
