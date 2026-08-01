import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { PAGES } from "../lib/pages.js";

const SITE_ORIGIN = "https://luminousengineering.com.sg";
const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");
const publicRoot = path.join(projectRoot, "public");

const missingRoutes = [
  "/blog/best-electrician-services-singapore-2026",
  "/blog/best-pool-maintenance-companies-singapore-2026",
  "/blog/electrician-price-list-singapore-2026",
  "/blog/install-power-socket-singapore-price-2026",
  "/blog/light-installation-singapore-price-2026",
  "/blog/painting-service-singapore-price-list-2026",
  "/blog/pool-maintenance-cost-singapore-2026",
  "/blog/power-trip-repair-cost-singapore-2026"
];

const primaryRoutes = Object.entries(PAGES)
  .filter(([route, page]) => !page.aliasOf && !["/404", "/services.html"].includes(route))
  .map(([route]) => route);
const canonicalRoutes = [...new Set([...primaryRoutes, ...missingRoutes])].sort();
const pagesToImport = ["/blog", ...missingRoutes];

function decode(value = "") {
  const named = {
    amp: "&", apos: "'", gt: ">", hellip: "…", laquo: "«", ldquo: "“", lsquo: "‘",
    lt: "<", middot: "·", nbsp: " ", ndash: "–", quot: '"', raquo: "»", rdquo: "”", rsquo: "’"
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
    if (["meta", "link", "body", "html"].includes(key)) continue;
    attributes[key] = decode(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attributes;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => parseAttributes(match[0]));
}

function metaContent(metaTags, key, value) {
  return metaTags.find((tag) => (tag[key] || "").toLowerCase() === value.toLowerCase())?.content || "";
}

function schemaForRoute(route, title, description) {
  const url = canonicalUrl(route);
  const breadcrumbs = route === "/"
    ? []
    : route.split("/").filter(Boolean).map((segment, index, segments) => ({
        "@type": "ListItem",
        position: index + 1,
        name: segment.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
        item: `${SITE_ORIGIN}/${segments.slice(0, index + 1).join("/")}`
      }));
  const pageType = route.startsWith("/blog/")
    ? "BlogPosting"
    : route.startsWith("/services/")
      ? "Service"
      : route === "/contact"
        ? "ContactPage"
        : "WebPage";
  const page = {
    "@type": pageType,
    "@id": `${url}#primary`,
    name: title,
    headline: pageType === "BlogPosting" ? title : undefined,
    url,
    description,
    provider: pageType === "Service" ? { "@id": `${SITE_ORIGIN}/#organization` } : undefined,
    publisher: pageType === "BlogPosting" ? { "@id": `${SITE_ORIGIN}/#organization` } : undefined,
    areaServed: pageType === "Service" ? { "@type": "Country", name: "Singapore" } : undefined
  };
  Object.keys(page).forEach((key) => page[key] === undefined && delete page[key]);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: "Luminous Engineering PTE Ltd.",
        url: `${SITE_ORIGIN}/`,
        telephone: "+65 8183 6772",
        email: "info@luminousengineering.com.sg",
        address: {
          "@type": "PostalAddress",
          streetAddress: "30 Roberts Lane, #02-01",
          addressLocality: "Singapore",
          postalCode: "218309",
          addressCountry: "SG"
        }
      },
      page,
      ...(breadcrumbs.length ? [{ "@type": "BreadcrumbList", itemListElement: breadcrumbs }] : [])
    ]
  };
}

