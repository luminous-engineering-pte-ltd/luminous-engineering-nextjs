import { PAGES } from "../lib/pages.js";
import { SEO_DATA } from "../lib/seo-data.js";
import { canonicalForRoute, getCanonicalRoutes } from "../lib/seo.js";

const origin = process.env.SEO_VERIFY_ORIGIN || "http://127.0.0.1:3001";
const routes = getCanonicalRoutes();
const failures = [];
const obsoleteCanonicalDomain = /luminousengineeringsg\.com|poolexpertssg\.com/i;

function decode(value = "") {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);?/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function attributes(tag = "") {
  const result = {};
  const pattern = /([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = pattern.exec(tag))) {
    const key = match[1].toLowerCase();
    if (["meta", "link", "img"].includes(key)) continue;
    result[key] = decode(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return result;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => attributes(match[0]));
}

function meta(metaTags, key, value) {
  return metaTags.find((tag) => (tag[key] || "").toLowerCase() === value.toLowerCase())?.content || "";
}

function normalizeText(value = "") {
  return decode(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeUrl(value) {
  const url = new URL(value);
  const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/+$/, "");
  return `${url.protocol}//${url.host}${pathname}${url.search}`;
}

function fail(route, message) {
  failures.push(`${route}: ${message}`);
}

async function inspect(route) {
  const response = await fetch(`${origin}${route}`, { redirect: "manual", signal: AbortSignal.timeout(30000) });
  if (response.status !== 200) {
    fail(route, `expected 200, received ${response.status}`);
    return { route, links: [], assets: [] };
  }
  const html = await response.text();
  const seo = SEO_DATA[route];
  const metaTags = tags(html, "meta");
  const linkTags = tags(html, "link");
  const title = normalizeText(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const description = normalizeText(meta(metaTags, "name", "description"));
  const canonical = linkTags.find((tag) => (tag.rel || "").toLowerCase().split(/\s+/).includes("canonical"))?.href || "";
  const robots = meta(metaTags, "name", "robots");
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "";
  const bodyStart = html.match(/<body\b[^>]*>([\s\S]{0,1000})/i)?.[1] || "";
  const gtmScripts = [...head.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
    .filter((script) => script[1].includes("GTM-TJ9758RG"));
  const gtmFrames = tags(html, "iframe").filter((frame) => frame.src === "https://www.googletagmanager.com/ns.html?id=GTM-TJ9758RG");

  if (title !== seo.title) fail(route, "title does not match the production SEO snapshot");
  if (description !== seo.description) fail(route, "description does not match the production SEO snapshot");
  if (gtmScripts.length !== 1) fail(route, "GTM-TJ9758RG loader is not present exactly once in the head");
  if (gtmFrames.length !== 1 || !bodyStart.includes("GTM-TJ9758RG")) fail(route, "GTM-TJ9758RG noscript iframe is not immediately after the body opening");
  if (html.includes("GTM-MZZZFB66")) fail(route, "obsolete GTM-MZZZFB66 container is still present");
  if (normalizeUrl(canonical) !== normalizeUrl(canonicalForRoute(route))) fail(route, `canonical mismatch (${canonical})`);
  for (const directive of ["index", "follow", "max-snippet:-1", "max-video-preview:-1", "max-image-preview:large"]) {
    if (!robots.includes(directive)) fail(route, `missing robots directive ${directive}`);
  }
  if (!meta(metaTags, "property", "og:title")) fail(route, "missing Open Graph title");
  if (!meta(metaTags, "property", "og:description")) fail(route, "missing Open Graph description");
  if (normalizeUrl(meta(metaTags, "property", "og:url")) !== normalizeUrl(canonicalForRoute(route))) fail(route, "Open Graph URL mismatch");
  if (!meta(metaTags, "property", "og:image")) fail(route, "missing Open Graph image");
  if (meta(metaTags, "name", "twitter:card") !== "summary_large_image") fail(route, "missing Twitter large-image card");

  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!jsonLd.length) fail(route, "missing JSON-LD");
  for (const script of jsonLd) {
    try {
      const parsed = JSON.parse(script[1]);
      const serialized = JSON.stringify(parsed);
      if (obsoleteCanonicalDomain.test(serialized)) fail(route, "JSON-LD contains an obsolete canonical domain");
    } catch {
      fail(route, "invalid JSON-LD");
    }
  }

  const h1Count = [...html.matchAll(/<h1\b/gi)].length;
  if (h1Count !== 1) fail(route, `expected one H1, received ${h1Count}`);
  const imagesWithoutAlt = tags(html, "img").filter((image) => !("alt" in image));
  if (imagesWithoutAlt.length) fail(route, `${imagesWithoutAlt.length} images lack an alt attribute`);

  const links = tags(html, "a").flatMap((anchor) => {
    if (!anchor.href) return [];
    try {
      const url = new URL(anchor.href, origin);
      return url.origin === origin && !url.search && !url.hash ? [url.pathname || "/"] : [];
    } catch {
      return [];
    }
  });
  const assetCandidates = [
    ...tags(html, "img").flatMap((image) => [image.src, ...(image.srcset || "").split(",").map((entry) => entry.trim().split(/\s+/)[0])]),
    ...tags(html, "link").map((link) => link.href),
    ...tags(html, "script").map((script) => script.src)
  ].filter(Boolean);
  const assets = assetCandidates.flatMap((candidate) => {
    try {
      const url = new URL(candidate, origin);
      return url.origin === origin && url.pathname !== route ? [url.pathname] : [];
    } catch {
      return [];
    }
  });
  return { route, links, assets };
}

async function mapConcurrent(items, limit, callback) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await callback(items[index], index);
    }
  }));
  return results;
}

