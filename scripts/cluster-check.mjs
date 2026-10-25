#!/usr/bin/env node
import fs from 'node:fs';
import {inspectHtml,normalize} from './html-audit.mjs';
import {validateCircles} from './hreflang-check.mjs';
const base=process.argv[2] || 'http://localhost:3000';
const catalogue=JSON.parse(fs.readFileSync('lib/seo/clusters/catalogue.json','utf8'));
const cities=JSON.parse(fs.readFileSync('lib/seo/australia/cities.json','utf8'));
const pillar=JSON.parse(fs.readFileSync('lib/seo/australia/pillar.json','utf8'));
const langs=['en','af','zu'];
const routes=[];
for(const lang of langs) for(const slug of ['supersport','perth','sydney','melbourne','brisbane']) routes.push({path:`/australia/${lang==='en'?'':lang+'/'}${slug}`,pillar:`/australia/${lang==='en'?'':lang+'/'}supersport`,lang,slug,region:'AU',data:slug==='supersport'?pillar[lang]:cities[slug][lang],satellite:slug!=='supersport'});
for(const c of catalogue) for(const lang of langs) {
 const root=`/${c.slug}${lang==='en'?'':'/'+lang}`;
 const parent=root+(c.family==='countries'?'/supersport':'');
 routes.push({path:parent,pillar:parent,lang,region:c.region,satellite:false});
 for(const s of c.satellites) routes.push({path:root+'/'+s.slug,pillar:parent,lang,region:c.region,satellite:true});
}
const pages=new Map(),problems=[],anchors=[],wordCounts=[];
// Bounded batches avoid swamping the local Next server.
for(let i=0;i<routes.length;i+=8) await Promise.all(routes.slice(i,i+8).map(async route=>{
 try {
 const r=await fetch(base+route.path,{redirect:'manual',signal:AbortSignal.timeout(30000)});
 if(r.status!==200) { problems.push(`${route.path}: HTTP ${r.status}`);return; }
 const html=await r.text(),page=inspectHtml(html);pages.set(route.path,page);
 if(page.lang!==`${route.lang}-${route.region}`) problems.push(`${route.path}: HTML language ${page.lang}`);
 if(normalize(page.canonical)!==route.path) problems.push(`${route.path}: canonical mismatch`);
 if(page.jsonld.some(n=>['FAQPage','HowTo'].includes(n['@type']))) problems.push(`${route.path}: unwanted FAQ/HowTo schema`);
 if(!page.jsonld.some(n=>n['@type']==='Article')) problems.push(`${route.path}: missing initial HTML Article`);
 const article=html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] || '';
 if(route.satellite) {
   if(!page.anchors.some(a=>normalize(a.href)===route.pillar)) problems.push(`${route.path}: missing pillar link`);
   const firstLink=article.indexOf(`href="${route.pillar}"`);
   const before=inspectHtml(article.slice(0,firstLink)).visible.split(/\s+/).filter(Boolean).length;
   if(firstLink<0 || before>200) problems.push(`${route.path}: pillar link after ${before} words`);
   // Count editorial body only, excluding navigation, author, CTA and cross-link directories.
   let text;
   if(route.data) text=[route.data.title,route.data.lead,...route.data.sections.flatMap(s=>[s.title,...s.paragraphs])].join(' ');
   else {
     const lead=article.match(/<p class="au-lead">([\s\S]*?)<\/p>/)?.[1] || '';
     const body=article.match(/<section data-cluster-body="[^"]*">([\s\S]*?)<\/section>/)?.[1] || '';
     text=inspectHtml(lead+' '+body).visible;
   }
   const words=text.split(/\s+/).filter(Boolean).length;wordCounts.push({path:route.path,words});
   if(words<300 || words>500) problems.push(`${route.path}: ${words} editorial words (expected 300–500)`);
 }
 for(const a of page.anchors) if(a.href.startsWith('/')) anchors.push({from:route.path,to:a.href,anchor:a.text});
 } catch {problems.push(`${route.path}: request failed`);}
}));
problems.push(...validateCircles(pages));
for(const route of routes.filter(r=>r.satellite)) if(!pages.get(route.pillar)?.anchors.some(a=>normalize(a.href)===route.path)) problems.push(`${route.pillar}: missing satellite ${route.path}`);
for(const locale of ['en-za','af','zu']) for(const path of [`/${locale}`,`/${locale}/devices`,`/${locale}/sa-abroad`]) {
 const response=await fetch(base+path),page=inspectHtml(await response.text());
 for(const route of routes.filter(r=>!r.satellite && r.lang===(locale==='en-za'?'en':locale))) if(!page.anchors.some(a=>normalize(a.href)===route.path)) problems.push(`${path}: missing cluster link ${route.path}`);
 for(const a of page.anchors) if(routes.some(r=>r.path===normalize(a.href))) anchors.push({from:path,to:a.href,anchor:a.text});
}
fs.mkdirSync('reports',{recursive:true});
const result={routes:routes.length,rendered:pages.size,satellites:wordCounts.length,minWords:Math.min(...wordCounts.map(x=>x.words)),maxWords:Math.max(...wordCounts.map(x=>x.words)),problems,ok:!problems.length};
fs.writeFileSync('reports/clusters.json',JSON.stringify({...result,wordCounts},null,2)+'\n');
const csv=v=>'"'+String(v).replaceAll('"','""')+'"';
fs.writeFileSync('docs/seo/internal-anchors.csv','source,target,anchor\n'+anchors.map(a=>[a.from,a.to,a.anchor].map(csv).join(',')).join('\n')+'\n');
console.log(JSON.stringify({...result,problems:problems.slice(0,35)},null,2));process.exitCode=result.ok?0:1;
