# Technical QA report — Unpredictable Automation

**Date:** 19 November 2026  
**Source audited:** The existing `Unpredictable_Automation_Production` GitHub Pages candidate (derived from the supplied `Unpredictable_Automation_Final(1).html`).  
**Target canonical domain:** `https://shamim98.com/`  
**Status:** **Local structural and isolated browser checks PASSED; live deployment verification PENDING.** This is NOT a production-hosted test or a certification of accessibility, security, privacy-law compliance or search ranking.

## Repairs made before packaging

1. Added the already-existing homepage consent preferences interface to the **four service pages and privacy page**; otherwise their "Cookie preferences" controls could not open the consent UI on those pages. Added matching CSS to `assets/service.css` without changing the design.
2. Repackaged files **at ZIP root**, not in a nested project directory, so `index.html` and `CNAME` are in the correct position when the archive is extracted/uploaded to a GitHub repository root.
3. Preserved the existing site content, motion design, service coverage, portfolio distinctions and blank optional integration IDs. Did not add fictitious clients, services, credentials or tracking values.

## Actual checks performed

| Check | Result | Method |
|---|---|---|
| Required production files | PASS | Confirmed existence and readable nonempty contents of each required file (except intentionally empty `.nojekyll`) |
| Local file references | PASS | Verified **115** HTML/CSS file references resolve to production files; checked links and fragment anchors |
| Internal page targets | PASS (static) | Confirmed homepage, four service pages, privacy page and 404 file; navigation link targets exist |
| Sitemap | PASS | Parsed valid XML; 5 unique canonical URLs reference existing indexable pages |
| robots.txt and CNAME | PASS | Sitemap directive points to canonical domain; CNAME is `shamim98.com` |
| Metadata and JSON-LD | PASS (syntax) | Checked page titles/canonical metadata; JSON-LD parsed successfully; no duplicate HTML IDs found |
| Open Graph image | PASS (file check) | Real image in archive; 1200×630 pixels |
| JavaScript syntax | PASS | `node --check` on both external JS files and both homepage inline scripts |
| Homepage layout | PASS (isolated Chromium) | Widths **320, 375, 390, 768, 1024 and 1440px**; zero observed horizontal overflow |
| Four service pages and privacy | PASS (isolated Chromium) | Rendered at 390px; no observed horizontal overflow or uncaught JavaScript exceptions |
| Responsive contact dock | PASS | Hidden at 320, 375 and 390px |
| Mobile navigation | PASS | Toggled open/closed with correct `aria-expanded` state |
| Portfolio filters | PASS | Concept filter showed **2** concept items; All Work showed **5** portfolio items |
| Contact form invalid input | PASS | Invalid brief was blocked without claiming submission |
| Cookie preferences | PASS | Opened and closed on homepage; **all four service pages and privacy** now open the panel |
| Optional tracking before consent | PASS (simulated) | With test-only IDs in memory, no GA4 or Meta scripts injected before consent |
| No-JS and reduced-motion fallback | PASS (isolated Chromium) | Homepage headings/services remain visible; reduced-motion and no-JS intro fallbacks applied |

## Important limitations (still require real deployment)

- The environment blocks `file://`, localhost and the real `https://shamim98.com/` browser navigation. **Isolated Chromium used `set_content` with local CSS and JS loaded into the browser in memory.** This checks rendered layout and interactions, but does **not** prove actual HTTPS navigation, HTTP status codes, GitHub Pages routing, redirect behavior, caching or asset transfer.
- Google Fonts remote downloads were disabled during isolated tests; actual font delivery, CLS, Core Web Vitals, Lighthouse/PageSpeed scores and screen-reader behavior are **not** measured.
- External website links (including Double Generation), WhatsApp delivery, email client behavior and Telegram discoverability must be checked manually on the deployed public domain. Static URL checks cannot establish that an external service responds.
- GA4, Meta Pixel and an optional form provider are **unconfigured** in `assets/config.js`; live event delivery, privacy compliance, provider spam protection and real inbox receipt are **not** tested. Test-only IDs were never written to the package.
- DNS records, certificate issuance, enforced HTTPS, apex/www redirect behavior, Search Console ownership verification and indexing **are not active just because configuration files exist**.
- Accessibility checks covered semantic markers, keyboard navigation behavior and some programmatic controls; they do not replace formal WCAG auditing or assistive-technology tests.
- `robots.txt` and `sitemap.xml` are valid deployment inputs, not a guarantee of search indexation or rank.

## Manual release gate

Before sharing the live URL, extract the ZIP to a repository root and verify each real service URL and `/privacy/`; confirm GitHub Pages custom-domain settings and DNS; enable **Enforce HTTPS**; test contact links and mail drafts on mobile; check Search Console ownership and the sitemap; confirm social preview rendering; only then, if needed, add your own genuine GA4/Meta/Formspree values with appropriate consent and disclosures. Run a real Lighthouse and keyboard/screen-reader review on the deployed pages.

**Final conclusion:** Files are complete and the demonstrated local checks pass. Deployment, privacy/legal requirements, network integration, external services, and field performance remain pending verification.
