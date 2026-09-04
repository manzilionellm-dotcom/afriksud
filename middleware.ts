// middleware.ts
// 1) 308 www.iptvmzansi.com → https://iptvmzansi.com (path + query kept).
// 2) Expose the resolved locale + path to the root layout via request
//    headers so `<html lang>` / `<html dir>` can be set correctly on the
//    SERVER for every URL. Without this, every locale shipped
//    lang="en-ZA" to crawlers because the root layout has no access to
//    route params.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/locales";
import { wwwToApexLocation } from "./lib/url";

const LOCALE_SET = new Set<string>(LOCALES);

function extractLocale(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (seg && LOCALE_SET.has(seg)) return seg;
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  // Host 308 MUST run before locale / trailing-slash hops. Next.js
  // otherwise 308s `/en-za/` → `/en-za` on the same (www) host.
  const apex = wwwToApexLocation(
    req.nextUrl.href,
    req.headers.get("x-forwarded-host"),
    req.headers.get("host")
  );
  if (apex) {
    return NextResponse.redirect(apex, 308);
  }

  const { pathname } = req.nextUrl;
  // Restore Next default (trailingSlash: false) now that
  // skipTrailingSlashRedirect is on — but only AFTER www has left.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const locale = extractLocale(pathname);

  const res = NextResponse.next();
  res.headers.set("x-mz-locale", locale);
  res.headers.set("x-mz-path", pathname);
  return res;
}

export const config = {
  // Skip Next internals and static assets — the header is only useful for
  // page requests rendered by the app router.
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
