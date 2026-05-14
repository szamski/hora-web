import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return [
      {
        source: "/blog/2026-04-13-v0.6-qa-grind/",
        destination: "/blog/2026-04-13-v0-6-qa-grind/",
        permanent: true,
      },
      {
        source: "/blog/2026-04-13-v0.6-qa-grind",
        destination: "/blog/2026-04-13-v0-6-qa-grind/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
