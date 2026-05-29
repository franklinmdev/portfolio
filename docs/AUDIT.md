# Portfolio technical audit

- Date: 2026-05-29
- Scope: full technical audit (Astro, React, Tailwind v4, i18n, SEO,
  accessibility, dependencies, CI)
- Status: findings only. No source files were changed and nothing was
  pushed. Only `npm ci` + a build were run (both gitignored).

## Methodology

Every version-specific claim was verified three ways:

1. The `astro-framework` skill for Astro 5 patterns.
2. The `find-docs` skill (Context7 CLI) against official Astro,
   Tailwind, and shadcn documentation.
3. A real `npm ci` + `astro check` + `astro build`, then `grep` of the
   generated `dist/` CSS and HTML for proof.

Baseline at audit time: `astro check` reported 0 errors, 0 warnings,
0 hints across 38 files. `astro build` succeeded but emits a warning
about `Astro.request.headers` on a prerendered page (see C5).

Severity legend:

- Critical: ships broken to users, SEO, or security.
- High: will break on a near-term upgrade, or large dead styling.
- Medium: i18n rule violations, accessibility, fragile logic.
- Low: cleanup, dependency hygiene, documentation drift.

## Critical

### C1. hreflang is wrong on every Spanish page

- Where: `src/layouts/Layout.astro` (~lines 103-112).
- Evidence: built `dist/es/index.html` emits
  `hreflang="en"` to `https://franklinmdev.me/es/` and
  `hreflang="es"` to `https://franklinmdev.me/es/es/` (doubled, 404).
  Same on `dist/es/projects/devflow/index.html`. English pages are
  correct.
- Root cause: alternates are built from `Astro.url.pathname` without
  stripping the active locale. No `x-default` is emitted.
- Fix: strip the locale first (`removeLocalePrefix()` already exists in
  `src/i18n/utils.ts`), then build `en = site + cleanPath` and
  `es = site + "/es" + cleanPath`, and add an `x-default` alternate.

### C2. Spanish homepage og:image is a 404

- Where: `src/pages/es/index.astro` (~lines 9-12).
- Evidence: hardcodes `url: "https://franklinmdev.me/avatar.webp"`.
  That file does not exist in `public/` or `dist/` (the avatar is
  bundled to `/_astro/`). The English homepage uses `avatarImage.src`
  and is correct.
- Fix: import the asset and use its `.src`, mirroring
  `src/pages/index.astro`.

### C3. Security headers never reach the browser

- Where: `src/layouts/Layout.astro` (~lines 43-47).
- Evidence: sets `X-Frame-Options`, `X-Content-Type-Options`,
  `X-XSS-Protection`, `Referrer-Policy` via
  `Astro.response.headers.set()`.
- Root cause (Astro docs): serving headers on prerendered pages
  requires an adapter with `staticHeaders: true`. This is a static
  build with no adapter, so the headers are dropped. The site ships
  zero security headers.
- Fix (decision needed): either remove the dead code, or move hosting
  to a platform that honors headers (a `public/_headers` file already
  exists for Netlify/Cloudflare). GitHub Pages cannot serve them.

### C4. Cache-Control set in Layout is also dead

- Where: `src/layouts/Layout.astro` (~lines 29-41).
- Root cause: same as C3, and GitHub Pages forces `max-age=600`
  regardless (documented in `docs/performance.md`). `public/_headers`
  is a Netlify/Cloudflare convention that GitHub Pages ignores.
- Fix: fold into the C3 decision; remove the dead in-component header
  code.

### C5. The i18n auto-redirect middleware does nothing in production

- Where: `src/middleware/index.ts`.
- Evidence: `astro build` warns that `Astro.request.headers` is not
  available on a prerendered page. That is the middleware reading
  `Accept-Language` at build time.
- Root cause: on static hosting there is no server, so the
  cookie/`Accept-Language` detection never runs for real visitors. It
  also calls `Response.redirect(<relative path>, 307)`, which throws at
  runtime because the API requires an absolute URL.
- Fix (decision needed): remove it, or replace with a small
  client-side redirect. Do not present it as working server logic.

## High

### H1. Content collections use the legacy API that breaks in Astro v6

- Where: `src/content/config.ts` (`type: "content"`),
  `src/pages/projects/[slug].astro` (~line 13) and
  `src/pages/es/projects/[slug].astro` (~line 11) use
  `project.slug.slice(3)`.
