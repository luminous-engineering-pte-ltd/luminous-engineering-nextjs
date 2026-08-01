import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const pagesDirectory = path.join(process.cwd(), "content", "pages");
const altByImage = {
  "complete-home-service": "Complete home renovation service in Singapore",
  "bathroom-renovation": "Bathroom renovation completed by Luminous Engineering",
  "kitchen-renovation": "Kitchen renovation completed by Luminous Engineering",
  "Epoxy-Services": "Durable epoxy flooring installation in Singapore",
  "Floor-and-wall-tile-installation": "Professional floor and wall tile installation",
  "parquet-floor-sanding": "Parquet floor sanding service in Singapore",
  "parquet-floor-polishing": "Professional parquet floor polishing",
  "staircase-sanding-and-varnish": "Wooden staircase sanding and varnishing",
  "handy-man-service": "Professional handyman service in Singapore",
  "swimmingpool1": "Swimming pool construction and installation in Singapore",
  "swimmingpool7": "Professional swimming pool maintenance service",
  "swimmingpool8": "Swimming pool equipment inspection and repair",
  "swimmingpool10": "Swimming pool filtration system maintenance",
  "swimmingpool11": "Swimming pool pump and filter repair",
  "parquet-floor-varnish": "Parquet floor varnishing and refinishing",
  "parquet-replacement": "Damaged parquet flooring replacement",
  "plumbing-service": "Professional plumbing service in Singapore"
};

const files = (await readdir(pagesDirectory)).filter((file) => file.startsWith("services__") && file.endsWith(".html"));
let updatedImages = 0;

for (const file of files) {
  const filePath = path.join(pagesDirectory, file);
  let html = await readFile(filePath, "utf8");
  html = html.replace(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi, (tag, source) => {
    if (!/\balt\s*=\s*["']\s*["']/i.test(tag)) return tag;
    const basename = path.basename(source).replace(/-(?:320|480|768|1024|1366|1920|lqip)(?=\.)/i, "").replace(/\.[^.]+$/, "");
    const alt = altByImage[basename];
    if (!alt) return tag;
    updatedImages += 1;
    return tag.replace(/\balt\s*=\s*(["'])\s*\1/i, `alt="${alt}"`);
  });

  if (file === "services__swimming__pool__maintenance.html") {
    html = html
      .replace(
        '<h1 class="font-display text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Swimming Pool Maintenance in Singapore: The Luminous Engineering Guide</h1>',
        '<h2 class="font-display text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Swimming Pool Maintenance in Singapore: The Luminous Engineering Guide</h2>'
      );
  }

  await writeFile(filePath, html);
}

console.log(`Added descriptive alt text to ${updatedImages} service images and normalized the duplicate H1.`);
