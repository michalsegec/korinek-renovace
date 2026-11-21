import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy: a list of places the browser may load things from.
// If an attacker injects a script from somewhere else, the browser refuses it.
// Tested in "Report-Only" mode first (21 Nov 2026): no violations, so it's now enforced.
// If something stops loading after you add a new service (e.g. a map or video), add its domain here.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://*.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    // Allow demo photos from Unsplash. For a real client, use their own photos in /public instead.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // AVIF files are about 20–30 % smaller than WebP; browsers that can't show AVIF get WebP
    formats: ["image/avif", "image/webp"],
    // Allow quality 60 (hero) next to the default 75
    qualities: [60, 75],
  },
  experimental: {
    // Put the CSS straight into the HTML, so the browser doesn't wait for a separate CSS file
    // before showing the headline (faster first paint on phones).
    inlineCss: true,
  },
  // Security headers (HSTS is added by Vercel automatically, so it's not here)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" }, // nobody can put our site inside their frame
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