- Root cause (Astro docs): `type: "content"` + `entry.slug` +
  path-based IDs are v4 backwards-compat. Astro v6 throws
  `ContentCollectionInvalidTypeError`, and v6 is already the latest
  release. `astro check` passes today only because v5 keeps the compat
  layer.
- Fix: migrate to the Content Layer API. Rename to
  `src/content.config.ts`, `import { glob } from "astro/loaders"`,
  remove `type`, add a `glob()` loader, and use `entry.id` (no
  extension) instead of `entry.slug`. Update the `getCollection`
  filters accordingly.

### H2. Inconsistent collection API usage

- Where: `src/components/Projects.astro` (~lines 17-25) uses
  `project.id.split("/")` plus a dead `.replace(/\.md$/, "")` (IDs have
  no extension), while the project pages use `project.slug`.
- Fix: unify on the H1 approach (`entry.id`).

### H3. shadcn theme was never installed, so its utilities emit no CSS

- Where: `src/styles/global.css` plus `src/components/ui/*.tsx`.
- Evidence: in built CSS, `--color-primary`, `--color-border`,
  `--color-ring`, `--color-input`, `--color-background`,
  `--color-destructive` are all undefined and `bg-primary` produces no
  rule.
- Root cause (shadcn + Tailwind v4 docs): the setup needs
  `@custom-variant dark (&:is(.dark *))` plus an `@theme inline` block
  mapping `--color-*` to `var(--*)` plus `:root`/`.dark` variable
  definitions. None are present, so `bg-primary`, `border-input`,
  `ring-ring`, `text-muted-foreground`, `bg-accent`, `bg-background`,
  `aria-invalid:border-destructive`, and every `dark:*` in
  button/input/textarea/label are dead.
- Visible impact: the NotFoundPage "projects" button
  (`src/components/NotFoundPage.astro` ~line 79) renders with no
  background; inputs only look styled via the `.form-input` override.
- Fix: add the shadcn v4 token scaffold to `global.css` (use the
  `shadcn` skill for the exact neutral scaffold), or strip the unused
  semantic classes from `ui/*.tsx`.

### H4. Tailwind v4 removed/renamed classes still in use

Verified dead in built CSS; confirmed against the Tailwind v4 upgrade
guide.

- `src/components/Header.astro` (~line 33): `bg-opacity-80` was removed
  in v4, so the header is fully opaque (intended 80% translucency is
  gone). Use `bg-[#111111]/80` and keep `backdrop-blur-sm`.
- `src/components/react/ProjectCard.tsx` (~line 90): `flex-shrink-0`
  was renamed to `shrink-0` (dead here; harmless only because
  `.icon-container` already applies `shrink-0`).
- `src/styles/global.css` (~line 11): `--font-family-mono` is the wrong
  namespace. v4 font utilities come from `--font-*`, so rename to
  `--font-mono`.

### H5. Hero heading responsive sizing is dead

- Where: `src/components/Hero.astro` (inline style plus a scoped
  `<style>` ~lines 47-60) and `src/styles/global.css` (~lines 342-347).
- Evidence: the scoped rule compiles to
  `.hero-headline[data-astro-cid-...]{font-size:2.25rem}`, whose
  specificity beats the responsive utilities `sm:text-5xl lg:text-6xl
  2xl:text-5xl`. The headline is locked at 2.25rem at every breakpoint.
- Root cause: size is declared in three places (scoped style,
  `@layer base`, utility classes) and `text-shadow` twice.
- Fix: keep one source of truth (the responsive utility classes on the
  element); remove the scoped font-size/subtitle rules, the duplicate
  `@layer base` `@apply`, and the duplicated inline `text-shadow`.

## Medium

### M1. es.json violates the Spanish sentence-case rule

- Where: `src/i18n/es.json`. Line ~28 "Experiencia Laboral", ~30
  "Proyectos Destacados", ~31 "Ponte En Contacto", ~53 "Aprendizajes
  Clave".
- Fix: lowercase the non-initial words ("Experiencia laboral",
  "Proyectos destacados", "Ponte en contacto", "Aprendizajes clave").
  Scan the rest of the file for other title-cased multiword values.

### M2. ContactForm picks its color by string matching

- Where: `src/components/react/ContactForm.tsx` (~line 159):
  `result.includes("error") || result.includes("Sorry")`.
- Root cause: English-coupled and fragile; Spanish only works because
  "error" is a cognate.
- Fix: track a `status` enum ("idle" | "success" | "error") set
  alongside the message, and drive the color from `status`.

### M3. Anchor with role="button"

- Where: `src/components/react/ProjectCard.tsx` (~lines 46-47): an
  `<a href>` has `role="button"` and `tabIndex={0}`.
