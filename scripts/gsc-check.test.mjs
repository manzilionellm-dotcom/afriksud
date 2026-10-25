import test from "node:test";
import assert from "node:assert/strict";
import {checkVerification} from "./gsc-check.mjs";
const env = Object.fromEntries(["GSC_OAUTH_CLIENT_ID", "GSC_OAUTH_CLIENT_SECRET", "GSC_OAUTH_REFRESH_TOKEN", "GOOGLE_SITE_VERIFICATION", "BING_SITE_VERIFICATION", "BING_WEBMASTER_API_KEY"].map(k => [k, "test-secret"]));
const mock = (permission = "siteOwner", verified = true) => async url => ({ok: true, json: async () =>
 url.includes("oauth2") ? {access_token: "test-access"} : url.includes("bing") ? {d: [{Url: "https://iptvmzansi.com/", IsVerified: verified}]} : {siteUrl: "https://iptvmzansi.com/", permissionLevel: permission}});
test("missing credentials fail without network calls", async () => {
 const r = await checkVerification({}, () => {throw new Error("unexpected request")});
 assert.equal(r.gsc_key_present, false); assert.equal(r.ok, false);
});
test("verified properties pass", async () => assert.equal((await checkVerification(env, mock())).ok, true));
test("non-owner access cannot masquerade as verified", async () => assert.equal((await checkVerification(env, mock("siteFullUser"))).ok, false));
test("unverified Bing fails", async () => assert.equal((await checkVerification(env, mock("siteOwner", false))).ok, false));
test("exceptions do not leak secrets", async () => {
 const r = await checkVerification(env, async () => {throw new Error("test-secret")});
 assert.equal(JSON.stringify(r).includes("test-secret"), false); assert.equal(r.ok, false);
});
