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
  if (cachedDocuments && process.env.NODE_ENV === "production") return cachedDocuments;
  const [content, homeCss] = await Promise.all([
    readFile(path.join(process.cwd(), "content", "pages", "index.html"), "utf8"),
    readFile(path.join(process.cwd(), "public", "home.css"), "utf8")
  ]);
  const seo = getSeoByRoute("/");
  const structuredData = JSON.stringify(seo?.jsonLd || []).replaceAll("<", "\\u003c");
  const criticalCss = homeCss.replaceAll("</style", "<\\/style");

  const html = `<!doctype html>
<html lang="en">
<head>
  <!-- Google Tag Manager -->
  <script>${deferredAnalytics()}</script>
  <!-- End Google Tag Manager -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#facc15">
  <title>${escapeHtml(seo?.title || "Luminous Engineering")}</title>
  <meta name="description" content="${escapeHtml(seo?.description || "Professional renovation and handyman services across Singapore.")}">
  <link rel="canonical" href="https://luminousengineering.com.sg/">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preload" href="/images/opt/renovation1-480.avif" as="image" type="image/avif" fetchpriority="high" media="(max-width: 640px)">
  <link rel="preload" href="/images/opt/renovation1-1024.avif" as="image" type="image/avif" fetchpriority="high" media="(min-width: 641px)" imagesrcset="/images/opt/renovation1-1024.avif 1024w, /images/opt/renovation1-768.avif 768w, /images/opt/renovation1-480.avif 480w" imagesizes="44vw">
  <style>${criticalCss}</style>
  <script type="application/ld+json">${structuredData}</script>
  <script defer src="/home-interactions.js"></script>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJ9758RG"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
${content}
</body>
</html>`;

  const identity = Buffer.from(html);
  const documents = {
    identity,
    br: brotliCompressSync(identity, { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } }),
    gzip: gzipSync(identity, { level: 6 })
  };
  if (process.env.NODE_ENV === "production") cachedDocuments = documents;
  return documents;
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function deferredAnalytics() {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];var loaded=false;var events=['pointerdown','keydown','touchstart'];var timer;function cleanup(){events.forEach(function(e){w.removeEventListener(e,load,true)});w.clearTimeout(timer)}function load(){if(loaded)return;loaded=true;cleanup();w[l].push({'gtm.start':Date.now(),event:'gtm.js'});var first=d.getElementsByTagName(s)[0];var tag=d.createElement(s);var suffix=l!=='dataLayer'?'&l='+l:'';tag.async=true;tag.src='https://www.googletagmanager.com/gtm.js?id='+i+suffix;first.parentNode.insertBefore(tag,first)}events.forEach(function(e){w.addEventListener(e,load,{capture:true,passive:true,once:true})});function schedule(){if(!loaded)timer=w.setTimeout(load,30000)}if(d.readyState==='complete')schedule();else w.addEventListener('load',schedule,{once:true})})(window,document,'script','dataLayer','GTM-TJ9758RG');`;
}
