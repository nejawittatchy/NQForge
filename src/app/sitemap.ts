import { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nqforge.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/tools`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/api-platform`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/docs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/dashboard`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/auth/sign-up`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/auth/sign-in`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: tool.trending ? 0.85 : 0.75,
  }));

  return [...staticPages, ...toolPages];
}