- Fix: remove both (it is a link); keep the `aria-label`.

### M4. Form fields are not wired to their errors

- Where: `src/components/react/ContactForm.tsx`.
- Fix: add `aria-invalid={!!errors.x}` and `aria-describedby` to each
  input, pointing at the error `<p>` (give each error `<p>` an `id`).

### M5. Untranslated hardcoded English

- Where: ContactForm `sr-only` labels ("Name"/"Email"/"Message"), all
  `SocialLinks.astro` `aria-label`s, the `NotFoundPage` image `alt`.
- Fix: route through translations; add keys to both `en.json` and
  `es.json` with identical structure.

### M6. Smooth scroll ignores reduced motion

- Where: `src/styles/global.css` (`scroll-behavior: smooth`) plus a
  duplicate `scroll-smooth` class on `<html>` in `Layout.astro`.
- Fix: in the existing `prefers-reduced-motion` block add
  `html { scroll-behavior: auto }`, and drop one of the duplicate
  declarations.

## Low

### L1. ESLint Astro rules never run

- Where: `eslint.config.js` (~line 84): `files: ["*.astro"]` matches
  only repo-root files, so `astro/*` rules skip `src/**`.
- Fix: change to `["**/*.astro"]`, then `npm run lint` and fix anything
  it surfaces.

### L2. Dead dependencies

- `framer-motion` and `@radix-ui/react-avatar` are imported nowhere in
  `src/` (verified). Remove both.

### L3. Vulnerabilities and outdated dependencies

- `npm audit` reports 24 vulns (12 high), all in the build toolchain
  (vite, rollup, esbuild, postcss, tar, yaml, minimatch, picomatch).
  None ship to a static-site visitor. Run `npm audit fix`.
- Outdated across the board. See the "Dependency modernization"
  section for the full tiered plan (the repo should end fully current,
  including majors).

### L4. Redundant transitions type shim

- Where: `src/types/astro-transitions.d.ts` redeclares
  `astro:transitions`, which Astro 5 already types. Delete it and
  confirm `astro check` stays at 0 errors.

### L5. Dead schema field and a latent set:html bug

- Where: `src/content/config.ts` declares both `icon` and `iconAsset`
  as `image()`; content only sets `iconAsset`.
  `src/components/ProjectHeader.astro` (~lines 44-48) does
  `set:html={project.data.icon}`, treating an image object as raw HTML.
- Fix: drop the `icon` field and that branch.

### L6. Dead font preconnects

- Where: `src/layouts/Layout.astro` (~lines 62-63) preconnects
  `fonts.googleapis.com`/`fonts.gstatic.com`, but fonts are self-hosted
  via `@fontsource` (bundled). Remove the hints.

### L7. Invalid anchor rel

- Where: `src/components/ProjectSidebar.astro` (~lines 28, 37):
  `rel="noopener noreferrer prefetch"`. `prefetch` is not a valid
  anchor `rel` token. Remove it.

### L8. README design section is stale

- Where: `README.md`. Claims `#0f172a` slate background, blue accents,
  and system fonts; the real site is `#111111`, violet, Inter. It
  references a non-existent `TODO.md` and an unused `client:load`.
- Fix: correct it, then run `npx markdownlint README.md`.

### L9. Personal phone number in JSON-LD

- Where: `src/layouts/Layout.astro` (~line 177) exposes a personal
  phone number on every page. Confirm whether this is intentional.

### L10. IntersectionObserver leak across client navigations

- Where: `src/components/Header.astro`. A new `IntersectionObserver` is
  created on every `astro:after-swap` without disconnecting the prior
  one.
- Fix: `observer.disconnect()` on `astro:before-swap`.

### L11. Inconsistent Twitter meta attributes

- Where: `src/layouts/Layout.astro`. `twitter:card`, `twitter:creator`,
  `twitter:image` use `property=`, while other twitter tags use
  `name=`. Normalize to `name=`.

### L12. Manifest theme mismatch

- Where: `public/site.webmanifest`. `theme_color` `#8b5cf6` differs
  from the meta `theme-color` (`#111111`/`#ffffff`); `lang` is only
  `"en"`. Align them.

### L13. security.checkOrigin has no effect on static output

- Where: `astro.config.mjs` (~line 73). `security: { checkOrigin: true
  }` only applies to on-demand pages. Remove it, or comment why it is
  kept.

## SEO

Re-verify with the `seo-audit` skill.

### S1. No robots.txt

