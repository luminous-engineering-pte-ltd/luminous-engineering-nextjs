import { PAGES } from "./pages.js";
import { SEO_DATA } from "./seo-data.js";
import { SEO_CONTENT_JSON_LD } from "./seo-content-schema.js";

export const SITE_URL = "https://luminousengineering.com.sg";
export const SITE_NAME = "Luminous Engineering";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/og-image.jpg`;

export function canonicalForRoute(route) {
  return route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

export function getSeoByRoute(route) {
  const seo = SEO_DATA[route] || null;
  const contentJsonLd = SEO_CONTENT_JSON_LD[route];
  if (!contentJsonLd) return seo;
  return {
    ...(seo || {}),
    jsonLd: [...(seo?.jsonLd || []), ...contentJsonLd]
  };
}

export function getCanonicalRoutes() {
  return Object.entries(PAGES)
    .filter(([route, page]) => (
      !page.aliasOf &&
      !route.endsWith(".html") &&
      !["/404", "/not-found"].includes(route)
    ))
    .map(([route]) => route)
    .sort();
}

export function metadataForRoute(route, page) {
  const seo = getSeoByRoute(route);
  const title = seo?.title || page?.title || SITE_NAME;
  const description = seo?.description || page?.description || "";
  const canonical = canonicalForRoute(route);
  const isArticle = route.startsWith("/blog/");

  return {
    title,
    description: description || undefined,
    keywords: seo?.keywords || undefined,
    alternates: { canonical },
    robots: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    openGraph: {
      title: seo?.openGraphTitle || title,
      description: seo?.openGraphDescription || description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_SG",
      type: isArticle ? "article" : "website",
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE,
          width: 1920,
          height: 1280,
          alt: "Luminous Engineering home renovation and handyman services in Singapore"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
      images: [DEFAULT_SOCIAL_IMAGE]
    }
  };
}

