import { readFile } from "node:fs/promises";
import path from "node:path";
import StaticContent from "../components/StaticContent";
import PageEnhancements from "../components/PageEnhancements";
import { getPageByRoute } from "../lib/pages";

export default async function NotFound() {
  const page = getPageByRoute("/404");
  const content = page
    ? await readFile(path.join(process.cwd(), "content", "pages", path.basename(page.content)), "utf8")
    : "<section class=\"min-h-screen flex items-center justify-center bg-gray-900 text-white\"><h1>404</h1></section>";

  return (
    <>
      <main>
        <StaticContent html={content} />
      </main>
      <PageEnhancements route="/404" />
    </>
  );
}
