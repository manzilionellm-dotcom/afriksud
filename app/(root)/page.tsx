// app/page.tsx
// The canonical homepage lives at /{DEFAULT_LOCALE} (no trailing slash).
// One hop: / → /en-za — never /en-za/ then a second slash-strip 308.

import { permanentRedirect } from "next/navigation";
import { DEFAULT_LOCALE } from "../../lib/locales";

export default function Root() {
  permanentRedirect(`/${DEFAULT_LOCALE}`);
}
