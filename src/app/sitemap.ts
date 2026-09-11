import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexable } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable()) return [];

  const siteUrl = getSiteUrl()!;
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/health-happy`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
