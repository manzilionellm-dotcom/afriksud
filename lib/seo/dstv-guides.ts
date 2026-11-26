import articles from "../../content/dstv-guides.json";
import type { Locale } from "../locales";

export interface DstvGuide {
  slug: string;
  locale: string;
  language: string;
  published: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: {
    h2: string;
    h3: string;
    paragraphs: string[];
    table?: { headers: string[]; rows: string[][] };
  }[];
  sources: { label: string; url: string }[];
  related: { label: string; path: string }[];
}

export const dstvGuides: DstvGuide[] = articles;
export const guidePath = (guide: DstvGuide) => `/${guide.locale}/blog/${guide.slug}`;

export function listedGuides(locale: Locale) {
  const isFrench = locale === "fr";
  return dstvGuides
    .filter((guide) => (guide.locale === "fr") === isFrench)
    .sort((a, b) => Number(b.locale === locale) - Number(a.locale === locale));
}
