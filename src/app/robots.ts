import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig();
  if (!config.isPublic) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}
