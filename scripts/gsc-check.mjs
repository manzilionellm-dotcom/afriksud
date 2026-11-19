#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

export async function checkVerification(env = process.env, request = fetch) {
  const present = key => Boolean(env[key]?.trim());
  const result = {
    gsc_key_present: ["GSC_OAUTH_CLIENT_ID", "GSC_OAUTH_CLIENT_SECRET", "GSC_OAUTH_REFRESH_TOKEN"].every(present),
    bing_key_present: present("BING_WEBMASTER_API_KEY"),
    google_meta_present: present("GOOGLE_SITE_VERIFICATION"),
    bing_meta_present: present("BING_SITE_VERIFICATION"),
    google_verified: false, bing_verified: false, errors: [],
  };
  const site = env.GSC_SITE_URL || "https://iptvmzansi.com/";
  if (site !== "https://iptvmzansi.com/") result.errors.push("Use the exact https://iptvmzansi.com/ URL-prefix property.");
  if (!result.gsc_key_present) result.errors.push("gsc_key_present=false: configure the three GSC OAuth secrets.");
  if (!result.bing_key_present) result.errors.push("BING_WEBMASTER_API_KEY missing.");
  if (!result.google_meta_present || !result.bing_meta_present) result.errors.push("Public verification meta token missing.");
  const json = async (url, options = {}) => {
    const r = await request(url, { ...options, signal: AbortSignal.timeout(15000), redirect: "error" });
    // Never include request URLs, credentials or response bodies in errors/logs.
    if (!r.ok) throw new Error(`Verification API HTTP ${r.status}`);
    return r.json();
  };
  if (result.gsc_key_present) {
    try {
      const token = await json("https://oauth2.googleapis.com/token", {
        method: "POST", headers: {"content-type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({client_id: env.GSC_OAUTH_CLIENT_ID, client_secret: env.GSC_OAUTH_CLIENT_SECRET,
          refresh_token: env.GSC_OAUTH_REFRESH_TOKEN, grant_type: "refresh_token"}),
      });
      if (!token.access_token) throw new Error("Missing access token");
      const data = await json(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}`, {
        headers: {Authorization: `Bearer ${token.access_token}`},
      });
      result.google_verified = data.siteUrl === site && data.permissionLevel === "siteOwner";
      if (!result.google_verified) result.errors.push("Google property is not verified for this owner credential.");
    } catch { result.errors.push("Google verification failed (credentials, permissions or API availability)."); }
  }
  if (result.bing_key_present) {
    try {
      const data = await json(`https://ssl.bing.com/webmaster/api.svc/json/GetUserSites?apikey=${encodeURIComponent(env.BING_WEBMASTER_API_KEY)}`);
      const sites = Array.isArray(data.d) ? data.d : [];
      result.bing_verified = sites.some(s => s.IsVerified === true && s.Url?.replace(/\/$/, "") === site.replace(/\/$/, ""));
      if (!result.bing_verified) result.errors.push("Bing property is not verified.");
    } catch { result.errors.push("Bing verification failed (credentials, permissions or API availability)."); }
  }
  result.ok = result.gsc_key_present && result.google_verified && result.bing_verified && result.errors.length === 0;
  return result;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = await checkVerification();
  mkdirSync("reports", {recursive: true});
  writeFileSync("reports/webmaster-verification.json", JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.ok ? 0 : 1;
}
