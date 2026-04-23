#!/usr/bin/env node
// Submits all URLs from the sitemap to IndexNow.
// Run after a production deploy: `pnpm indexnow`.

const HOST = "horacal.app";
const KEY = "3857bebade48c515e65bbdf3fea1dedb";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function fetchSitemap() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  return res.text();
}

function parseUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function submit(urls) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  return { status: res.status, body: await res.text() };
}

const xml = await fetchSitemap();
const urls = parseUrls(xml);
if (urls.length === 0) {
  console.error("No URLs found in sitemap");
  process.exit(1);
}
console.log(`Submitting ${urls.length} URLs to IndexNow…`);
const result = await submit(urls);
console.log(`IndexNow → ${result.status}${result.body ? ` ${result.body}` : ""}`);
if (result.status < 200 || result.status >= 300) process.exit(1);
