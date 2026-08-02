import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import BodyClass from "../../components/BodyClass";
import GoogleReviewBadge from "../../components/GoogleReviewBadge";
import JsonLd from "../../components/JsonLd";
import PageEnhancements from "../../components/PageEnhancements";
import PageStyle from "../../components/PageStyle";
import StaticContent from "../../components/StaticContent";
import { PAGES, getPageByRoute, getStaticSlugs } from "../../lib/pages";
import { getSeoByRoute, metadataForRoute } from "../../lib/seo";

export function generateStaticParams() {
  return getStaticSlugs();
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const route = toRoute(resolvedParams?.slug);
  const page = getPageByRoute(route);

  if (!page || isErrorUtilityRoute(route)) {
    return {};
  }

  return metadataForRoute(route, page);
}

export default async function SitePage({ params }) {
  const resolvedParams = await params;
  const route = toRoute(resolvedParams?.slug);
  if (isErrorUtilityRoute(route)) {
    notFound();
  }
  const page = getPageByRoute(route);

  if (!page) {
    notFound();
  }

  const content = await readFile(path.join(process.cwd(), "content", "pages", path.basename(page.content)), "utf8");
  const legacyCascade =
    route === "/about" ||
    route === "/about.html" ||
    route === "/blog" ||
    route === "/blog.html" ||
    route === "/services.html" ||
    route.startsWith("/services/");
  const serviceCascade = route === "/services.html" || route.startsWith("/services/");
  const legacyShim =
    route === "/about" ||
    route === "/about.html" ||
    route === "/blog" ||
    route === "/blog.html";
  const pageCss = page.css
    ? await readFile(path.join(process.cwd(), "content", "styles", path.basename(page.css)), "utf8")
    : "";
  const legacyUtilityCss = legacyCascade
    ? await readFile(path.join(process.cwd(), "content", "styles", "legacy-tailwind-utilities.css"), "utf8")
    : "";
  const css = legacyCascade ? [pageCss, legacyUtilityCss].filter(Boolean).join("\n") : pageCss;

  return (
    <>
      <BodyClass className={page.bodyClass || ""} />
      <PageStyle
        css={css}
        legacyCascade={legacyCascade}
        legacyBaseShim={serviceCascade}
        legacyServiceUtilityShim={serviceCascade}
        legacyShim={legacyShim}
      />
      <StaticContent html={content} />
      {!content.includes("google-review-badge") ? <GoogleReviewBadge /> : null}
      <JsonLd data={getSeoByRoute(route)?.jsonLd || []} />
      <PageEnhancements route={route} />

    </>
  );
}

function isErrorUtilityRoute(route) {
  return route === "/404" || route === "/404.html" || route === "/not-found";
}

function toRoute(slug = []) {
  if (!slug.length) {
    return "/";
  }

  return `/${slug.join("/")}`;
}

export { PAGES };
