import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, ".codex-doc-sources");
const pageDir = path.join(root, "content", "pages");

const heroImage = "/images/opt/swimmingpool7-1024.jpg";

const pages = [
  {
    source: "content-creation.md",
    marker: "Tab 1",
    route: "/blog/pool-leak-repair-cost-singapore-2026",
    file: "seo__pool__leak__repair__cost__singapore__2026.html",
    title: "Pool Leak in Singapore: Signs, Solutions & Repair Cost (2026 Guide)",
    description: "Learn the signs of a swimming pool leak in Singapore, repair options, leak detection methods and 2026 cost ranges.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 2",
    route: "/blog/pool-water-loss-causes-fixes-cost-singapore-2026",
    file: "seo__pool__water__loss__causes__fixes__cost__singapore__2026.html",
    title: "Pool Water Loss: Causes, Fixes & Cost Singapore (2026)",
    description: "Compare normal pool evaporation with real water loss, common causes, fixes and 2026 repair costs in Singapore.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 3",
    route: "/blog/pool-cracks-repair-cost-singapore-2026",
    file: "seo__pool__cracks__repair__cost__singapore__2026.html",
    title: "Pool Cracks: Causes, Repair Options & Cost Singapore (2026)",
    description: "Understand pool crack types, structural warning signs, repair options and cost ranges for Singapore pool owners.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 4",
    route: "/blog/pool-waterproofing-issues-solutions-cost-singapore-2026",
    file: "seo__pool__waterproofing__issues__solutions__cost__singapore__2026.html",
    title: "Pool Waterproofing Issues: Solutions & Cost Singapore (2026)",
    description: "A practical guide to swimming pool waterproofing failures, repair methods and cost ranges in Singapore.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 5",
    route: "/blog/cloudy-pool-water-causes-fixes-cost-singapore-2026",
    file: "seo__cloudy__pool__water__causes__fixes__cost__singapore__2026.html",
    title: "Cloudy Pool Water: Causes, Fixes & Cost Singapore (2026)",
    description: "See why pool water turns cloudy in Singapore, what to check first and when professional cleaning or repair is needed.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 6",
    route: "/blog/pool-tile-damage-repair-cost-singapore-2026",
    file: "seo__pool__tile__damage__repair__cost__singapore__2026.html",
    title: "Pool Tile Damage: Repair Options & Cost in Singapore (2026 Guide)",
    description: "Review common swimming pool tile damage, repair options, regrouting and replacement cost ranges in Singapore.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 7",
    route: "/blog/best-pool-maintenance-companies-singapore-2026",
    file: "seo__best__pool__maintenance__companies__singapore__2026.html",
    title: "10 Best Pool Maintenance Companies in Singapore [2026]",
    description: "Compare the best pool maintenance companies in Singapore for 2026, including service scope, costs, FAQs and selection tips.",
    eyebrow: "2026 Contractor Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 8",
    route: "/blog/pool-pump-problems-repair-cost-singapore-2026",
    file: "seo__pool__pump__problems__repair__cost__singapore__2026.html",
    title: "Pool Pump Problems: Solutions & Repair Cost in Singapore (2026 Guide)",
    description: "Troubleshoot common pool pump problems and compare repair, replacement and installation costs in Singapore.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 9",
    route: "/blog/pool-renovation-cost-singapore-2026",
    file: "seo__pool__renovation__cost__singapore__2026.html",
    title: "Pool Renovation: Problems, Solutions & Cost in Singapore (2026 Guide)",
    description: "Plan a swimming pool renovation in Singapore with common problems, upgrade options, timelines and 2026 cost ranges.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 10",
    route: "/blog/pool-surface-damage-repair-cost-singapore-2026",
    file: "seo__pool__surface__damage__repair__cost__singapore__2026.html",
    title: "Pool Surface Damage: Repair Solutions & Cost in Singapore (2026 Guide)",
    description: "Compare pool surface damage types, repair methods and resurfacing cost ranges for Singapore properties.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 11",
    route: "/blog/pool-water-level-dropping-causes-fixes-cost-singapore-2026",
    file: "seo__pool__water__level__dropping__causes__fixes__cost__singapore__2026.html",
    title: "Pool Water Level Dropping: Causes, Fixes & Cost in Singapore (2026 Guide)",
    description: "Find out why your pool water level keeps dropping, how to test for leaks and what repairs may cost in Singapore.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "content-creation.md",
    marker: "Tab 12",
    route: "/blog/pool-leakage-detection-methods-repair-cost-singapore",
    file: "seo__pool__leakage__detection__methods__repair__cost__singapore.html",
    title: "Pool Leakage Detection Singapore: Methods & Repair Cost Guide (2026)",
    description: "Suspect a pool leak? Learn the professional pool leak detection methods used in Singapore — pressure testing, dye testing, acoustic tracing — plus repair cost guide.",
    eyebrow: "2026 Pool Repair Guide"
  },
  {
    source: "re-optimize.md",
    marker: "BLOG 01",
    route: "/blog/best-swimming-pool-contractor-singapore",
    file: "seo__best__swimming__pool__contractor__singapore.html",
    title: "Best Swimming Pool Contractor Singapore [2026]",
    description: "Compare top swimming pool contractors in Singapore and learn why Luminous Engineering is a strong choice for pool projects.",
    eyebrow: "2026 Contractor Guide"
  },
  {
    source: "re-optimize.md",
    marker: "BLOG 02",
    route: "/blog/best-electrician-singapore",
    file: "seo__best__electrician__singapore.html",
    title: "Best Electrician Singapore [2026]",
    description: "Compare reliable electricians and electrical service providers in Singapore, with cost guides and selection tips.",
    eyebrow: "2026 Contractor Guide"
  },
  {
    source: "re-optimize.md",
    marker: "BLOG 03",
    route: "/blog/best-painting-companies-singapore",
    file: "seo__best__painting__companies__singapore.html",
    title: "Best Painting Companies in Singapore [2026]",
    description: "Review leading painting companies in Singapore, common painting services, pricing factors and how to choose a contractor.",
    eyebrow: "2026 Contractor Guide"
  },
  {
    source: "re-optimize.md",
    marker: "SERVICE",
    route: "/services/swimming-pool-repair",
    file: "seo__services__swimming__pool__repair.html",
    title: "Swimming Pool Repair Singapore - Luminous Engineering",
    description: "Swimming pool repair and equipment installation in Singapore for pumps, filters, leaks, plumbing and urgent pool faults.",
    eyebrow: "Swimming Pool Services"
  },
  {
    source: "re-optimize.md",
    marker: "SERVICE 02",
    route: "/services/swimming-pool-maintenance",
    file: "seo__services__swimming__pool__maintenance.html",
    title: "Pool Maintenance Singapore - Luminous Engineering",
    description: "Professional pool maintenance in Singapore for residential, condominium, MCST-managed and commercial swimming pools.",
    eyebrow: "Swimming Pool Services"
  },
  {
    source: "re-optimize.md",
    marker: "Copy of SERVICE 02",
    route: "/services/emergency-swimming-pool-services",
    file: "seo__services__emergency__swimming__pool__services.html",
    title: "Emergency Swimming Pool Services Singapore",
    description: "Urgent swimming pool support in Singapore for leaks, pump faults, filter failures, unsafe water and emergency triage.",
    eyebrow: "Swimming Pool Services"
  }
];

