import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import BodyClass from "../../../components/BodyClass";
import PageEnhancements from "../../../components/PageEnhancements";
import PageStyle from "../../../components/PageStyle";
import StaticContent from "../../../components/StaticContent";
import { getPageByRoute } from "../../../lib/pages";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const route = toLegacyRoute(resolvedParams?.slug);
  const page = getPageByRoute(route);

  if (!page) {
    return {};
  }

  return {
    title: page.title || "Luminous Engineering",
    description: page.description || undefined,
    alternates: page.canonical ? { canonical: page.canonical } : undefined
  };
}

export default async function LegacyHtmlPage({ params }) {
  const resolvedParams = await params;
  const route = toLegacyRoute(resolvedParams?.slug);
  const page = getPageByRoute(route);

  if (!page) {
    notFound();
  }

  const content = await readFile(path.join(process.cwd(), "content", "pages", path.basename(page.content)), "utf8");
  const css = page.css
    ? await readFile(path.join(process.cwd(), "content", "styles", path.basename(page.css)), "utf8")
    : "";

  return (
    <>
      <BodyClass className={page.bodyClass || ""} />
      <PageStyle css={css} legacyCascade={route === "/about" || route === "/about.html"} />
      <StaticContent html={content} />
      <PageEnhancements route={route} />
    </>
  );
}

function toLegacyRoute(slug = []) {
  if (!slug.length) {
    return "/index.html";
  }

  return `/${slug.join("/")}.html`;
}
