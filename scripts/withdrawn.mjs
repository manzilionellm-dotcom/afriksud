// Withdrawn build (2026-11-20). Every URL answers 410 Gone with noindex; robots.txt
// stays open so search engines can read the 410s; the sitemap is empty; nothing else
// is deployed. The previous site source is unchanged and unused; vercel.json points
// here. Why and how to restore: docs/withdrawal-2026-11-20.md.
import { mkdir, rm, writeFile } from 'node:fs/promises';
const origin = "https://iptvmzansi.com";
const out = '.vercel/output';
await rm(out, { recursive: true, force: true });
await mkdir(`${out}/static`, { recursive: true });
await writeFile(`${out}/static/410.html`, "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"robots\" content=\"noindex\"><title>This page has been withdrawn.</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0b0d;color:#f2f2f4;font:16px/1.5 system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif}main{max-width:36rem;padding:2rem}h1{font-size:1.5rem;margin:1.2rem 0 .4rem}p{color:#b5b5bb;margin:0}</style></head><body><main><section lang=\"en\"><h1>This page has been withdrawn.</h1><p>The content previously published at this address is no longer available.</p></section></main></body></html>\n");
await writeFile(`${out}/static/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(`${out}/static/sitemap.xml`, '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n');
const security = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' };
const routes = [
  { src: '/(.*)', headers: security, continue: true },
  { src: '^/robots\\.txt$', dest: '/robots.txt', headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } },
  { src: '^/sitemap\\.xml$', dest: '/sitemap.xml', headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=0, must-revalidate' } },
  { src: '/(.*)', dest: '/410.html', status: 410, headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-store' } },
];
await writeFile(`${out}/config.json`, JSON.stringify({ version: 3, routes }, null, 2));
console.log('Withdrawn build: every URL → 410 noindex; robots.txt open; empty sitemap.');
