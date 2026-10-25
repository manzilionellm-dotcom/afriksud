import {parse} from 'parse5';
export function inspectHtml(html) {
  const root = parse(html), links = [], jsonld = [], headings = [], errors = [];
  let canonical = '', robots = '', lang = '', title = '', visible = '', faqText = '';
  function text(node) { return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join(' '); }
  function walk(node, ignored = false, inFaq = false) {
    const attrs = Object.fromEntries((node.attrs || []).map(a => [a.name, a.value]));
    const tag = node.tagName;
    const skip = ignored || ['script', 'style', 'template', 'head'].includes(tag);
    const faq = inFaq || /faq/i.test(attrs.id || '') || /faq/i.test(attrs.class || '');
    if (tag === 'html') lang = attrs.lang || '';
    if (tag === 'meta' && attrs.name === 'robots') robots = attrs.content || '';
    if (tag === 'title') title = text(node).trim();
    if (tag === 'link' && attrs.rel === 'canonical') canonical = attrs.href;
    if (tag === 'link' && attrs.rel === 'alternate' && attrs.hreflang) links.push({lang: attrs.hreflang.toLowerCase(), href: attrs.href});
    if (tag === 'script' && attrs.type === 'application/ld+json') {
      try { const value = JSON.parse(text(node)); jsonld.push(...(Array.isArray(value) ? value : value['@graph'] || [value])); }
      catch { errors.push('Invalid initial HTML JSON-LD'); }
    }
    if (tag === 'a' && attrs.href) anchors.push({href: attrs.href, text: text(node).replace(/\s+/g, ' ').trim()});
    if (tag && /^h[1-6]$/.test(tag)) headings.push(text(node).trim());
    if (!skip && node.nodeName === '#text') { visible += ' ' + node.value; if (faq) faqText += ' ' + node.value; }
    for (const child of node.childNodes || []) walk(child, skip, faq);
  }
  const anchors = []; walk(root);
  return {canonical, robots, lang, title, links, jsonld, headings, errors, anchors, visible: visible.replace(/\s+/g,' ').trim(), faqText: faqText.replace(/\s+/g,' ').trim()};
}
export const normalize = url => new URL(url, 'https://iptvmzansi.com').pathname.replace(/\/$/, '') || '/';
