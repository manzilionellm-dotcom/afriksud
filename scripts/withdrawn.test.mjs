// node scripts/withdrawn.mjs && node --test scripts/withdrawn.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
const cfg = JSON.parse(await readFile('.vercel/output/config.json', 'utf8'));
const route = (path) => cfg.routes.find((r) => !r.continue && new RegExp(r.src).test(path));
test('only the 410 page, robots.txt and an empty sitemap are published', async () => {
  assert.deepEqual((await readdir('.vercel/output/static')).sort(), ['410.html', 'robots.txt', 'sitemap.xml']);
  await assert.rejects(readdir('.vercel/output/functions'));
});
for (const path of ["/", "/af", "/af/language/iptv-afrikaans", "/en-ae", "/en-ae/sa-abroad/qatar", "/en-ae/sa-abroad/saudi-arabia", "/en-ae/sa-abroad/uae", "/en-au"]) {
  test(`${path} answers 410 with noindex`, () => {
    const r = route(path);
    assert.equal(r.status, 410); assert.equal(r.dest, '/410.html'); assert.equal(r.headers['X-Robots-Tag'], 'noindex');
  });
}
test('robots.txt stays crawlable and the sitemap lists no URL', async () => {
  assert.equal(route('/robots.txt').dest, '/robots.txt');
  assert.match(await readFile('.vercel/output/static/robots.txt', 'utf8'), /^User-agent: \*\nAllow: \/$/m);
  assert.doesNotMatch(await readFile('.vercel/output/static/sitemap.xml', 'utf8'), /<loc>/);
});
test('the 410 page carries no offer, price or contact link', async () => {
  const html = await readFile('.vercel/output/static/410.html', 'utf8');
  assert.match(html, /noindex/);
  assert.doesNotMatch(html, /href=|wa\.me|whatsapp|\$|€|CAD|AED|ZAR|kr\b|subscri|abonn|trial|essai/i);
});
