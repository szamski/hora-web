import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { withSentryConfig } from "@sentry/nextjs";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withSentryConfig(withMDX(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  // Skip source map upload unless an auth token is present (local / preview).
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
});
