import type { MetadataRoute } from "next";

const BASE_URL = "https://vagdevidyamandir.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    // Primary page — canonical URL, highest priority
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Actual separate pages - Boosted priority for Board Results
    {
      url: `${BASE_URL}/updates`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}
