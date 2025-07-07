# Site Performance Feedback

## 1. Unused Preloaded Resource

One resource is being preloaded but is not used during the initial page load. Preloaded resources are fetched at a high priority, which can delay the arrival of more critical resources. If the resource is never actually used, it should be removed from the preload list to avoid slowing down the initial load.

- **/assets/avatar-D_f-EGS3.webp**

_Recommended action_: Remove the `<link rel="preload" ...>` tag for this asset (or ensure the asset is actually used during initial rendering).

---

## 2. Static Files with Inadequate Cache Settings

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

_Recommended action_: Configure longer cache lifetimes (e.g., 1 year) for these static assets via appropriate `Cache-Control` headers (e.g., `public, max-age=31536000, immutable`). This will allow browsers to reuse previously downloaded resources, improving repeat-visit performance.

---

_Generated on:_ <!-- NOTE: You can update this date when addressing the feedback -->
