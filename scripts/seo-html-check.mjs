#!/usr/bin/env node
import fs from 'node:fs';
import {loadBuiltPages} from './hreflang-check.mjs';
import {normalize} from './html-audit.mjs';
const pages=await loadBuiltPages();
const problems=[];
for(const [url,p] of pages) {
  if (/^\/(en-[a-z]{2}|af|zu|xh|fr|pt-mz)(\/|$)/.test(url) && !p.canonical) problems.push(`${url}: missing canonical`);
  for(const error of p.errors) problems.push(`${url}: ${error}`);
  if(/\bM3U\b|every[- ]match|100x|1,?200\+?\s+(?:expats|customers|viewers)|mailto:/i.test(p.visible) || p.anchors.some(a=>/^mailto:/i.test(a.href))) problems.push(`${url}: forbidden sales wording or mailto`);
  if(p.visible.includes('TiviMate') && p.visible.split('TiviMate').length !== p.faqText.split('TiviMate').length) problems.push(`${url}: TiviMate outside FAQ`);
  const faq=p.jsonld.filter(n=>n['@type']==='FAQPage');
  if(faq.length>1) problems.push(`${url}: ${faq.length} FAQPage schemas`);
  for(const schema of faq) for(const q of schema.mainEntity || []) {
    const normalizeText=s=>s.replace(/\s+/g,' ').trim();
    if(!normalizeText(p.visible).includes(normalizeText(q.acceptedAnswer.text))) problems.push(`${url}: FAQ answer absent from initial HTML: ${q.name}`);
  }
  if(p.jsonld.some(n=>n['@type']==='HowTo')) problems.push(`${url}: deprecated HowTo schema`);
}
const slugs=[...fs.readFileSync('lib/seo/blog-guides.ts','utf8').matchAll(/^\s+slug: "([^"]+)"/gm)].map(m=>m[1]);
if(slugs.length!==12) problems.push(`Expected 12 run-005 slugs, found ${slugs.length}`);
for(const slug of slugs) for(const locale of ['en-za','en-gb','en-au','en-us']) {
 const p=pages.get(`/${locale}/blog/${slug}`);
 if(!p || !p.headings.length || p.visible.split(/\s+/).length<300) problems.push(`Missing or thin run-005 page: ${locale}/${slug}`);
}
for(const locale of ['en-za','en-gb','en-au','en-us','af','zu']) {
 const p=pages.get('/'+locale);
 if(!p || p.jsonld.filter(n=>n['@type']==='FAQPage').length!==1 || !p.faqText) problems.push(`Missing open single FAQPage on ${locale}`);
}
const llms=fs.readFileSync('public/llms.txt','utf8');
for(const m of llms.matchAll(/https:\/\/iptvmzansi\.com[^\s)]+/g)) {
 const path=normalize(m[0]); const target=pages.get(path);
 if(target && /noindex/.test(target.robots)) problems.push(`llms.txt references noindex page: ${path}`);
 if(/\/legal\/(popia|terms|about)/.test(path)) problems.push(`llms.txt references noindexed legal URL: ${path}`);
}
if(!/Privacy questions go to WhatsApp: https:\/\/wa.me\//.test(llms)) problems.push('Missing WhatsApp privacy contact');
const tech=JSON.parse(fs.readFileSync('public/tech-specs.json','utf8'));
if(tech.units!=='Mbps') problems.push('Tech specs units must be Mbps');
if(!pages.get('/en-za/4k-iptv-south-africa')?.anchors.some(a=>a.href==='/tech-specs.json')) problems.push('4K page missing tech specs link');
if(!pages.size) problems.push('No built HTML found');
const result={pages:pages.size,run005Slugs:slugs.length,run005LocalePages:slugs.length*4,problems,ok:!problems.length};
fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/seo-html.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({...result,problems:problems.slice(0,25)},null,2));process.exitCode=result.ok?0:1;
