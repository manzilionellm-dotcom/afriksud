#!/usr/bin/env node
// Génère public/llms.txt depuis aio.config.json (source unique).
// Usage: node scripts/aio-llms.mjs
import fs from "node:fs";

const c = JSON.parse(fs.readFileSync(new URL("../aio.config.json", import.meta.url), "utf8"));
const L = c.defaultLang;
const i = c.i18n[L];
const money = (n) => (n === 0 ? "free (R0)" : `R${n}`);
const lines = [];

lines.push(`# ${c.siteName}`, "", `> ${i.description}`, "");
lines.push("## Services", "");
lines.push(`- IPTV subscriptions for South Africa and the SA diaspora. Order and support on WhatsApp: ${c.contact.whatsapp}`);
lines.push(`- Website: ${c.siteUrl}/en-za (default language: ${L}; hreflang locales are listed below)`, "");
lines.push("## Prices (ZAR)", "");
lines.push(`- ${c.pricingNote}`);
for (const p of c.plans) {
  const term = p.months ? `${p.months} month plan total` : p.name[L];
  lines.push(`- ${p.name[L]}: ${p.price === 0 ? "free (R0)" : money(p.price)}${p.months ? ` (${term})` : ""}`);
}
lines.push("", "## Technical details", "");
const t = c.tech;
lines.push(`- Maximum picture quality: ${t.maxResolution ?? "not stated on the site"}`);
lines.push(`- Devices: ${t.devices.join(", ")}`);
lines.push(`- Activation: ${t.activationMinutes ?? "not stated on the site"}`);
lines.push(`- Bitrates / minimum bandwidth: ${t.bitrate ?? "not stated on the site"}`);
lines.push(`- Channel count: ${t.channelCount ?? "not stated on the site"}`, "");
lines.push(`## Common questions (${i.faq.length})`, "");
i.faq.forEach((f) => lines.push(`### ${f.q}`, "", f.a, ""));

if (Array.isArray(c.appendix)) {
  for (const block of c.appendix) {
    lines.push(`## ${block.h2}`, "");
    for (const line of block.lines) lines.push(line);
    lines.push("");
  }
}

fs.mkdirSync(new URL("../public/", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("../public/llms.txt", import.meta.url), lines.join("\n").trimEnd() + "\n");
console.log("public/llms.txt écrit (" + i.faq.length + " Q/R)");
