import { readFile } from "node:fs/promises";
import path from "node:path";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";
import { getSeoByRoute } from "../../lib/seo";

export const dynamic = "force-dynamic";

let cachedDocuments;

export async function GET(request) {
  const documents = await getDocuments();
  const acceptedEncoding = request.headers.get("accept-encoding") || "";
  const encoding = acceptedEncoding.includes("br") ? "br" : acceptedEncoding.includes("gzip") ? "gzip" : null;
  const body = encoding ? documents[encoding] : documents.identity;

  return new Response(body, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      "Vary": "Accept-Encoding",
      ...(encoding ? { "Content-Encoding": encoding } : {})
    }
  });
}

async function getDocuments() {
  if (cachedDocuments) return cachedDocuments;
  const content = await readFile(path.join(process.cwd(), "content", "pages", "index.html"), "utf8");
  const seo = getSeoByRoute("/");
  const structuredData = JSON.stringify(seo?.jsonLd || []).replaceAll("<", "\\u003c");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#facc15">
  <title>${escapeHtml(seo?.title || "Luminous Engineering")}</title>
  <meta name="description" content="${escapeHtml(seo?.description || "Professional renovation and handyman services across Singapore.")}">
  <link rel="canonical" href="https://luminousengineering.com.sg/">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preload" href="/images/opt/renovation1-1024.avif" as="image" type="image/avif" fetchpriority="high" imagesrcset="/images/opt/renovation1-1024.avif 1024w, /images/opt/renovation1-768.avif 768w, /images/opt/renovation1-480.avif 480w, /images/opt/renovation1-320.avif 320w" imagesizes="(max-width: 1023px) 100vw, 44vw">
  <link rel="preload" href="/home.css" as="style">
  <link rel="stylesheet" href="/home.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="/home.css"></noscript>
  <script type="application/ld+json">${structuredData}</script>
  <script defer src="/home-interactions.js"></script>
</head>
<body>
${content}
<script>${deferredAnalytics()}</script>
</body>
</html>`;

  const identity = Buffer.from(html);
  cachedDocuments = {
    identity,
    br: brotliCompressSync(identity, { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } }),
    gzip: gzipSync(identity, { level: 6 })
  };
  return cachedDocuments;
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function deferredAnalytics() {
  return `(function(){var loaded=false,events=['pointerdown','keydown','touchstart'];function cleanup(){events.forEach(function(e){removeEventListener(e,load,true)});clearTimeout(timer)}function load(){if(loaded)return;loaded=true;cleanup();window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=GTM-TJ9758RG';document.head.appendChild(s)}events.forEach(function(e){addEventListener(e,load,{capture:true,passive:true,once:true})});var timer=setTimeout(load,90000)})();`;
}
