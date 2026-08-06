import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import BodyClass from "../../components/BodyClass";
import Footer from "../../components/Footer";
import GoogleReviewBadge from "../../components/GoogleReviewBadge";
import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/Navbar";
import PageEnhancements from "../../components/PageEnhancements";
import PageStyle from "../../components/PageStyle";
import ServiceLocationPage from "../../components/ServiceLocationPage";
import StaticContent from "../../components/StaticContent";
import { PAGES, getPageByRoute, getStaticSlugs } from "../../lib/pages";
import { getSeoByRoute, metadataForRoute } from "../../lib/seo";
import {
  buildServiceLocationMetadata,
  getServiceLocationPage,
  getServiceLocationStaticSlugs,
  rewriteServiceLocationLinks
} from "../../lib/service-location-pages";

export function generateStaticParams() {
  return [...getStaticSlugs(), ...getServiceLocationStaticSlugs()];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const route = toRoute(resolvedParams?.slug);
  const serviceLocationPage = getServiceLocationPage(route);
  if (serviceLocationPage) {
    return buildServiceLocationMetadata(serviceLocationPage);
  }

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
  const serviceLocationPage = getServiceLocationPage(route);
  if (serviceLocationPage) {
    const legacyUtilityCss = await readFile(path.join(process.cwd(), "content", "styles", "legacy-tailwind-utilities.css"), "utf8");
    const serviceCss = serviceLocationPage.css
      ? await readFile(path.join(process.cwd(), "content", "styles", path.basename(serviceLocationPage.css)), "utf8")
      : "";

    return (
      <>
        <BodyClass className={["service-location-body", `service-location-${serviceLocationPage.slug}`].join(" ")} />
        <PageStyle
          css={[serviceCss, legacyUtilityCss].filter(Boolean).join("\n")}
          legacyCascade
          legacyBaseShim
          legacyServiceUtilityShim
        />
        <Navbar />
        <ServiceLocationPage data={serviceLocationPage} />
        <Footer />
        <GoogleReviewBadge />
        <JsonLd data={serviceLocationPage.jsonLd} />
        <PageEnhancements route={route} />
      </>
    );
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
    route.startsWith("/blog/") ||
    route === "/services.html" ||
    route.startsWith("/services/");
  const blogDetailCascade = route.startsWith("/blog/");
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

  const renderedContent = isServiceDetailRoute(route) ? rewriteServiceLocationLinks(content, route.replace(/\.html$/, "").split("/").pop()) : content;

  return (
    <>
      <BodyClass className={page.bodyClass || ""} />
      <PageStyle
        css={css}
        legacyCascade={legacyCascade}
        blogDetailCascade={blogDetailCascade}
        legacyBaseShim={serviceCascade}
        legacyServiceUtilityShim={serviceCascade}
        legacyShim={legacyShim}
      />
      <StaticContent html={renderedContent} />
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

function isServiceDetailRoute(route) {
  const normalized = route.replace(/\.html$/, "").replace(/\/$/, "");
  return normalized.startsWith("/services/") && normalized !== "/services/index";
}

export { PAGES };
