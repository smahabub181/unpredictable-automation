# Unpredictable Automation — GitHub Pages production candidate

**Brand:** Unpredictable Automation  
**Founder:** Mahbub Hasan Shamim  
**Intended canonical domain:** https://shamim98.com/  
**Status:** Prepared for live deployment and final verification; **not deployed by this package**.

This is an enhancement of the supplied `Unpredictable_Automation_Final(1).html`, not a replacement design. The homepage keeps its orbital artwork, dark/lime/purple/peach palette, motion graphics and verified portfolio distinctions. The homepage HTML embeds its design CSS and interaction JS; the optional analytics/form config is in `assets/` and is not needed for basic rendering.

## Deploy the files

1. Extract this archive on your computer. Its `index.html` and `CNAME` are already at the ZIP root. Upload the **extracted files and folders** to the root of your chosen GitHub repository — `index.html` must be at repository root, not nested one level below.
2. Create a **public** GitHub repository, for example `unpredictable-automation-site`. The repository name does not determine your custom domain.
3. Commit `index.html`, the four service folders, `privacy/`, `assets/`, `og-unpredictable-automation.png`, `robots.txt`, `sitemap.xml`, `CNAME`, `.nojekyll` and `404.html`.
4. In **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, then **main** and **/(root)**. Save.
5. In **Settings → Pages → Custom domain**, set `shamim98.com`. The included `CNAME` also records the intended custom domain; avoid competing CNAME values across branches.
6. At your domain registrar/DNS host, review and remove **conflicting** apex A/AAAA records before adding the GitHub Pages targets. Do not remove MX/TXT records for existing email services.

   | Type | Host | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA (optional) | `@` | `2606:50c0:8000::153` |
   | AAAA (optional) | `@` | `2606:50c0:8001::153` |
   | AAAA (optional) | `@` | `2606:50c0:8002::153` |
   | AAAA (optional) | `@` | `2606:50c0:8003::153` |
   | CNAME (recommended for www) | `www` | `YOUR_USERNAME.github.io` |

   Replace `YOUR_USERNAME` with the GitHub Pages account name. Do not use `shamim98.com` as the destination of the `www` CNAME. Using the apex as the configured custom domain and correctly setting up both apex and `www` can provide redirect behavior, as documented by GitHub. If your DNS provider offers ALIAS/ANAME or proxying, follow GitHub's corresponding guidance rather than blindly mixing record types.

7. Back in **Settings → Pages**, wait for GitHub's DNS check/certificate status and enable **Enforce HTTPS** when available. Do not assume the site is secure or indexed until it is publicly reachable at `https://shamim98.com/`.
8. Visit the root URL and each four canonical service-page URLs. Verify live images, fonts, links, mobile menu, visual effects, form behavior, privacy notice, HTTPS and no mixed content.

