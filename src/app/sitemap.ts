import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nexora-ai-solutions.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/#how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#case-studies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
