# Luminous Engineering SEO remediation report

Completed: 1 August 2026  
Production domain: <https://luminousengineering.com.sg/>  
Verification target: local Next.js production build

## Outcome

The identified migration regressions have been remediated. The production build now has 130 indexable clean URLs, with every canonical URL returning a direct 200 response and preserving the live production title, description, H1 content, and measured body word count except for the two deliberate corrections described below.

Automated verification passed:

```text
SEO verification passed: 130 canonical pages, 130 legacy redirects, 129 internal links, 111 referenced assets, 2 sitemap endpoints.
```

## Verified results

| Check | Result |
|---|---:|
| Canonical clean pages | 130 |
| Canonical pages returning direct 200 | 130/130 |
| Titles matching legacy production | 130/130 |
| Descriptions matching legacy production | 130/130 |
| Body word counts matching legacy production | 130/130 |
| Pages with valid parseable JSON-LD | 130/130 |
| Pages with robots preview directives | 130/130 |
| Pages with Open Graph metadata | 130/130 |
| Pages with Twitter Card metadata | 130/130 |
| Historical `.html` URLs returning permanent 308 | 130/130 |
| Internal page links resolving directly without redirect/error | 129/129 |
| Referenced local assets returning 200 | 111/111 |
| Unique URLs in each sitemap endpoint | 130 |
| Duplicate or `.html` sitemap entries | 0 |
| Unknown/error utility routes returning 404 | Pass |
| Images without an `alt` attribute | 0 |
| Production build | Pass |

## Implemented remedies

1. Imported the eight missing live blog articles and refreshed the blog index so all article cards are present.
2. Restored the seven truncated service descriptions exactly and fixed the quote-sensitive migration parser.
3. Added `/robots.txt`, `/sitemap.xml`, and a backward-compatible `/sitemap_index.xml`.
4. Rebuilt the sitemap from the canonical route registry, eliminating all legacy duplicates, omissions, and `.html` entries.
5. Restored the legacy JSON-LD and added valid fallback schema to pages that previously had none or invalid markup.
6. Corrected obsolete cross-domain canonical references in page tags and structured data.
7. Added consistent robots directives with unrestricted text, image, and video previews.
8. Added page-specific Open Graph and Twitter Card metadata to every canonical page.
9. Added a working social image at `/og-image.jpg`.
10. Converted historical `.html` URLs to permanent 308 redirects that preserve their signals and lead to direct 200 canonical pages.
11. Aligned canonical, sitemap, internal-link, and trailing-slash formats around extensionless, non-trailing-slash URLs.
12. Removed the crawlable `/legacy/...` duplicate route and fixed `/not-found` to return 404.
13. Installed Google Tag Manager container `GTM-TJ9758RG` globally, with its loader high in the shared head and its noscript iframe immediately after the opening body tag.
14. Restored root favicon and manifest URLs and corrected the manifest configuration.
15. Added descriptive alt text to 49 service images; the five remaining empty alts are intentional decorative carousel images.
16. Corrected the duplicate H1 on the swimming-pool maintenance page.
17. Added production security headers and removed the `X-Powered-By` response header.
18. Added repeatable `seo:import` and `seo:verify` commands.

## Intentional safe differences from the legacy site

- `/services.html` permanently redirects to `/services`. The former was an uncanonicalized secondary services page; the redirect consolidates any signals into the primary services URL.
- Three service pages previously canonicalized to unrelated domains. Their canonicals now correctly self-reference `luminousengineering.com.sg`.
- `/services/swimming-pool-maintenance` now has one H1 instead of two.
- Every canonical page now has social metadata and valid structured data, including pages that lacked it on the legacy site.
- Long existing titles and descriptions were preserved. Bulk rewriting them without Search Console query/CTR evidence could disrupt current rankings and snippets, so this audit did not make speculative copy changes.

## Deployment safeguards

Before switching DNS or production routing:

1. Run `npm run build`.
2. Start the production build and run `SEO_VERIFY_ORIGIN=<preview-origin> npm run seo:verify`.
3. Confirm the hosting layer does not override the application redirects, `robots.txt`, sitemap files, canonical host, or security headers.
4. After deployment, submit `https://luminousengineering.com.sg/sitemap.xml` in Google Search Console.
5. Inspect the homepage, one service, one location, one existing blog article, and one newly imported article in URL Inspection.
6. Monitor 404s, indexed-page counts, canonical selection, impressions, clicks, and Core Web Vitals during the following weeks.

No implementation can guarantee unchanged rankings because search-engine processing and the production hosting layer are external. The repository now passes the controllable technical parity checks designed to prevent migration-related URL and metadata loss.

## Commands

```bash
npm run build
npm start -- --hostname 127.0.0.1 --port 3001
SEO_VERIFY_ORIGIN=http://127.0.0.1:3001 npm run seo:verify
```

The live snapshot can be refreshed deliberately with `npm run seo:import`; review generated changes before deploying because it fetches the current production metadata and article source.