**Official deployment references:**
- [Managing a custom domain — GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Securing a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

## Google Search Console

1. Open https://search.google.com/search-console/ and add a **Domain property** for `shamim98.com`.
2. Google gives a real DNS TXT verification token. Add the exact TXT record to your domain DNS; do not substitute invented values. Keep any existing domain/email TXT records that are still needed.
3. When ownership is verified, submit `https://shamim98.com/sitemap.xml` under **Sitemaps**.
4. Use **URL Inspection** on the homepage and four service pages after they are actually live. Inspect real crawl/indexing states; a sitemap is a hint, not an indexing guarantee.
5. Review queries, pages, indexing, mobile usability and Core Web Vitals over time. Do not make rankings claims before you have observed data.

## Bing Webmaster Tools

1. Visit https://www.bing.com/webmasters/.
2. Import the verified property from Google Search Console (where supported), or use Bing's provided verification method such as a DNS TXT or uploaded verification file.
3. Add the same sitemap and periodically review index coverage and search terms.

## GA4 — optional, off by default

1. Create a GA4 property and web data stream for `https://shamim98.com/` at https://analytics.google.com/.
2. Copy the **actual** Measurement ID (begins with `G-`).
3. Edit **one file**, `assets/config.js`, and set `ga4MeasurementId: 'YOUR_ACTUAL_ID'` with the real value. Leave it empty to disable.
4. The included opt-in banner can allow Analytics or Marketing independently. **No Google tag is injected before affirmative Analytics consent.** It uses a basic consent-gated Google tag approach, with Consent Mode v2 settings when the tag is loaded.
5. Test with GA4 **Realtime** and **DebugView** on the live domain, using a session in which you agreed to analytics. Verify events and ensure you didn't also install another GA4 tag via Tag Manager or another plugin.
6. Potential custom events: `start_project_click`, `portfolio_view`, `portfolio_filter`, `contact_whatsapp_click`, `contact_email_click`, `generate_lead` (ONLY if a configured online form provider responds successfully). An email draft being opened is **not** counted as a completed lead submission.

No GA4 ID is configured in the delivered files. Do not put a service-account key, credential, or private API secret in `assets/config.js`.

## Optional Meta Business / Pixel — off by default

1. In the Meta Business tools for your authorized business, add your domain and follow Meta's verification method. A DNS TXT verification record is often the simplest for GitHub Pages; **use the exact value Meta supplies**.
2. Create/select a real Meta Pixel in Events Manager. Copy the actual numeric Pixel ID to `metaPixelId` in `assets/config.js`.
3. When a visitor explicitly accepts **Marketing** consent, the optional Meta script can be inserted and a PageView recorded. A `ContactClick` custom event identifies a contact-button click, **not** a verified customer lead or sale.
4. Test using Meta's events tools after deployment. Do not run duplicate Pixels via multiple code snippets. Do not enable marketing measurement in regions where your consent approach has not been reviewed for applicable requirements.
5. Connect actual verified Facebook/Instagram business profiles later. No invented profile addresses are included in this site.

**Important privacy caveat:** The included basic opt-in UI is a conservative technical starting point, not legal advice or a certification of full GDPR/ePrivacy/UK/US/Canada/Australia regulatory compliance. Before advertising campaigns, review data retention, transfers, consent policy, cookies, provider agreements and the published privacy notice with appropriate expertise.

## Contact form and inquiry handling

- **Default:** the contact form only composes a `mailto:` message. Your visitor must send it through their email application. No inbox, database or web-submission backend is provided by GitHub Pages.
- WhatsApp uses the supplied `+8801515635955` link. Email uses `shamim.mahbub.hasan@gmail.com`. No Telegram username is confirmed, so the website qualifies Telegram instead of inventing a destination.
- **Optional:** if you create and verify a Formspree form, place its real endpoint in `assets/config.js` as `formspreeEndpoint: 'https://formspree.io/f/REAL_ID'`. This switches the form UI to online-submission mode, requires a reply email, validates inputs, includes a honeypot and rate-friction check, and shows an actual success message **only when the configured provider returns a successful response**.
- Before enabling a form provider, update the privacy notice for the provider, retention, data access, privacy rights, and data-transfer details, and test the provider's spam controls/domain restrictions. Client-side spam checks alone do not make a system abuse-proof.
- Keep API keys and all private secrets in the server/provider's secret store. Never add them to a public GitHub repository.

## Technical constraints

- GitHub Pages supports **static** HTML/CSS/JS. It does not run PHP, Laravel, WordPress backends, n8n workflows, or database services. Those systems require separate hosting even when they link from your portfolio.
- CSS and JavaScript in the main page remain embedded as requested; optional config, consent and analytics code are in `assets/`. Service pages share `assets/service.css` for efficient caching.
- The supplied Google Fonts links are retained to preserve typography. A fallback font stack is defined, and the site remains usable when the font CDN is unavailable.
- Motion respects reduced-motion preferences; the homepage loader should not block access when JavaScript fails. On narrow screens, the fixed contact dock is disabled so it cannot cover primary actions.
- The Open Graph file is a real rendered image from this website's existing design and must be uploaded alongside `index.html`. It is not an image of completed client projects.

## Before you share the link

- [ ] Confirm the domain and repository are under your control; only you can perform the DNS/GitHub configuration.
- [ ] Review all copy, research attributions, Double Generation status and LMS progress for continuing accuracy.
- [ ] Verify contact email/WhatsApp and Telegram discoverability in actual browsers/devices.
- [ ] Validate Open Graph image at the deployed URL and in platform preview tools.
- [ ] Submit sitemap only after HTTPS and canonical URLs work.
- [ ] Leave GA4/Meta IDs blank unless you own and verify the measurement properties and have reviewed consent.
- [ ] Test Forms provider only after setting up and verifying the real endpoint and updating the privacy notice.
- [ ] Run actual PageSpeed Insights / Lighthouse, axe accessibility checks, cross-browser checks and a manual screen-reader review on the deployed site.
- [ ] Check the entire site for real client reviews or performance claims before publishing. None were intentionally invented in this package.

See `SEO_KEYWORD_STRATEGY.md`, `90_DAY_MARKETING_PLAN.md` and `QA_REPORT.md` for focused next steps.

## Independent audit packaging note (19 November 2026)

This archive was audited and repackaged on 19 November 2026. The consent interface was restored to the service and privacy pages, so those pages now support the footer Cookie preferences control. See the updated `QA_REPORT.md` for precisely what was checked, and what still requires a live-domain test. The contents are at archive root. No credentials are included.
