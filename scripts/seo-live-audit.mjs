#!/usr/bin/env node
// Read-only production audit. Exit 1 only for confirmed problems on sitemap URLs.
// Network failures remain "unknown"; they are not evidence that production is down.
import { writeFileSync } from "node:fs";

const origin = "https://iptvmzansi.com";
const sitemapUrl = `${origin}/sitemap.xml`;
const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};
const limit = Math.max(0, Number(option("--limit", "0")) || 0);
const concurrency = Math.min(8, Math.max(1, Number(option("--concurrency", "4")) || 4));
const outputPath = option("--json", "");

async function request(url) {
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
    headers: { "user-agent": "MzansiSeoQualityAudit/1.0" },
  });
  return response;
}

function extractUrls(xml) {
  return [...xml.matchAll(/<loc>\s*(https?:\/\/[^<]+)\s*<\/loc>/g)]
    .map((match) => match[1].trim().replaceAll("&amp;", "&"));
}

function htmlTag(html, name, value) {
  const tags = html.match(/<(?:link|meta)\b[^>]*>/gi) ?? [];
  return tags.find((tag) => {
    const attr = tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, "i"));
    return attr?.[1].toLowerCase() === value;
  });
}

function attribute(tag, name) {
  return tag?.match(new RegExp(`\\b${name}=["']([^"']+)["']`, "i"))?.[1] ?? null;
}

async function inspect(url) {
  const result = { url, status: null, finalUrl: null, canonical: null, robots: null, issue: null };
  try {
    const response = await request(url);
    result.status = response.status;
    result.finalUrl = response.url;
    if (!response.ok) {
      result.issue = `HTTP_${response.status}`;
      return result;
    }
    if (response.url !== url) {
      result.issue = "REDIRECT_IN_SITEMAP";
      return result;
    }
    const type = response.headers.get("content-type") ?? "";
    if (!type.includes("text/html")) {
      result.issue = "NON_HTML_SITEMAP_URL";
      return result;
    }
    const html = await response.text();
    result.canonical = attribute(htmlTag(html, "rel", "canonical"), "href");
    result.robots = attribute(htmlTag(html, "name", "robots"), "content");
    if (/\bnoindex\b/i.test(result.robots ?? "") || /\bnoindex\b/i.test(response.headers.get("x-robots-tag") ?? "")) {
      result.issue = "NOINDEX_IN_SITEMAP";
    } else if (!result.canonical) {
      result.issue = "MISSING_CANONICAL";
    } else if (result.canonical !== url) {
      result.issue = "NON_SELF_CANONICAL";
    }
  } catch (error) {
    result.issue = "UNKNOWN_NETWORK_ERROR";
    result.error = String(error?.message ?? error);
  }
  return result;
}

async function main() {
  const sitemap = await request(sitemapUrl);
  if (!sitemap.ok) throw new Error(`Sitemap HTTP ${sitemap.status}`);
  const urls = extractUrls(await sitemap.text());
  if (!urls.length) throw new Error("No sitemap URLs found");
  if (urls.some((url) => new URL(url).origin !== origin)) throw new Error("Foreign origin in sitemap");
  const unique = [...new Set(urls)];
  const selected = limit ? unique.slice(0, limit) : unique;
  const results = new Array(selected.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (cursor < selected.length) {
      const index = cursor++;
      results[index] = await inspect(selected[index]);
    }
  }));
  const issues = results.filter((row) => row.issue && row.issue !== "UNKNOWN_NETWORK_ERROR");
  const unknown = results.filter((row) => row.issue === "UNKNOWN_NETWORK_ERROR");
  const report = { auditedAt: new Date().toISOString(), sitemapUrl, sitemapCount: urls.length,
    uniqueCount: unique.length, checked: results.length, confirmedIssues: issues.length,
    unknownNetwork: unknown.length, duplicates: urls.length - unique.length, results };
  if (outputPath) writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify({ auditedAt: report.auditedAt, sitemapCount: report.sitemapCount,
    checked: report.checked, confirmedIssues: report.confirmedIssues,
    unknownNetwork: report.unknownNetwork, duplicates: report.duplicates }));
  for (const row of issues) console.error(`${row.issue}: ${row.url} (${row.canonical ?? row.status})`);
  if (issues.length || report.duplicates) process.exitCode = 1;
}

main().catch((error) => { console.error(`Audit unavailable: ${error.message}`); process.exitCode = 2; });
