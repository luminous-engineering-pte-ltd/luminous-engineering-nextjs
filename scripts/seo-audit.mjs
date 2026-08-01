import { writeFile } from "node:fs/promises";
import { PAGES } from "../lib/pages.js";

const LIVE_ORIGIN = "https://luminousengineering.com.sg";
const LOCAL_ORIGIN = process.env.SEO_AUDIT_LOCAL_ORIGIN || "http://127.0.0.1:3000";
const OUTPUT = process.argv[2] || "/tmp/luminous-seo-audit.json";
const CSV_OUTPUT = process.argv[3] || OUTPUT.replace(/\.json$/i, ".csv");
const PAGE_EXTENSIONS = /\.(?:html?)$/i;
const ASSET_EXTENSIONS = /\.(?:avif|bmp|css|csv|docx?|eot|gif|ico|jpe?g|js|json|map|mp3|mp4|pdf|png|svg|ttf|txt|webm|webp|woff2?|xml|zip)$/i;

function decode(value = "") {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    hellip: "…",
    laquo: "«",
    ldquo: "“",
    lsquo: "‘",
    lt: "<",
    middot: "·",
    nbsp: " ",
    ndash: "–",
    quot: '"',
    raquo: "»",
    rdquo: "”",
    rsquo: "’"
  };

  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);?/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function normalizeText(value = "") {
  return decode(value).replace(/\s+/g, " ").trim();
}

function parseAttributes(tag = "") {
  const attributes = {};
  const pattern = /([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = pattern.exec(tag))) {
    const key = match[1].toLowerCase();
    if (key === "meta" || key === "link" || key === "img" || key === "a" || key === "html") continue;
    attributes[key] = decode(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attributes;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => parseAttributes(match[0]));
}

function contentByName(metaTags, name) {
  return metaTags.find((tag) => (tag.name || "").toLowerCase() === name.toLowerCase())?.content || "";
}

function contentByProperty(metaTags, property) {
  return metaTags.find((tag) => (tag.property || "").toLowerCase() === property.toLowerCase())?.content || "";
}

function collectSchemaTypes(value, result = new Set()) {
  if (!value || typeof value !== "object") return result;
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaTypes(item, result));
    return result;
  }
  const type = value["@type"];
  if (Array.isArray(type)) type.forEach((item) => result.add(String(item)));
  else if (type) result.add(String(type));
  Object.values(value).forEach((item) => collectSchemaTypes(item, result));
  return result;
}

function extractHtml(html, url) {
  const metaTags = tags(html, "meta");
  const linkTags = tags(html, "link");
  const imageTags = tags(html, "img");
  const anchorTags = tags(html, "a");
  const title = normalizeText(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const htmlTag = parseAttributes(html.match(/<html\b[^>]*>/i)?.[0] || "");
  const headings = {};
  for (let level = 1; level <= 6; level += 1) {
    headings[`h${level}`] = [...html.matchAll(new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, "gi"))]
      .map((match) => normalizeText(match[1].replace(/<[^>]+>/g, " ")))
      .filter(Boolean);
  }

  const jsonLd = [];
  let invalidJsonLd = 0;
  for (const match of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      jsonLd.push(JSON.parse(match[1].trim()));
    } catch {
      invalidJsonLd += 1;
    }
  }

  const schemaTypes = new Set();
  jsonLd.forEach((entry) => collectSchemaTypes(entry, schemaTypes));
  const canonical = linkTags.find((tag) => (tag.rel || "").toLowerCase().split(/\s+/).includes("canonical"))?.href || "";
  const alternates = linkTags
    .filter((tag) => (tag.rel || "").toLowerCase().split(/\s+/).includes("alternate"))
    .map((tag) => ({ hreflang: tag.hreflang || "", href: tag.href || "" }));
  const links = [];
  for (const anchor of anchorTags) {
    if (!anchor.href) continue;
    try {
      links.push(new URL(anchor.href, url).href);
    } catch {}
  }

  const bodyText = normalizeText(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
  const robots = contentByName(metaTags, "robots");

  return {
    title,
    titleLength: [...title].length,
    description: normalizeText(contentByName(metaTags, "description")),
    descriptionLength: [...normalizeText(contentByName(metaTags, "description"))].length,
    keywords: normalizeText(contentByName(metaTags, "keywords")),
    canonical,
    robots,
    noindex: /(?:^|[,\s])noindex(?:$|[,\s])/i.test(robots),
    viewport: contentByName(metaTags, "viewport"),
    themeColor: contentByName(metaTags, "theme-color"),
    language: htmlTag.lang || "",
    openGraph: Object.fromEntries(
      ["og:title", "og:description", "og:type", "og:url", "og:image", "og:image:width", "og:image:height"]
        .map((property) => [property, contentByProperty(metaTags, property)])
        .filter(([, value]) => value)
    ),
    twitter: Object.fromEntries(
      ["twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:site", "twitter:creator"]
        .map((name) => [name, contentByName(metaTags, name)])
        .filter(([, value]) => value)
    ),
    alternates,
    jsonLdCount: jsonLd.length,
    invalidJsonLd,
    schemaTypes: [...schemaTypes].sort(),
    headings,
    wordCount: bodyText ? bodyText.split(/\s+/).length : 0,
    imageCount: imageTags.length,
    imagesMissingAlt: imageTags.filter((image) => !("alt" in image) || !image.alt.trim()).length,
    links
  };
}

