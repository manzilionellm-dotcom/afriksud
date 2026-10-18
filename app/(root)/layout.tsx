// app/(root)/layout.tsx
// Root layout for the two locale-less routes only: `/` (307 → /en-za) and
// `/ops` (404). Every real page lives under app/[locale], whose own root
// layout sets `<html lang>` from the URL param — statically, with no
// request-time API — so the locale pages are prerendered and edge-cacheable.

import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALE_META } from "../../lib/locales";
import "../globals.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function RootShellLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const meta = LOCALE_META[DEFAULT_LOCALE];
  return (
    <html lang={meta.hreflang} dir={meta.dir} className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
