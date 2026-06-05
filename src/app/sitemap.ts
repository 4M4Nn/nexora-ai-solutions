import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nexora-ai-solutions.vercel.app";
  const now = new Date();

  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/industries", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/how-it-works", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/why-nexora", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${base}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