function canonicalUrl(route) {
  return route === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`;
}

function normalizeSchema(value) {
  const serialized = JSON.stringify(value)
    .replaceAll("https://luminousengineeringsg.com", SITE_ORIGIN)
    .replaceAll("http://luminousengineeringsg.com", SITE_ORIGIN)
    .replaceAll("https://poolexpertssg.com/pool-pump-repair-singapore/", `${SITE_ORIGIN}/services/swimming-pool-pump-repair`)
    .replaceAll("https://poolexpertssg.com/pool-pump-repair-singapore", `${SITE_ORIGIN}/services/swimming-pool-pump-repair`);
  return JSON.parse(serialized);
}

function extractSeo(html, route) {
  const metaTags = tags(html, "meta");
  const title = normalizeText(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const description = normalizeText(metaContent(metaTags, "name", "description"));
  const jsonLd = [];
  for (const match of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      jsonLd.push(normalizeSchema(JSON.parse(match[1].trim())));
    } catch {}
  }
  if (!jsonLd.length) jsonLd.push(schemaForRoute(route, title, description));

  return {
    title,
    description,
    canonical: canonicalUrl(route),
    keywords: normalizeText(metaContent(metaTags, "name", "keywords")),
    robots: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    openGraphTitle: normalizeText(metaContent(metaTags, "property", "og:title")) || title,
    openGraphDescription: normalizeText(metaContent(metaTags, "property", "og:description")) || description,
    twitterTitle: normalizeText(metaContent(metaTags, "name", "twitter:title")) || title,
    twitterDescription: normalizeText(metaContent(metaTags, "name", "twitter:description")) || description,
    jsonLd
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; LuminousNextMigration/1.0)" },
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

function rewriteAssetPaths(input) {
  return input
    .replace(/\/assets\/images\//g, "/images/")
    .replace(/\/assets\/icons\//g, "/icons/")
    .replace(/\/assets\/fonts\//g, "/fonts/")
    .replace(/(["'(])assets\/images\//g, "$1/images/")
    .replace(/(["'(])assets\/fonts\//g, "$1/fonts/")
    .replace(/(["'(])\.\.\/images\//g, "$1/images/")
    .replace(/(["'(])\.\.\/fonts\//g, "$1/fonts/")
    .replace(/\\:/g, "\:");
}

function rewriteHtml(input) {
  return rewriteAssetPaths(input)
    .replace(/\s(?:src|href)=["']\/assets\/css\/[^"']+["']/gi, "")
    .replace(/\s(?:src|href)=["']\/assets\/js\/[^"']+["']/gi, "")
    .replace(/href=["']([^"']+)\.html([#?][^"']*)?["']/gi, (match, href, suffix = "") => {
      if (/^(https?:|mailto:|tel:|#)/i.test(href)) return match;
      return `href="${href}${suffix}"`;
    });
}

function fileId(route) {
  return route.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "__") || "index";
}

async function importPage(route, html, seo) {
  const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  const bodyAttrs = parseAttributes(`<body${bodyMatch?.[1] || ""}>`);
  const body = rewriteHtml((bodyMatch?.[2] || html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ""))
    .trim();

  const cssEntries = [];
  for (const link of tags(html, "link")) {
    if (!link.href || !(link.rel || "").toLowerCase().split(/\s+/).includes("stylesheet")) continue;
    let cssUrl;
    try { cssUrl = new URL(link.href, SITE_ORIGIN); } catch { continue; }
    if (cssUrl.origin !== SITE_ORIGIN || !cssUrl.pathname.endsWith(".css")) continue;
    cssEntries.push(`/* ${cssUrl.pathname} */\n${rewriteAssetPaths(await fetchText(cssUrl.href)).trim()}`);
  }
  for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    cssEntries.push(`/* inline style from ${route} */\n${rewriteAssetPaths(match[1]).trim()}`);
  }

  const id = fileId(route);
  const contentFile = `content/pages/${id}.html`;
  const cssFile = `content/styles/${id}.css`;
  await Promise.all([
    writeFile(path.join(projectRoot, contentFile), `${body}\n`),
    writeFile(path.join(projectRoot, cssFile), `/* Imported from ${canonicalUrl(route)} */\n\n${cssEntries.join("\n\n")}\n`)
  ]);

  await downloadMissingAssets(`${html}\n${cssEntries.join("\n")}`);
  return {
    title: seo.title,
    description: seo.description,
    canonical: canonicalUrl(route),
    bodyClass: bodyAttrs.class || "bg-gray-900 text-white",
    content: contentFile,
    css: cssFile,
    source: canonicalUrl(route),
    hasNav: /<nav\b/i.test(body),
    hasFooter: /<footer\b/i.test(body)
  };
}

async function exists(filePath) {
  try { await stat(filePath); return true; } catch { return false; }
}

async function downloadMissingAssets(source) {
  const assetPaths = new Set();
  for (const match of source.matchAll(/\/assets\/(images|fonts)\/([^\s"'`)>,]+)/gi)) {
    assetPaths.add(`/assets/${match[1]}/${match[2].replace(/[?#].*$/, "")}`);
  }
  for (const match of source.matchAll(/\.\.\/(images|fonts)\/([^\s"'`)>,]+)/gi)) {
    assetPaths.add(`/assets/${match[1]}/${match[2].replace(/[?#].*$/, "")}`);
  }

  for (const assetPath of assetPaths) {
    const relative = assetPath.replace(/^\/assets\/(images|fonts)\//, "$1/");
    const destination = path.join(publicRoot, relative);
    if (await exists(destination)) continue;
    const response = await fetch(new URL(assetPath, SITE_ORIGIN), { signal: AbortSignal.timeout(30000) });
    if (!response.ok) {
      console.warn(`Skipped missing asset ${assetPath} (${response.status})`);
      continue;
    }
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
    console.log(`Downloaded ${assetPath}`);
  }
}

await mkdir(path.join(contentRoot, "pages"), { recursive: true });
await mkdir(path.join(contentRoot, "styles"), { recursive: true });

const seoData = {};
const htmlByRoute = new Map();
for (const route of canonicalRoutes) {
  const html = await fetchText(canonicalUrl(route));
  htmlByRoute.set(route, html);
  seoData[route] = extractSeo(html, route);
  console.log(`SEO ${route}`);
}

const additionalPages = {};
for (const route of pagesToImport) {
  const page = await importPage(route, htmlByRoute.get(route), seoData[route]);
  if (missingRoutes.includes(route)) additionalPages[route] = page;
  console.log(`Content ${route}`);
}

await writeFile(
  path.join(projectRoot, "lib", "seo-data.js"),
  `// Generated by scripts/import-live-seo.mjs from the production site.\nexport const SEO_DATA = ${JSON.stringify(seoData, null, 2)};\n`
);
await writeFile(
  path.join(projectRoot, "lib", "additional-pages.js"),
  `// Generated by scripts/import-live-seo.mjs from the production site.\nexport const ADDITIONAL_PAGES = ${JSON.stringify(additionalPages, null, 2)};\n`
);

await Promise.all([
  copyFile(path.join(publicRoot, "icons", "favicon.ico"), path.join(publicRoot, "favicon.ico")),
  copyFile(path.join(publicRoot, "icons", "favicon-16x16.png"), path.join(publicRoot, "favicon-16x16.png")),
  copyFile(path.join(publicRoot, "icons", "favicon-32x32.png"), path.join(publicRoot, "favicon-32x32.png")),
  copyFile(path.join(publicRoot, "icons", "apple-touch-icon.png"), path.join(publicRoot, "apple-touch-icon.png")),
  copyFile(path.join(publicRoot, "icons", "android-chrome-192x192.png"), path.join(publicRoot, "android-chrome-192x192.png")),
  copyFile(path.join(publicRoot, "icons", "android-chrome-512x512.png"), path.join(publicRoot, "android-chrome-512x512.png")),
  copyFile(path.join(publicRoot, "icons", "site.webmanifest"), path.join(publicRoot, "site.webmanifest")),
  copyFile(path.join(publicRoot, "images", "opt", "hero-bg-55-1920.jpg"), path.join(publicRoot, "og-image.jpg"))
]);

console.log(`Imported ${canonicalRoutes.length} SEO records and ${missingRoutes.length} missing pages.`);
