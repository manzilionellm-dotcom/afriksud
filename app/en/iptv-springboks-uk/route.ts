// Alias only — 308, no HTML. `/en` is not a locale; this static segment
// wins over `app/[locale]` so the Seo slug cannot 404 as `/_not-found`.
import { NextResponse } from "next/server";
import { SITE_URL } from "../../../lib/url";
import { SPRINGBOKS_UK_BLOG_DEST } from "../../../lib/seo/springboks-uk-aliases";

const DEST = `${SITE_URL}${SPRINGBOKS_UK_BLOG_DEST}`;

export function GET() {
  return NextResponse.redirect(DEST, 308);
}

export function HEAD() {
  return NextResponse.redirect(DEST, 308);
}
