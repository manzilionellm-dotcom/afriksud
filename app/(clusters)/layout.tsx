import { webmasterVerification } from "../../lib/seo/verification";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { CLUSTERS } from "../../lib/seo/clusters";
import { SITE_URL } from "../../lib/url";
import "../globals.css";
import "../(australia)/australia/styles.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { verification: webmasterVerification(),metadataBase:new URL(SITE_URL),robots:{index:true,follow:true},icons:{icon:"/icon-192.png"}};
export default async function ClusterLayout({children}:{children:React.ReactNode}) {
  const parts=((await headers()).get("x-mz-path")??"").split("/").filter(Boolean);
  const cluster=CLUSTERS.find(c=>c.slug===parts[0]);
  const language=parts[1]==="af"?"af":parts[1]==="zu"?"zu":"en";
  return <html lang={`${language}-${cluster?.region??"ZA"}`} dir="ltr"><body>{children}</body></html>;
}
