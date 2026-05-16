// middleware.ts
// Exposes the resolved locale + path to the root layout via request headers
// so `<html lang>` / `<html dir>` can be set correctly on the SERVER for
// every URL. Without this, every locale shipped `lang="en-ZA"` to crawlers
// because the root layout has no access to route params.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/locales";

const LOCALE_SET = new Set<string>(LOCALES);

function extractLocale(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (seg && LOCALE_SET.has(seg)) return seg;
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
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
