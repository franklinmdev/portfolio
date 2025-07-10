# 🛠️ Fix-it Checklist

## 🚨 Highest Priority — Not Found (404) Page

- [x] **Translations locked to English**
  - ✅ Created reusable NotFoundPage component that accepts language prop
  - ✅ Updated 404.astro to use standard `getLangFromUrl(Astro.url)` pattern (same as project pages)
  - ✅ Follows exact same pattern as src/pages/projects/[slug].astro
  - ✅ Single 404 page handles both languages using existing project utilities
  - **Testing:**
    - Visit `/some-non-existent-page` (should show English)
    - Visit `/es/some-non-existent-page` (should show Spanish)
    - Language switcher should work correctly in both cases

- [ ] **Mobile First-Render Layout Glitch**
  - **Problem:** Large top space appears on initial render, then corrects itself after a touch.
  - **Debug Plan:**
    - Use DevTools to determine if `margin-top` or `height` is the culprit.
    - Inspect CSS for `safe-area-inset-top` and related Tailwind utilities.
    - Test on iOS Safari & Android Chrome to isolate the issue.
