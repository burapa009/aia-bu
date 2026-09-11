import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexable } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const siteUrl = getSiteUrl()!;
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