async function fetchWithRedirects(url, options = {}) {
  const chain = [];
  let current = url;
  for (let hop = 0; hop < 6; hop += 1) {
    const response = await fetch(current, {
      redirect: "manual",
      headers: { "user-agent": "Mozilla/5.0 (compatible; LuminousMigrationSEOAudit/1.0)" },
      signal: AbortSignal.timeout(30000),
      ...options
    });
    const location = response.headers.get("location");
    chain.push({ url: current, status: response.status, location: location || "" });
    if (response.status < 300 || response.status >= 400 || !location) {
      return { response, chain, finalUrl: current };
    }
    current = new URL(location, current).href;
  }
  throw new Error(`Too many redirects: ${url}`);
}

async function inspectUrl(url) {
  try {
    const { response, chain, finalUrl } = await fetchWithRedirects(url);
    const contentType = response.headers.get("content-type") || "";
    const html = contentType.includes("text/html") ? await response.text() : "";
    return {
      requestedUrl: url,
      finalUrl,
      status: response.status,
      redirectChain: chain,
      contentType,
      headers: {
        xRobotsTag: response.headers.get("x-robots-tag") || "",
        cacheControl: response.headers.get("cache-control") || "",
        contentSecurityPolicy: response.headers.get("content-security-policy") || "",
        strictTransportSecurity: response.headers.get("strict-transport-security") || "",
        xContentTypeOptions: response.headers.get("x-content-type-options") || "",
        xFrameOptions: response.headers.get("x-frame-options") || "",
        referrerPolicy: response.headers.get("referrer-policy") || ""
      },
      ...(html ? extractHtml(html, finalUrl) : {})
    };
  } catch (error) {
    return { requestedUrl: url, status: 0, error: String(error) };
  }
}

async function mapConcurrent(items, limit, callback) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await callback(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function routeFromUrl(value) {
  const url = new URL(value);
  return url.pathname || "/";
}

function canonicalComparable(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
    return `${url.protocol}//${url.host}${pathname}${url.search}`;
  } catch {
    return value.replace(/\/+$/, "");
  }
}

function sameMetadata(a, b, key) {
  if (key === "canonical") return canonicalComparable(a?.[key]) === canonicalComparable(b?.[key]);
  return (a?.[key] || "") === (b?.[key] || "");
}

const registryEntries = Object.entries(PAGES);
const primaryEntries = registryEntries.filter(([, page]) => !page.aliasOf && !page.source.endsWith("/404.html"));
const aliasEntries = registryEntries.filter(([, page]) => page.aliasOf);

const [robotsResponse, sitemapResponse] = await Promise.all([
  fetch(`${LIVE_ORIGIN}/robots.txt`),
  fetch(`${LIVE_ORIGIN}/sitemap_index.xml`)
]);
const [liveRobots, liveSitemap] = await Promise.all([robotsResponse.text(), sitemapResponse.text()]);
const sitemapUrls = [...liveSitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => decode(match[1]));
const sitemapCounts = new Map();
sitemapUrls.forEach((url) => sitemapCounts.set(url, (sitemapCounts.get(url) || 0) + 1));

const fullRegistryRouteSet = new Set(registryEntries.map(([route]) => route));
const sitemapRoutesAbsentFromRegistry = [...new Set(sitemapUrls.map(routeFromUrl))]
  .filter((route) => !fullRegistryRouteSet.has(route))
  .sort();
