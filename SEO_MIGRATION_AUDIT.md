# Luminous Engineering Next.js SEO migration audit

> **Status update — remediated on 1 August 2026.** The findings below document the pre-remediation state. All migration regressions and the identified safe technical remedies have now been implemented and verified. See [`SEO_REMEDIATION_REPORT.md`](./SEO_REMEDIATION_REPORT.md) for the final production-readiness results.

Audit date: 1 August 2026 (Asia/Dhaka)  
Legacy site: <https://luminousengineering.com.sg/>  
Next.js target: local production build from this repository  
Detailed page matrix: [`SEO_PAGE_COMPARISON.csv`](./SEO_PAGE_COMPARISON.csv)

## Executive verdict

The conversion is **not yet SEO-equivalent and should not replace the legacy deployment without remediation**.

The migration preserves the basic metadata and body content for most migrated pages very well: all 123 routes that exist in both versions return 200, all 123 retain the same title, all 123 retain an equivalent canonical, and all 123 retain the same H1 text. However, the audit found several material regressions:

1. Eight live, indexable blog articles are absent from the Next.js project and return 404.
2. Seven important service-page descriptions were truncated to only `Singapore`.
3. The Next.js project has no working `robots.txt`, sitemap, or sitemap index.
4. All structured data was removed: 120 legacy pages contain at least one valid JSON-LD block, while the Next.js output contains none.
5. Legacy robots directives were removed from every migrated 200 page.
6. Open Graph and Twitter metadata were removed from the homepage and services index.
7. Five retained canonical URLs now point to trailing-slash URLs that Next.js immediately redirects elsewhere.
8. The migration creates a new 200-status soft-404 at `/not-found`.

## Audit coverage and method

