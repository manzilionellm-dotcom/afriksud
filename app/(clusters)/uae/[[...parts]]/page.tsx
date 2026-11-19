import { notFound } from "next/navigation";
import { ClusterGuide } from "../../../../components/seo/ClusterGuide";
import { CLUSTERS, clusterParams, clusterMetadata, resolveClusterRoute } from "../../../../lib/seo/clusters";
const cluster = CLUSTERS.find(c => c.slug === "uae")!;
type Props = { params: Promise<{ parts?: string[] }> };
export function generateStaticParams() { return clusterParams(cluster); }
export const dynamicParams = false;
export async function generateMetadata({params}:Props) {
  const route=resolveClusterRoute(cluster,(await params).parts);
  return route?clusterMetadata(cluster,route.lang,route.satellite):{};
}
export default async function Page({params}:Props) {
  const route=resolveClusterRoute(cluster,(await params).parts);
  if(!route) notFound();
  return <ClusterGuide cluster={cluster} lang={route.lang} satellite={route.satellite}/>;
}