- Not generated anywhere. Add `public/robots.txt` with
  `User-agent: *`, `Allow: /`, and
  `Sitemap: https://franklinmdev.me/sitemap-index.xml`.

### S2. The 404 page is in the sitemap

- `dist/sitemap-0.xml` lists `https://franklinmdev.me/es/404/`. Add a
  filter in `astro.config.mjs`:
  `sitemap({ filter: (page) => !page.includes("/404") })`.

### S3. Sitemap carries no hreflang alternates

- The `xhtml:` namespace is declared but no `xhtml:link` entries exist
  (`@astrojs/sitemap` has no i18n config). Configure
  `sitemap({ i18n: { defaultLocale: "en", locales: { en: "en", es:
  "es" } } })` (verify the option shape via `find-docs`).

### S4. Spanish project descriptions are not truncated

- `src/pages/es/projects/[slug].astro` lacks the `<= 160` char
  truncation that `src/pages/projects/[slug].astro` (~line 32) has.
  Long descriptions get cut in search results.

## Dependency modernization

Goal: bring the repo fully up to date, including major versions. None of
the current vulns ship to visitors (all build-time), so this is about
currency and clearing `npm audit`, not an emergency. Work in tiers, run
`npm run check && npm run build` after each step, and commit each major
separately so a regression can be reverted in isolation. Re-run
`npm outdated` first since versions move.

### Tier 1 — safe now (within current majors)

Patches/minors; also clears most audit vulns (vite/rollup/esbuild ride
along with the Astro/Tailwind bumps).

- astro 5.11 -> 5.18+ (newest v5, NOT 6)
- tailwindcss + @tailwindcss/vite 4.1 -> 4.3
- react + react-dom 19.1 -> 19.2; @types/react* -> 19.2
- @astrojs/sitemap 3.4 -> 3.7 (also needed for S3)
- @astrojs/check, @radix-ui/react-{label,slot}, tailwind-merge,
  @fontsource/*

Runtime deps use `^` ranges, so `npm update` moves them. Several devDeps
are pinned exactly (eslint, typescript-eslint, eslint-plugin-astro,
prettier, prettier-plugin-*) and must be bumped by editing package.json:
prettier 3.8, eslint-config-prettier 10.1.8, eslint-plugin-astro 1.7,
@typescript-eslint/* + typescript-eslint 8.60. Then run `npm audit fix`.

### Tier 2 — remove, do not update

framer-motion and @radix-ui/react-avatar are unused (see L2). Uninstall
rather than bump.

### Tier 3 — majors, one at a time, after the C/H/S fixes

Read each upgrade guide via find-docs before applying. Order matters:

- astro 5 -> 6 AND @astrojs/react 4 -> 5: do these only AFTER H1 (the
  content-layer migration). Astro 6 removes `type:'content'`; bumping
  first breaks the build. These two move together.
- typescript 5 -> 6: expect new strict errors; gate on astro check.
- eslint 9 -> 10 AND eslint-plugin-react-hooks 5 -> 7: confirm the
  astro and react ESLint plugins support v10 before jumping.
- @lucide/astro + lucide-react 0.525 -> 1.x: 1.0 is a major; confirm
  icon imports still resolve (both packages are used).

Done when `npm outdated` is empty (or only intentionally held), `npm
audit` is clean, and `npm run check && npm run build` is green.

## Confirmed good (do not change)

- Canonicals are correct and self-referencing on every page.
- Exactly one `<h1>` per page across all four page types.
- The `client:visible` projects grid is server-rendered, so its links
  are crawlable without JavaScript.
- Trailing slashes are consistent; the sitemap and index generate.
- Hydration choices (`client:idle`, `client:visible`) are appropriate.
- `prefers-reduced-motion` is handled for animations.
- Strict TypeScript with `noUncheckedIndexedAccess` is clean.
- i18n key parity across `en.json` and `es.json` holds.
- Images use WebP/AVIF with appropriate lazy/eager loading.

## Suggested order

1. Dependency Tier 1 + Tier 2 (safe bumps, remove dead deps) — clears
   most audit noise before touching code.
2. Critical SEO/security that ships wrong: C1, C2, C3.
3. Content Layer migration (H1) to unblock the Astro v6 upgrade.
4. shadcn theme and Tailwind v4 dead classes: H3, H4, H5.
5. SEO config: S1, S3, S2, S4.
6. Sweep the remaining Medium and Low items.
7. Dependency Tier 3 (majors, one at a time) — Astro 6 only after H1.
   See "Dependency modernization".
