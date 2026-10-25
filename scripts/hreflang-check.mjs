#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {inspectHtml, normalize} from './html-audit.mjs';
export function validateCircles(pages) {
  const errors = [];
  for (const [url, page] of pages) {
    if (!page.links.length) continue;
    const map = new Map(page.links.map(l => [l.lang, normalize(l.href)]));
    if (map.size !== page.links.length) errors.push(`${url}: duplicate hreflang`);
    if (!page.links.some(l => normalize(l.href) === url && l.lang === page.lang.toLowerCase())) errors.push(`${url}: missing self alternate for ${page.lang}`);
    for (const link of page.links) {
      const target = normalize(link.href), other = pages.get(target);
      if (!other) { errors.push(`${url}: missing alternate ${target}`); continue; }
      if (!/noindex/.test(page.robots) && /noindex/.test(other.robots)) errors.push(`${url}: indexable alternate targets noindex ${target}`);
      if (normalize(other.canonical || target) !== target) errors.push(`${url}: alternate ${target} canonicalizes elsewhere`);
      if (link.lang !== 'x-default' && other.lang.toLowerCase() !== link.lang) errors.push(`${url}: wrong language at ${target}`);
      for (const [language, dest] of map) {
        if (!other.links.some(l => l.lang === language && normalize(l.href) === dest)) errors.push(`${url}: ${target} lacks return alternate ${language} → ${dest}`);
      }
    }
    if (/^\/en-(gb|za)(\/|$)/.test(url) && !/noindex/.test(page.robots) && normalize(page.canonical || url) === url) {
      // Single-locale pages (free trial, genuinely absent translations) are not invented alternates.
      const sibling = url.replace(/^\/en-(gb|za)/, url.startsWith('/en-gb') ? '/en-za' : '/en-gb');
      const other = pages.get(sibling);
      if (other && !/noindex/.test(other.robots) && normalize(other.canonical || sibling) === sibling && !page.links.some(l => normalize(l.href) === sibling)) errors.push(`${url}: missing reciprocal GB/ZA sibling`);
    }
  }
  return [...new Set(errors)];
}
export async function loadBuiltPages(root = '.next/server/app') {
  const pages = new Map();
  const walk = dir => { for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    const file=path.join(dir,entry.name);
    if(entry.isDirectory()) walk(file);
    else if(entry.name.endsWith('.html')) {
      const html=fs.readFileSync(file,'utf8'), info=inspectHtml(html);
      // Route comes from filename, not canonical (otherwise noncanonical pages overwrite targets).
      const url='/' + path.relative(root,file).replace(/\.html$/,'').split(path.sep).filter(p=>!/^\(.+\)$/.test(p)).join('/');
      if (!url.includes('[')) pages.set(url === '/index' ? '/' : url, info);
    }
  }}; walk(root); return pages;
}
if (process.argv[1]?.endsWith('/hreflang-check.mjs') || process.argv[1] === 'scripts/hreflang-check.mjs') {
  const pages=await loadBuiltPages(process.argv[2] || '.next/server/app');
  const errors=validateCircles(pages);
  if (!pages.size) errors.push('No built HTML found; run next build first.');
  fs.mkdirSync('reports',{recursive:true});
  const result={pages:pages.size,errors,ok:errors.length===0};
  fs.writeFileSync('reports/hreflang.json',JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({...result,errors:errors.slice(0,30)},null,2));
  process.exitCode=result.ok?0:1;
}
