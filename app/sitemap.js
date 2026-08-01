import { canonicalForRoute, getCanonicalRoutes } from "../lib/seo";

export function sitemapEntries() {
  return getCanonicalRoutes().map((route) => ({
    url: canonicalForRoute(route),
    changeFrequency: route === "/" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/blog" || route === "/services" ? 0.8 : 0.7
  }));
}

export default function sitemap() {
  return sitemapEntries();
}

