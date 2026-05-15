// app/page.tsx
// The canonical homepage lives at /{DEFAULT_LOCALE}/. Visitors hitting
// the bare root get a 308 to the default locale so search engines and
// users end up on the same indexable URL.

import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "../lib/locales";

export default function Root() {
  redirect(`/${DEFAULT_LOCALE}/`);
}
