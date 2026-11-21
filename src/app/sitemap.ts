import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Becomes /sitemap.xml: a list of pages for Google
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