The audit used the live [`robots.txt`](https://luminousengineering.com.sg/robots.txt), live [`sitemap_index.xml`](https://luminousengineering.com.sg/sitemap_index.xml), internal links found across the legacy pages, the Next.js route registry, and the rendered output of a successful local production build.

For every discovered canonical page, the crawl collected:

- initial and final HTTP status;
- redirect chain;
- title and meta description;
- canonical and robots directives;
- Open Graph and Twitter metadata;
- JSON-LD validity and schema types;
- HTML language and viewport;
- H1–H6 headings;
- body word count;
- image and missing-alt counts;
- internal page links;
- selected crawl/security response headers.

Coverage totals:

| Item | Result |
|---|---:|
| Legacy canonical pages audited | 131 |
| Canonical pages present in Next.js | 123 |
| Canonical pages missing from Next.js | 8 |
| Registered Next.js routes, including aliases and utility routes | 248 |
| Legacy/Next `.html` aliases checked | 123 |
| Additional `/not-found` alias checked | 1 |
| Unique local internal page links tested | 122 |
| Broken local internal links among those links | 0 |
| Production build | Passed; 250 static pages generated |

This is a technical crawl and source audit. It does not include Google Search Console coverage, live rankings, backlink data, production Core Web Vitals, or post-deployment CDN behavior.

## Page-level parity summary

| Signal | Same | Different or missing | Result |
|---|---:|---:|---|
| Final HTTP 200 | 123/131 | 8 return 404 | Fail |
| Title | 123/131 | 8 missing pages | Pass for every migrated page |
| Description | 116/131 | 7 truncated + 8 missing pages | Fail |
| Canonical, URL-equivalent | 123/131 | 8 missing pages | Pass for every migrated page, with redirect caveats |
| Robots content | 15/131 | 116 changed | Fail |
| Valid JSON-LD present | 0/120 retained | Removed from all 120 legacy-schema pages | Fail |
| Open Graph present | 0/2 retained | Removed from both pages | Fail |
| Twitter Card present | 0/2 retained | Removed from both pages | Fail |
| H1 text | 123/131 | 8 missing pages | Pass for every migrated page |
| Main text word count | 122/131 exact | Blog index is 220 words behind + 8 missing pages | Mostly pass |
| Missing image alt attributes | Same | 54 remain missing across 18 pages | No migration regression |

## Critical and high-priority findings

### 1. Eight indexable articles are missing

All eight pages return 200 on the legacy site at both the clean canonical URL and the `.html` URL. Both forms return 404 in the production Next.js build. Each legacy page explicitly permits indexing and contains `BlogPosting`, `ImageObject`, and `Organization` structured data.

| Missing canonical route | Legacy title |
|---|---|
| `/blog/best-electrician-services-singapore-2026` | 10 Best Electrician Services in Singapore [2026] \| Luminous Engineering |
| `/blog/best-pool-maintenance-companies-singapore-2026` | 10 Best Pool Maintenance Companies in Singapore [2026] \| Luminous Engineering |
| `/blog/electrician-price-list-singapore-2026` | Electrician Price List Singapore [2026] \| Luminous Engineering |
| `/blog/install-power-socket-singapore-price-2026` | Install Power Socket Singapore Price [2026] \| Luminous Engineering |
| `/blog/light-installation-singapore-price-2026` | Light Installation Singapore Price [2026] \| Luminous Engineering |
| `/blog/painting-service-singapore-price-list-2026` | Painting Service Singapore PRICE LIST [2026] \| Luminous Engineering |
| `/blog/pool-maintenance-cost-singapore-2026` | Pool Maintenance Cost Singapore [2026] \| Luminous Engineering |
| `/blog/power-trip-repair-cost-singapore-2026` | Power Trip Repair Cost Singapore [2026] \| Luminous Engineering |

Their corresponding `.html` URLs are also absent. The live [blog index](https://luminousengineering.com.sg/blog) links to 43 article URLs; the migrated blog index links to only 35. This accounts for the 220-word difference on `/blog`.

Impact: existing indexed URLs, ranking signals, long-tail traffic, internal-link equity, and schema coverage would be lost at deployment.

Required action: migrate the eight full articles, add both clean and legacy URL handling, update the blog index, and include only the clean canonical URLs in the new sitemap.

### 2. Seven descriptions were truncated

The title, canonical, H1, and body content on these pages were preserved, but the Next.js description is only `Singapore`.

| Route | Legacy description | Next.js description |
|---|---|---|
| `/services/complete-renovation` | Singapore's Best Home Renovation Service · Call Luminous Engineering's on +65 8183 6772 · Fully Insured Team · Consistent 5 STAR Google Rating. | Singapore |
| `/services/epoxy-floor` | Singapore's Top-notch Epoxy flooring Service · Call Luminous Engineering's on +65 8183 6772 · Fully Insured Team · Consistent 5 STAR Google Rating. | Singapore |
| `/services/floor-polishing` | Singapore's Top-notch Floor Polishing Services · Call Luminous Engineering's on +65 8183 6772 · Fully Insured Team · Consistent 5 STAR Google Rating. | Singapore |
| `/services/handyman` | Singapore's Top-notch Handyman Service · Call Luminous Engineering's on +65 8183 6772 · Fully Insured Team · Consistent 5 STAR Google Rating. | Singapore |
| `/services/parquet-floor-repair` | Singapore's Trusted Parquet Floor Repair Services · Call Luminous Engineering's on +65 8183 6772 · Fully Insured Team · Consistent 5 STAR Google Rating. | Singapore |
| `/services/plumbing` | Singapore's Top-notch Plumbing Service · Call Luminous Engineering's on +65 8183 6772 · Fully Insured Team · Consistent 5 STAR Google Rating. | Singapore |
| `/services/tile-installation` | Singapore's Top-notch Tiling Contractor Service · Call Luminous Engineering's on +65 8183 6772 · Fully Insured Team · Consistent 5 STAR Google Rating. | Singapore |

Root cause: the migration regex treats either quote character as the end of the value, even when a double-quoted description legitimately contains an apostrophe. See `attrFromMeta()` in `scripts/migrate.mjs`. The generated values were then written into `lib/pages.js` and emitted by `generateMetadata()`.

Impact: substantially weaker or rewritten search snippets on seven commercial service pages.

### 3. `robots.txt` and sitemap endpoints are absent

Legacy behavior:

- `/robots.txt`: 200, allows crawling, and points to `/sitemap_index.xml`.
- `/sitemap_index.xml`: 200.

Next.js production behavior:

- `/robots.txt`: 404.
- `/sitemap.xml`: 404.
- `/sitemap_index.xml`: 404.

This is a direct migration regression. Add Next.js metadata routes (`app/robots.js` and `app/sitemap.js`) or equivalent static files before deployment.

The old sitemap should not be copied unchanged. It already contains significant defects:

| Legacy sitemap issue | Count |
|---|---:|
| Total `<loc>` entries | 107 |
| Unique URLs | 76 |
| Duplicate URL groups | 31 |
| Canonical routes omitted | 65 |
| `.html` alias URLs included | 18 |
| Included `.html` URLs absent from Next.js | 8 |

The 65 omitted canonical routes comprise 35 blog articles, all 25 location pages, `/contact`, `/services`, `/services.html`, `/services/floor-polishing`, and `/services/parquet-floor-repair`.

### 4. All valid structured data was removed

The legacy site has at least one valid JSON-LD block on 120 of 131 canonical pages. The Next.js site has zero JSON-LD blocks on every page.

Most widely used legacy schema types:

| Schema type | Legacy pages |
|---|---:|
| `Organization` | 118 |
| `Service` | 82 |
| `PostalAddress` | 82 |
| `BreadcrumbList` | 64 |
| `FAQPage` | 58 |
| `BlogPosting` | 36 |
| `ImageObject` | 36 |
| `City` | 25 |
| `Article` | 19 |

The homepage additionally uses local-business, offer-catalog, aggregate-rating, review, and opening-hours entities. The migration script deliberately strips every `<script>` from the body fragment, while `generateMetadata()` restores only title, description, and canonical. JSON-LD from the original `<head>` is therefore never reintroduced.

Impact: loss of machine-readable organization, service, article, breadcrumb, FAQ, location, rating, and review information. Search engines can still index the pages, but rich-result eligibility and entity understanding may be reduced.

One legacy JSON-LD block on `/services/parquet-floor-repair` is invalid and should be repaired rather than copied verbatim.

### 5. Robots preview directives were removed

Legacy pages contain:

- 114 pages with `follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large`;
- 2 pages with `index, follow`;
- 15 pages with no explicit robots meta tag.

The Next.js output contains no explicit robots tag on any of the 123 valid pages. The eight missing pages receive Next.js's automatic `noindex` only because they are 404 responses.

Omitting plain `index, follow` does not prevent indexing because it is the default. However, removing `max-image-preview:large` and the unlimited snippet/video preview directives is a real parity change on 106 successfully migrated pages.

## Medium-priority findings

### Social metadata was removed

The legacy homepage and `/services` have Open Graph and Twitter Card metadata. Both sets are absent from Next.js. The legacy `og:image` target, `/og-image.png`, already returns 404 on the deployed site and is also absent locally, so restoration should use a valid share image rather than perpetuate the broken URL.

### Canonical and trailing-slash behavior now conflict on five routes

Next.js redirects every tested non-root trailing-slash form to its non-slash form with HTTP 308. Five retained canonical tags still point to the trailing-slash form:

- `/services`
- `/services/complete-renovation`
- `/services/hacking`
- `/services/partition-ceiling`
- `/services/plastering`

Those canonical targets return 308 in Next.js. Canonicals should resolve directly with 200. Either make the canonical values non-slash or configure the application to serve the trailing-slash versions consistently.

The URL behavior is not identical to the legacy server: 127 of 130 tested legacy trailing-slash variants return 200, whereas all 130 Next.js variants redirect to the non-slash form. Consolidation is generally preferable, but redirects, canonicals, internal links, and the sitemap must all agree on one format.

### Legacy `.html` aliases remain duplicate 200 pages

All 123 tested `.html` page aliases return 200 in both versions. Their canonical tags usually point to the clean URL, which limits duplication, but permanent redirects would consolidate signals more clearly and reduce crawl waste. The current Next.js rewrite in `next.config.mjs` preserves the duplicate-200 behavior rather than redirecting.

### New soft-404 route

The legacy `/not-found` returns a real 404. The Next.js route registry aliases it to the 404 content but serves HTTP 200. Unknown arbitrary URLs correctly return 404, so the problem is isolated to the registered `/not-found` alias. Remove the alias or force a genuine 404/noindex response.

`/404.html` remains a 200 page in both versions. It should be excluded from the sitemap and preferably redirected or explicitly noindexed if retained.

### Google Tag Manager was removed

The legacy HTML includes container `GTM-MZZZFB66`. No equivalent loader exists in the Next.js layout or components. This is primarily an analytics and conversion-measurement regression rather than a direct ranking signal, but it should be restored if the container is still in use, with consent handling as applicable.

### Language and browser metadata changed

- Legacy language values: 118 pages use `en`; 13 use `en-US`.
- Next.js forces `lang="en"` on all successfully rendered pages.
- Legacy pages all include `theme-color`; Next.js does not.
- Legacy viewport variants were normalized to Next.js's `width=device-width, initial-scale=1`.
- Two legacy pages use meta keywords; Next.js removes them. This has no meaningful Google ranking impact.

These are mostly low-risk differences, but they confirm the generated `<head>` is not identical.

## What the migration preserved correctly

- All 123 migrated canonical routes return 200.
- All 123 migrated titles match exactly.
- All 123 migrated canonicals are URL-equivalent to the legacy values.
- 116 of 123 migrated descriptions match exactly.
- All 123 migrated pages retain the same H1 text.
- 122 of 123 migrated pages retain the exact measured body word count.
- The only content-count difference among existing routes is `/blog`, caused by the eight missing article cards.
- All 122 unique internal links present in the Next.js-rendered page set resolve without a 4xx/5xx response.
- Existing image-alt defects were neither introduced nor increased: both versions have 54 missing/empty alts across the same 18 migrated pages.
- Favicons and the manifest are available at their new `/icons/...` paths and are correctly referenced by the Next.js layout.
- The production build completes successfully.

## Pre-existing SEO issues preserved from the legacy site

These are not conversion regressions, but deployment is a good opportunity to correct them:

1. Three service pages canonicalize to other domains:
   - `/services/jacuzzi-system-installation` → `luminousengineeringsg.com`
   - `/services/water-feature-system-installation` → `luminousengineeringsg.com`
   - `/services/swimming-pool-pump-repair` → `poolexpertssg.com`
2. `/services.html` has no canonical.
3. The legacy sitemap has 31 duplicate URL groups, omits 65 canonical routes, and includes 18 `.html` aliases.
4. The Open Graph image URL used by the homepage and services index returns 404.
5. One JSON-LD block on `/services/parquet-floor-repair` is invalid.
6. One page, `/services/swimming-pool-maintenance`, contains two H1 elements.
7. Eighteen pages contain 54 images with missing or empty alt text.
8. Using simple crawl heuristics—not hard search-engine limits—91 titles exceed 60 characters, one title is under 30 characters, and 78 descriptions exceed 160 characters. There are no missing or duplicated titles/descriptions across the 131 canonical legacy pages.

## Recommended remediation order

### P0 — before replacing the legacy deployment

1. Migrate the eight missing articles and add them to the blog index.
2. Fix the metadata parser and restore the seven full service descriptions.
3. Add a clean, complete `robots.txt` and sitemap containing the 131 canonical clean URLs only.
4. Restore valid page-specific JSON-LD using Next.js-rendered `<script type="application/ld+json">` blocks.
5. Align trailing-slash redirects, canonical tags, sitemap URLs, and internal links.
6. Ensure both versions of every historically reachable missing article URL resolve: clean URLs should be 200; `.html` URLs should permanently redirect to them.

### P1 — immediately after P0

1. Restore Open Graph and Twitter metadata for at least the homepage and services index, with a working image.
2. Restore robots preview directives where they existed.
3. Fix the three cross-domain canonicals and add a canonical to `/services.html` or redirect it.
4. Redirect existing `.html` aliases to their clean canonical URLs.
5. Remove the 200 `/not-found` alias and ensure retained error utility pages are noindexed.
6. Restore Google Tag Manager if still required.

### P2 — quality improvements

1. Repair invalid JSON-LD and validate representative templates in Schema.org/Rich Results tooling.
2. Review long titles/descriptions based on actual Search Console query and CTR data.
3. Fix the duplicate H1 and missing image alt attributes.
4. After deployment, crawl the public Next.js origin again and verify production redirects, status codes, headers, canonicals, sitemap discovery, Core Web Vitals, and Search Console coverage.

## Relevant implementation locations

- `app/layout.js`: defines only base URL, title, icons, manifest, and a global `lang="en"`.
- `app/[[...slug]]/page.js`: `generateMetadata()` emits only title, description, and canonical.
- `scripts/migrate.mjs`: strips scripts/noscript content and contains the quote-sensitive description parser.
- `lib/pages.js`: generated route, title, description, and canonical registry.
- `next.config.mjs`: rewrites `.html` URLs to legacy rendering instead of redirecting them.
- `scripts/seo-audit.mjs`: reproducible audit crawler created for this report.

## Audit artifacts

- `SEO_PAGE_COMPARISON.csv`: all 131 canonical routes with legacy and Next.js statuses, titles, descriptions, canonicals, robots directives, structured-data counts/types, social metadata counts, H1 counts, word counts, and image-alt counts.
- `scripts/seo-audit.mjs`: rerunnable crawler. Run a production server and use:

  ```bash
  SEO_AUDIT_LOCAL_ORIGIN=http://127.0.0.1:3001 node scripts/seo-audit.mjs /tmp/luminous-seo-audit.json SEO_PAGE_COMPARISON.csv
  ```
