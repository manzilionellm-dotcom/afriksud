import { webmasterVerification } from "../../../lib/seo/verification";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { SITE_URL } from "../../../lib/url";
import "../../globals.css";
import "./styles.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { verification: webmasterVerification(),
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  icons: { icon: "/icon-192.png" },
};

export default async function AustraliaLayout({ children }: { children: React.ReactNode }) {
  // Middleware overwrites this request header. HTML language is resolved on
  // the server; article text and JSON-LD never depend on a browser effect.
  const path = (await headers()).get("x-mz-path") ?? "/australia";
  const lang = path.startsWith("/australia/af/") ? "af-AU" : path.startsWith("/australia/zu/") ? "zu-AU" : "en-AU";
  return <html lang={lang} dir="ltr"><body>{children}</body></html>;
}
