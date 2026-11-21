import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow demo photos from Unsplash. For a real client, use their own photos in /public instead.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  experimental: {
    // Put the CSS straight into the HTML, so the browser doesn't wait for a separate CSS file
    // before showing the headline (faster first paint on phones).
    inlineCss: true,
  },
};

export default nextConfig;
