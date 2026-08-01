import { readFile } from "node:fs/promises";
import path from "node:path";

export default async function Footer() {
  const footer = await readFile(path.join(process.cwd(), "content/shared/footer.html"), "utf8");
  return <div dangerouslySetInnerHTML={{ __html: footer }} />;
}