const inspected = await mapConcurrent(routes, 10, inspect);

const sitemapResponses = await Promise.all(["/sitemap.xml", "/sitemap_index.xml"].map(async (pathname) => {
  const response = await fetch(`${origin}${pathname}`);
  const body = await response.text();
  if (response.status !== 200) fail(pathname, `expected 200, received ${response.status}`);
  const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
  const expected = routes.map(canonicalForRoute).sort();
  if (JSON.stringify([...new Set(urls)].sort()) !== JSON.stringify(expected)) fail(pathname, "URL set differs from canonical route set");
  if (urls.length !== new Set(urls).size) fail(pathname, "contains duplicate URLs");
  if (urls.some((url) => url.endsWith(".html"))) fail(pathname, "contains an HTML alias");
  return response;
}));

const robotsResponse = await fetch(`${origin}/robots.txt`);
const robotsBody = await robotsResponse.text();
if (robotsResponse.status !== 200) fail("/robots.txt", `expected 200, received ${robotsResponse.status}`);
if (!robotsBody.includes("Sitemap: https://luminousengineering.com.sg/sitemap.xml")) fail("/robots.txt", "missing canonical sitemap declaration");

const redirectRoutes = routes.map((route) => ({
  source: route === "/" ? "/index.html" : `${route}.html`,
  destination: route
}));
await mapConcurrent(redirectRoutes, 10, async ({ source, destination }) => {
  const response = await fetch(`${origin}${source}`, { redirect: "manual" });
  if (response.status !== 308) fail(source, `expected permanent 308, received ${response.status}`);
  const location = response.headers.get("location") || "";
  const actualPath = new URL(location, origin).pathname;
  if (actualPath !== destination) fail(source, `redirects to ${actualPath}, expected ${destination}`);
});

for (const utilityRoute of ["/not-found", "/legacy/about", "/definitely-not-a-real-page"]) {
  const response = await fetch(`${origin}${utilityRoute}`, { redirect: "manual" });
  if (response.status !== 404) fail(utilityRoute, `expected 404, received ${response.status}`);
}

for (const asset of ["/og-image.jpg", "/favicon.ico", "/favicon-16x16.png", "/favicon-32x32.png", "/apple-touch-icon.png", "/site.webmanifest"]) {
  const response = await fetch(`${origin}${asset}`, { redirect: "manual" });
  if (response.status !== 200) fail(asset, `expected 200, received ${response.status}`);
}

const internalRoutes = [...new Set(inspected.flatMap((page) => page.links))]
  .filter((route) => !/\.(?:avif|css|gif|ico|jpe?g|js|json|png|svg|webp|woff2?)$/i.test(route));
await mapConcurrent(internalRoutes, 10, async (route) => {
  const response = await fetch(`${origin}${route}`, { redirect: "manual" });
  if (response.status >= 300) fail(route, `internal link returns ${response.status}`);
});

const internalAssets = [...new Set(inspected.flatMap((page) => page.assets))];
await mapConcurrent(internalAssets, 12, async (asset) => {
  const response = await fetch(`${origin}${asset}`, { redirect: "manual" });
  if (response.status !== 200) fail(asset, `referenced asset returns ${response.status}`);
});

if (Object.keys(SEO_DATA).length !== routes.length) fail("SEO_DATA", `${Object.keys(SEO_DATA).length} records for ${routes.length} canonical routes`);
if (Object.values(PAGES).filter((page) => !page.aliasOf).length < routes.length) fail("PAGES", "canonical page registry is incomplete");
for (const route of routes) {
  const expectedCanonical = canonicalForRoute(route);
  if (PAGES[route]?.canonical !== expectedCanonical) {
    fail(route, `page registry canonical mismatch (${PAGES[route]?.canonical || "missing"})`);
  }
  if (obsoleteCanonicalDomain.test(PAGES[route]?.canonical || "")) {
    fail(route, "page registry canonical contains an obsolete domain");
  }
}
for (const [route, page] of Object.entries(PAGES)) {
  if (obsoleteCanonicalDomain.test(page.canonical || "")) {
    fail(route, "page registry canonical contains an obsolete domain");
  }
  if (page.aliasOf && page.aliasOf !== "/404" && page.canonical !== canonicalForRoute(page.aliasOf)) {
    fail(route, `alias canonical mismatch (${page.canonical || "missing"})`);
  }
}

if (failures.length) {
  console.error(`SEO verification failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`SEO verification passed: ${routes.length} canonical pages, ${redirectRoutes.length} legacy redirects, ${internalRoutes.length} internal links, ${internalAssets.length} referenced assets, 2 sitemap endpoints.`);
}
