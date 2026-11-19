#!/usr/bin/env node
import fs from 'node:fs';
const evidence=JSON.parse(fs.readFileSync('lib/seo/evidence.json','utf8'));
const tech=JSON.parse(fs.readFileSync('public/tech-specs.json','utf8'));
const blockers=[];
if(evidence.reviews.length!==12) blockers.push(`Need 12 genuine reviews; supplied ${evidence.reviews.length}.`);
for(const r of evidence.reviews) if(!r.consent || !r.name || !r.city || !r.country || !r.text || !/^https:\/\//.test(r.source || '') || !Number.isFinite(Date.parse(r.date))) blockers.push(`Incomplete review ${r.id || '(no id)'}.`);
for(const country of ['ZA','GB','AU','US']) if(!evidence.reviews.some(r=>r.country===country)) blockers.push(`Missing review source for ${country}.`);
for(const topic of ['Soweto Derby','Currie Cup Final','Proteas']) if(!evidence.broadcasts.some(b=>b.name.includes(topic) && b.confirmed && Date.parse(b.startDate)>Date.now() && b.source && b.url && b.competitors?.length>=2)) blockers.push(`No verified upcoming ${topic} broadcast.`);
for(const language of ['af','zu']) if(!evidence.nativeReview[language]?.reviewer || !evidence.nativeReview[language]?.revision || !evidence.nativeReview[language]?.approvedAt) blockers.push(`Native ${language} reviewer approval missing.`);
for(const tier of tech.tiers) if(!(tier.peakMbps>0) || !(tier.averageMbps>0) || !tier.observedAt || !tier.evidenceRef) blockers.push(`Measured HLS evidence missing: ${tier.tier}.`);
const report={ready:!blockers.length,blockers};fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/evidence.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));process.exitCode=report.ready?0:1;
