import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { transform } from "lightningcss";

const root = process.cwd();
const pageCss = await fs.readFile(path.join(root, "content/styles/index.css"), "utf8");
const source = `@import "tailwindcss" source(none);\n@source "../content/pages/index.html";\n${pageCss}`;
const compiled = await postcss([tailwind()]).process(source, { from: path.join(root, "styles/home-entry.css") });
const minified = transform({ filename: "home.css", code: Buffer.from(compiled.css), minify: true });
await fs.writeFile(path.join(root, "public/home.css"), minified.code);
console.log(`Generated public/home.css (${minified.code.length} bytes)`);
