import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

/** Turbopack mặc định có thể lấy workspace cha (vd. D:\\InternalTools) → @import \"tailwindcss\" fail. */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  ...(isProd
    ? ([
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ] as const)
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "standalone",
  experimental: {
    /** Giảm ghi cache Turbopack (log từng thấy ~20s+ “writing to filesystem cache” → máy đơ). */
    turbopackFileSystemCacheForDev: false,
  },
  turbopack: {
    root: projectRoot,
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [...securityHeaders],
    },
  ],
};

export default nextConfig;
