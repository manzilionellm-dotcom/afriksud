import { notFound } from "next/navigation";
import { AustraliaGuide } from "../../../../../components/seo/AustraliaGuide";
import { AU_SLUGS, auMetadata, isAuSlug } from "../../../../../lib/seo/australia";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return AU_SLUGS.map(slug => ({ slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!isAuSlug(slug)) return {};
  return auMetadata("af", slug);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isAuSlug(slug)) notFound();
  return <AustraliaGuide lang="af" slug={slug} />;
}