const sourceCache = new Map();

function readSource(name) {
  if (!sourceCache.has(name)) {
    sourceCache.set(name, fs.readFileSync(path.join(sourceDir, name), "utf8"));
  }
  return sourceCache.get(name);
}

function getBlock(sourceName, marker) {
  const source = readSource(sourceName);
  const heading = `# ${marker}`;
  const start = source.indexOf(heading);
  if (start === -1) throw new Error(`Missing marker: ${sourceName} ${marker}`);
  const rest = source.slice(start + heading.length);
  const next = rest.search(/\n# (?:Tab \d+|BLOG \d+|SERVICE(?: 02)?|Copy of SERVICE 02)\b/);
  return (next === -1 ? rest : rest.slice(0, next)).trim();
}

function cleanBlock(raw, page) {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const cleaned = [];
  let skippingMetaTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      cleaned.push("");
      continue;
    }
    if (/^#+\s*$/.test(trimmed)) continue;
    if (/^#{1,3}.*luminousengineering\.com\.sg/i.test(trimmed)) continue;
    if (/^#{1,3}\s*(?:\[?\*\*?)?\/(?:blog|services)\//i.test(trimmed)) continue;
    if (/^#{1,3}\s*\*\*Need Redirection/i.test(trimmed)) continue;
    if (/^#{1,3}\s*\*\*Redirect to/i.test(trimmed)) continue;
    if (/^#{1,3}\s*\*\*Meta Title\s*:/i.test(trimmed)) continue;
    if (/^\|\s*Target URL Slug\s*\|/i.test(trimmed)) {
      skippingMetaTable = true;
      continue;
    }
    if (skippingMetaTable) {
      if (/^\|/.test(trimmed)) continue;
      skippingMetaTable = false;
    }
    cleaned.push(line);
  }

  let text = cleaned.join("\n").trim();
  text = text.replace(/\[luminousengineering\.com\.sg\]\(https:\/\/luminousengineering\.com\.sg\)/g, "[luminousengineering.com.sg](/)");
  text = text.replace(/\[luminousengineering\.com\.sg\]\(https\\:\/\/luminousengineering\.com\.sg\)/g, "[luminousengineering.com.sg](/)");
  text = text.replace(/\\([[\].()+\-#])/g, "$1");
  text = text.replaceAll("https://luminousengineering.com.sg", "");
  text = text.replaceAll("https\\://luminousengineering.com.sg", "");
  text = text.replaceAll("/blog/pool-tile-damage-repair-options-cost-singapore", "/blog/pool-tile-damage-repair-cost-singapore-2026");
  text = text.replaceAll("/blog/pool-water-level-guide", "/blog/pool-water-level-dropping-causes-fixes-cost-singapore-2026");
  text = text.replaceAll("/blog/pool-water-level-dropping-causes-fixes-cost-singapore", "/blog/pool-water-level-dropping-causes-fixes-cost-singapore-2026");
  text = text.replaceAll("/blog/pool-renovation-problems-solutions-cost-singapore", "/blog/pool-renovation-cost-singapore-2026");
  text = text.replaceAll("https://wa.me/+6581836772", "https://wa.me/6581836772");
  text = text.replace(/^>\s*/gm, "");
  text = text.replace(/^\*\*\*Eyebrow:.*$/gim, "");
  text = text.replace(/^\*\*\*H1:.*$/gim, "");
  text = text.replace(/^\*\*\*Subhead\*\*\*.*$/gim, "");
  text = text.replace(/^\*CTAs:.*$/gim, "");
  text = text.replace(/^##\s+\*\*FAQ\s+—\*\*/gim, "## **Frequently Asked Questions**");
  text = text.replace(/^\*\*NEW\s+—\s+(.+?\?)\*\*\s+\*\([^)]*\)\*\s+/gim, "**$1** ");
  text = text.replace(/^##\s+.*keep as-is\.\*\*.*$/gim, "");
  text = text.replace(/^##\s+\*\*Section:.*keep.*\*\*.*$/gim, "");

  const titlePattern = new RegExp(`^#\\s+\\*\\*${escapeRegExp(page.title)}\\*\\*\\s*\\n+`, "i");
  text = text.replace(titlePattern, "");
  if (text.startsWith(`**${page.title}**`)) {
    text = text.slice(page.title.length + 4).trimStart();
  }
  if (text.startsWith(` ${page.title}`)) {
    text = text.slice(page.title.length + 1).trimStart();
  }
  return text;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderPage(page) {
  const raw = getBlock(page.source, page.marker);
  const markdown = cleanBlock(raw, page);
  const intro = firstParagraphPlain(markdown);
  const body = cleanupHtml(markdownToHtml(markdown));
  const faqs = extractFaqs(markdown);

  const html = `<main class="seo-content-page">
  <section class="seo-hero" style="--seo-hero-image: url('${heroImage}')">
    <div class="seo-hero__inner">
      <span class="seo-eyebrow">${escapeHtml(page.eyebrow)}</span>
      <h1>${inlineMarkdown(page.title)}</h1>
      <p>${escapeHtml(intro || page.description)}</p>
    </div>
  </section>
  <section class="seo-main">
    <article class="seo-article">
${indent(body, 6)}
    </article>
  </section>
</main>
`;

  fs.writeFileSync(path.join(pageDir, page.file), html, "utf8");
  return { ...page, faqs };
}

function firstParagraphPlain(markdown) {
  for (const block of markdown.split(/\n{2,}/)) {
    const trimmed = block.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("|") || isListLine(trimmed)) continue;
    return stripMarkdown(trimmed).slice(0, 320);
  }
  return "";
}

function markdownToHtml(markdown) {
  const blocks = markdown.split(/\n{2,}/);
  const out = [];
  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i].trim();
    if (!block) continue;
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!lines.length) continue;

    if (lines.every((line) => line.startsWith("|")) && lines.length >= 2) {
      out.push(renderTable(lines));
      continue;
    }

    if (lines.every(isBulletLine)) {
      out.push(`<ul>${lines.map((line) => `<li>${inlineMarkdown(line.replace(/^(?:[-*]|[•●])\s*/, "").trim())}</li>`).join("")}</ul>`);
      continue;
    }

    if (lines.every(isOrderedLine)) {
      out.push(`<ol>${lines.map((line) => `<li>${inlineMarkdown(line.replace(/^\d+\.\s*/, "").trim())}</li>`).join("")}</ol>`);
      continue;
    }

    if (lines.length === 1) {
      const line = lines[0];
      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        const level = Math.min(3, Math.max(2, heading[1].length));
        out.push(`<h${level}>${inlineMarkdown(stripWrappingBold(heading[2]))}</h${level}>`);
        continue;
      }
      if (/^\*\*[^*]+\*\*$/.test(line) && line.length < 120) {
        out.push(`<h3>${inlineMarkdown(stripWrappingBold(line))}</h3>`);
        continue;
      }
    }

    const joined = lines.join(" ");
    if (/^Need Help With|^Suspect a Pool Leak|^Stop Refilling|^Ready to|^Get Professional|^Need a Licensed|^Need Urgent|^Book/i.test(stripMarkdown(joined))) {
      out.push(`<div class="seo-cta"><p>${inlineMarkdown(joined)}</p></div>`);
    } else {
      out.push(`<p>${inlineMarkdown(joined)}</p>`);
    }
  }
  return out.join("\n");
}

function renderTable(lines) {
  const rows = lines
    .map((line) => line.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));

  const contentRows = rows.filter((row) => !row.every((cell) => /^:?-+:?$/.test(cell)));
  if (!contentRows.length) return "";
  if (contentRows.length === 1 || /Need Help With|Suspect a Pool Leak|Stop Refilling|Ready to|Get Professional|Need a Licensed|Need Urgent|Book/i.test(stripMarkdown(contentRows[0].join(" ")))) {
    return `<div class="seo-cta"><p>${inlineMarkdown(contentRows.map((row) => row.join(" | ")).join(" "))}</p></div>`;
  }
  if (contentRows[0].length === 1) {
    return `<div class="seo-cta"><p>${inlineMarkdown(contentRows.map((row) => row[0]).join(" "))}</p></div>`;
  }

  const [head, ...body] = contentRows;
  return `<table class="seo-table"><thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${head.map((_, index) => `<td>${inlineMarkdown(row[index] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function isListLine(line) {
  return isBulletLine(line) || isOrderedLine(line);
}

function isBulletLine(line) {
  return /^(?:[-*]|[•●])\s+/.test(line);
}

function isOrderedLine(line) {
  return /^\d+\.\s+/.test(line);
}

function stripWrappingBold(value) {
  return value.trim().replace(/^\*\*(.+)\*\*$/, "$1");
}

function inlineMarkdown(value) {
  let html = escapeHtml(value.trim());
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const cleanHref = href.replace(/^https:\\\/\\\/luminousengineering\.com\.sg/, "").replace(/^https:\/\/luminousengineering\.com\.sg/, "");
    return `<a href="${escapeHtml(cleanHref)}">${inlineMarkdown(label)}</a>`;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return html;
}

function cleanupHtml(value) {
  return value
    .replaceAll("&amp;amp;", "&amp;")
    .replaceAll("\\&amp;", "&amp;");
}

function stripMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_`|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function indent(value, spaces) {
  const pad = " ".repeat(spaces);
  return value.split("\n").map((line) => `${pad}${line}`).join("\n");
}

function extractFaqs(markdown) {
  const lines = markdown.split("\n").map((line) => line.trim()).filter(Boolean);
  const faqs = [];
  let inFaq = false;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^#{2,3}\s+\*\*(?:Frequently Asked Questions|FAQs)\*\*|^#{2,3}\s+(?:Frequently Asked Questions|FAQs)/i.test(line)) {
      inFaq = true;
      continue;
    }
    if (!inFaq) continue;
    if (/^##\s+/.test(line) && !/Frequently Asked Questions|FAQs/i.test(line)) break;

    let question = "";
    let answer = "";
    const normalizedLine = line.replace(/^\*\*/, "").replace(/\*\*$/, "");
    const qa = normalizedLine.match(/^Q:\s*(.+)$/i);
    if (qa) {
      question = stripMarkdown(qa[1]);
      const next = lines[i + 1] || "";
      const normalizedNext = next.replace(/^\*\*/, "").replace(/\*\*$/, "");
      const aa = normalizedNext.match(/^A:\s*(.+)$/i);
      if (aa) {
        answer = stripMarkdown(aa[1]);
        i += 1;
      }
    } else {
      const inlineBold = line.match(/^\*\*(.+?\?)\*\*\s*(.+)$/);
      if (inlineBold) {
        question = stripMarkdown(inlineBold[1]);
        answer = stripMarkdown(inlineBold[2]);
      }
      const boldOnly = line.match(/^\*\*(.+?\?)\*\*$/);
      if (!question && boldOnly) {
        question = stripMarkdown(boldOnly[1]);
        const answers = [];
        let j = i + 1;
        while (j < lines.length && !/^\*\*.+\?\*\*/.test(lines[j]) && !/^#{3,6}\s+/.test(lines[j]) && !/^##\s+/.test(lines[j])) {
          answers.push(stripMarkdown(lines[j]));
          j += 1;
        }
        answer = answers.join(" ");
        i = j - 1;
      }
      const h3 = line.match(/^#{3,6}\s+(?:\*\*)?(.+?)(?:\*\*)?$/);
      if (!question && h3) {
        question = stripMarkdown(h3[1]);
        const answers = [];
        let j = i + 1;
        while (j < lines.length && !/^#{3,6}\s+/.test(lines[j]) && !/^##\s+/.test(lines[j])) {
          answers.push(stripMarkdown(lines[j]));
          j += 1;
        }
        answer = answers.join(" ");
        i = j - 1;
      } else if (!question && /^\*\*.+\?\*\*/.test(line)) {
        const [q, ...rest] = line.split(/\*\*\s*/);
        question = stripMarkdown(q);
        answer = stripMarkdown(rest.join(" "));
      }
    }
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

function writeRouteConfig(renderedPages) {
  const lines = renderedPages.map((page) => {
    return `  [${JSON.stringify(page.route)}, ${JSON.stringify(page.title)}, ${JSON.stringify(page.description)}, ${JSON.stringify(`content/pages/${page.file}`)}]`;
  });
  const source = `const SEO_CSS = "content/styles/seo-content-shell.css";

const SEO_ROUTES = [
${lines.join(",\n")}
];

export const SEO_CONTENT_PAGES = Object.fromEntries(
  SEO_ROUTES.flatMap(([route, title, description, content]) => [
    [
      route,
      {
        title: \`\${title} | Luminous Engineering\`,
        description,
        canonical: \`https://luminousengineering.com.sg\${route}\`,
        bodyClass: "seo-content-page bg-gray-900 text-white",
        content,
        css: SEO_CSS,
        source: "Google Docs content update October 2026",
        hasNav: true,
        hasFooter: true,
        wrapWithShell: true
      }
    ],
    [
      \`\${route}.html\`,
      {
        title: \`\${title} | Luminous Engineering\`,
        description,
        canonical: \`https://luminousengineering.com.sg\${route}\`,
        bodyClass: "seo-content-page bg-gray-900 text-white",
        content,
        css: SEO_CSS,
        source: "Google Docs content update October 2026",
        hasNav: true,
        hasFooter: true,
        wrapWithShell: true,
        aliasOf: route
      }
    ]
  ])
);
`;
  fs.writeFileSync(path.join(root, "lib", "seo-content-pages.js"), source, "utf8");
}

function writeSchema(renderedPages) {
  const entries = renderedPages
    .filter((page) => page.faqs.length)
    .map((page) => {
      const faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `https://luminousengineering.com.sg${page.route}#faq`,
        mainEntity: page.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      };
      return `  ${JSON.stringify(page.route)}: [${JSON.stringify(faq, null, 2).split("\n").join("\n  ")}]`;
    });

  const source = `// Generated by scripts/apply-google-doc-content.mjs from Google Docs source content.
export const SEO_CONTENT_JSON_LD = {
${entries.join(",\n")}
};
`;
  fs.writeFileSync(path.join(root, "lib", "seo-content-schema.js"), source, "utf8");
}

const rendered = pages.map(renderPage);
writeRouteConfig(rendered);
writeSchema(rendered);

console.log(`Rendered ${rendered.length} Google Docs content pages.`);