const missingCanonicalRoutes = sitemapRoutesAbsentFromRegistry
  .filter((route) => PAGE_EXTENSIONS.test(route))
  .map((route) => route.replace(PAGE_EXTENSIONS, ""));
const registryPrimaryRouteSet = new Set(primaryEntries.map(([route]) => route));
const routeSet = new Set([...registryPrimaryRouteSet, ...missingCanonicalRoutes]);
const liveUrls = [...routeSet].map((route) => new URL(route, LIVE_ORIGIN).href);
const localUrls = [...routeSet].map((route) => new URL(route, LOCAL_ORIGIN).href);
const [livePages, localPages] = await Promise.all([
  mapConcurrent(liveUrls, 8, inspectUrl),
  mapConcurrent(localUrls, 8, inspectUrl)
]);

const liveByRoute = Object.fromEntries(livePages.map((page) => [routeFromUrl(page.requestedUrl), page]));
const localByRoute = Object.fromEntries(localPages.map((page) => [routeFromUrl(page.requestedUrl), page]));

const discoveredLiveRoutes = new Set();
for (const page of livePages) {
  for (const href of page.links || []) {
    try {
      const url = new URL(href);
      if (url.origin !== LIVE_ORIGIN || url.search || url.hash || ASSET_EXTENSIONS.test(url.pathname)) continue;
      discoveredLiveRoutes.add(url.pathname || "/");
    } catch {}
  }
}

const extraLiveRoutes = [...discoveredLiveRoutes].filter((route) => !fullRegistryRouteSet.has(route)).sort();
const extraLivePages = await mapConcurrent(extraLiveRoutes.map((route) => new URL(route, LIVE_ORIGIN).href), 8, inspectUrl);
const liveIndexableExtras = extraLivePages.filter((page) => page.status === 200 && page.contentType?.includes("text/html") && !page.noindex);

const [aliasChecks, localAliasChecks] = await Promise.all([
  mapConcurrent(aliasEntries.map(([route]) => new URL(route, LIVE_ORIGIN).href), 8, inspectUrl),
  mapConcurrent(aliasEntries.map(([route]) => new URL(route, LOCAL_ORIGIN).href), 8, inspectUrl)
]);

const comparisons = [...routeSet].sort().map((route) => {
  const legacy = liveByRoute[route];
  const next = localByRoute[route];
  return {
    route,
    legacyStatus: legacy?.status || 0,
    nextStatus: next?.status || 0,
    titleMatch: sameMetadata(legacy, next, "title"),
    descriptionMatch: sameMetadata(legacy, next, "description"),
    canonicalMatch: sameMetadata(legacy, next, "canonical"),
    robotsMatch: sameMetadata(legacy, next, "robots"),
    legacyTitle: legacy?.title || "",
    nextTitle: next?.title || "",
    legacyDescription: legacy?.description || "",
    nextDescription: next?.description || "",
    legacyCanonical: legacy?.canonical || "",
    nextCanonical: next?.canonical || "",
    legacyRobots: legacy?.robots || "",
    nextRobots: next?.robots || "",
    legacyJsonLdCount: legacy?.jsonLdCount || 0,
    nextJsonLdCount: next?.jsonLdCount || 0,
    legacySchemaTypes: legacy?.schemaTypes || [],
    nextSchemaTypes: next?.schemaTypes || [],
    legacyOpenGraphCount: Object.keys(legacy?.openGraph || {}).length,
    nextOpenGraphCount: Object.keys(next?.openGraph || {}).length,
    legacyTwitterCount: Object.keys(legacy?.twitter || {}).length,
    nextTwitterCount: Object.keys(next?.twitter || {}).length,
    legacyH1Count: legacy?.headings?.h1?.length || 0,
    nextH1Count: next?.headings?.h1?.length || 0,
    h1TextMatch: JSON.stringify(legacy?.headings?.h1 || []) === JSON.stringify(next?.headings?.h1 || []),
    legacyWordCount: legacy?.wordCount || 0,
    nextWordCount: next?.wordCount || 0,
    wordCountDelta: (next?.wordCount || 0) - (legacy?.wordCount || 0),
    legacyImagesMissingAlt: legacy?.imagesMissingAlt || 0,
    nextImagesMissingAlt: next?.imagesMissingAlt || 0
  };
});

const duplicateSitemapUrls = [...sitemapCounts.entries()]
  .filter(([, count]) => count > 1)
  .map(([url, count]) => ({ url, count }));
