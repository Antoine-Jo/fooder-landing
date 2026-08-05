import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getSiteConfig();
  if (!config.isPublic) return [];

  return [
    { url: config.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${config.siteUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${config.siteUrl}/conditions`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${config.siteUrl}/mentions-legales`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
