import { PAGES } from "./lib/pages.js";

const htmlRedirects = Object.entries(PAGES)
  .filter(([route, page]) => !page.aliasOf && !route.endsWith(".html") && !["/404", "/not-found"].includes(route))
  .map(([route]) => ({
    source: route === "/" ? "/index.html" : `${route}.html`,
    destination: route,
    permanent: true
  }));

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/home-static" }],
      afterFiles: [],
      fallback: []
    };
  },
  async redirects() {
    return [
      {
        source: "/404.html",
        destination: "/",
        permanent: true
      },
      ...htmlRedirects
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
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      }
    ];
  }
};

export default nextConfig;