const sitemapRouteSet = new Set(sitemapUrls.map(routeFromUrl));
const registryRoutesMissingFromSitemap = [...registryPrimaryRouteSet].filter((route) => !sitemapRouteSet.has(route)).sort();
const sitemapRoutesMissingFromRegistry = [...sitemapRouteSet].filter((route) => !registryPrimaryRouteSet.has(route)).sort();

const localTechnicalFiles = await Promise.all(
  ["/robots.txt", "/sitemap.xml", "/sitemap_index.xml"].map(async (route) => {
    const result = await inspectUrl(`${LOCAL_ORIGIN}${route}`);
    return { route, status: result.status, contentType: result.contentType || "", title: result.title || "" };
  })
);

const result = {
  generatedAt: new Date().toISOString(),
  origins: { live: LIVE_ORIGIN, local: LOCAL_ORIGIN },
  buildRoutes: {
    totalRegistryRoutes: registryEntries.length,
    primaryRoutes: primaryEntries.length,
    aliasRoutes: aliasEntries.length
  },
  robots: {
    status: robotsResponse.status,
    body: liveRobots,
    referencedSitemap: /Sitemap:\s*(\S+)/i.exec(liveRobots)?.[1] || ""
  },
  sitemap: {
    status: sitemapResponse.status,
    totalEntries: sitemapUrls.length,
    uniqueEntries: sitemapCounts.size,
    duplicateSitemapUrls,
    registryRoutesMissingFromSitemap,
    sitemapRoutesMissingFromRegistry,
    sitemapRoutesAbsentFromAnyRegistry: sitemapRoutesAbsentFromRegistry,
    canonicalRoutesInLegacyButAbsentFromNext: missingCanonicalRoutes
  },
  discovered: {
    internalRoutes: [...discoveredLiveRoutes].sort(),
    extraRoutes: extraLiveRoutes,
    indexableExtraPages: liveIndexableExtras.map((page) => ({
      route: routeFromUrl(page.requestedUrl),
      status: page.status,
      title: page.title,
      canonical: page.canonical,
      robots: page.robots
    }))
  },
  localTechnicalFiles,
  aliasChecks: aliasChecks.map((page) => ({
    route: routeFromUrl(page.requestedUrl),
    status: page.redirectChain?.[0]?.status || page.status,
    finalStatus: page.status,
    finalUrl: page.finalUrl,
    redirectChain: page.redirectChain
  })),
  localAliasChecks: localAliasChecks.map((page) => ({
    route: routeFromUrl(page.requestedUrl),
    status: page.redirectChain?.[0]?.status || page.status,
    finalStatus: page.status,
    finalUrl: page.finalUrl,
    redirectChain: page.redirectChain
  })),
  comparisons,
  livePages: Object.fromEntries(livePages.map((page) => [routeFromUrl(page.requestedUrl), page])),
  localPages: Object.fromEntries(localPages.map((page) => [routeFromUrl(page.requestedUrl), page]))
};

await writeFile(OUTPUT, `${JSON.stringify(result, null, 2)}\n`);
const csvColumns = [
  "route",
  "legacyStatus",
  "nextStatus",
  "titleMatch",
  "legacyTitle",
  "nextTitle",
  "descriptionMatch",
  "legacyDescription",
  "nextDescription",
  "canonicalMatch",
  "legacyCanonical",
  "nextCanonical",
  "robotsMatch",
  "legacyRobots",
  "nextRobots",
  "legacyJsonLdCount",
  "nextJsonLdCount",
  "legacySchemaTypes",
  "legacyOpenGraphCount",
  "nextOpenGraphCount",
  "legacyTwitterCount",
  "nextTwitterCount",
  "legacyH1Count",
  "nextH1Count",
  "h1TextMatch",
  "legacyWordCount",
  "nextWordCount",
  "wordCountDelta",
  "legacyImagesMissingAlt",
  "nextImagesMissingAlt"
];
const csvCell = (value) => {
  const normalized = Array.isArray(value) ? value.join(" | ") : String(value ?? "");
  return `"${normalized.replace(/"/g, '""')}"`;
};
const csv = [
  csvColumns.map(csvCell).join(","),
  ...comparisons.map((comparison) => csvColumns.map((column) => csvCell(comparison[column])).join(","))
].join("\n");
await writeFile(CSV_OUTPUT, `${csv}\n`);
console.log(`Wrote ${OUTPUT}`);
console.log(`Wrote ${CSV_OUTPUT}`);
console.log(`Compared ${comparisons.length} canonical routes and ${aliasChecks.length} legacy HTML aliases.`);
