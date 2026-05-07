// app/sitemap.ts

import type { MetadataRoute } from "next";

const SITE_URL = "https://iptvmzansi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const main: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${SITE_URL}/?lang=en`,
          af: `${SITE_URL}/?lang=af`,
          fr: `${SITE_URL}/?lang=fr`,
          "x-default": SITE_URL,
        },
      },
    },
    {
      url: `${SITE_URL}/?lang=en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/?lang=af`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/?lang=fr`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const sections = ["offers", "channels", "countries", "international", "devices", "cities", "faq", "setup"];
  const sectionEntries: MetadataRoute.Sitemap = sections.map((section) => ({
    url: `${SITE_URL}/#${section}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...main, ...sectionEntries];
}
