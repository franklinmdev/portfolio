# Performance Reference

> 📄 This document tracks known hosting/performance constraints and the decisions I've taken to work around them.

## Current constraint: short TTL on GitHub Pages assets

| Header        | Value                 |
| ------------- | --------------------- |
| Cache-Control | `public, max-age=600` |

GitHub Pages' CDN always returns the header above and offers **no override mechanism** (for example, `_headers`, `.htaccess`, or GitHub Actions). See [Back Alley Coder – S(GH)PA](http://www.backalleycoder.com/2016/05/13/sghpa-the-single-page-app-hack-for-github-pages/) for background on other Pages quirks.

### Impact

- Repeat-visit performance is OK (files are fingerprinted), but the first revisit after 10 minutes triggers a revalidation round trip.
- Flagged by Lighthouse as "Static assets with an inefficient cache policy."

### Future options

1. **Accept the 10-minute TTL** (status quo).  
   Pros: zero work.  
   Cons: keeps Lighthouse warning.
2. **Front Pages with a CDN/reverse proxy** (for example, Cloudflare Free, Bunny, or Fastly) and inject `max-age=31536000, immutable` for `/assets/*`, fonts, and images.
3. **Move hosting** to Netlify, Cloudflare Pages, or Vercel — all of these respect `public/_headers` (already present in the repo).

## Static Files with Inadequate Cache Settings

25 static files have insufficient cache headers (currently cached for only ~10 minutes). Proper cache settings instruct browsers and intermediaries to store and reuse these resources, reducing page weight and latency.

List of affected files:

1. <https://franklinmdev.me/assets/avatar-D_f-EGS3.webp>
2. <https://franklinmdev.me/assets/inter-latin-800-normal-BYj_oED-.woff2>
3. <https://franklinmdev.me/assets/inter-latin-700-normal-Drs_5D37.woff2>
4. <https://franklinmdev.me/assets/fira-code-latin-400-normal-6WyMkEaV.woff2>
5. <https://franklinmdev.me/assets/js/router-DnZMHVsn.js>
6. <https://franklinmdev.me/assets/js/index-U3IA9L3b.js>
7. <https://franklinmdev.me/assets/js/ProjectsSection-O015NS3v.js>
8. <https://franklinmdev.me/assets/js/client-BdsM16pm.js>
9. <https://franklinmdev.me/assets/js/Spotlight-BTahpSJB.js>
10. <https://franklinmdev.me/assets/js/ScrollToTop-QNddEUb6.js>
11. <https://franklinmdev.me/assets/js/jsx-runtime-D_zvdyIk.js>
12. <https://franklinmdev.me/assets/js/ClientRouter.astro_astro_type_script_index_0_lang-DIaODN1G.js>
13. <https://franklinmdev.me/assets/js/index-BVOCwoKb.js>
14. <https://franklinmdev.me/favicon-32x32.png>
15. <https://franklinmdev.me/assets/js/index-BE2Az1ED.js>
16. <https://franklinmdev.me/assets/js/createLucideIcon-kJjEjTi1.js>
17. <https://franklinmdev.me/site.webmanifest>
18. <https://franklinmdev.me/apple-touch-icon.png>
19. <https://franklinmdev.me/assets/js/page-TwRgyDAX.js>
20. <https://franklinmdev.me/assets/avatar-D_f-EGS3_ZI9Law.webp>
21. <https://franklinmdev.me/assets/inter-latin-500-normal-Cerq10X2.woff2>
22. <https://franklinmdev.me/assets/inter-latin-600-normal-LgqL8muc.woff2>
23. <https://franklinmdev.me/assets/inter-latin-400-normal-C38fXH4l.woff2>
24. <https://franklinmdev.me/assets/js/Header.astro_astro_type_script_index_0_lang-CYmHLB3c.js>
25. <https://franklinmdev.me/assets/img/devflow-logo-XWy35P2Z_2jfU7N.svg>

### Last updated

2025-07-07
