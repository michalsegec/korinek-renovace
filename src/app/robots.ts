import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Becomes /robots.txt: tells search engines they may read the site, and where the sitemap is
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
