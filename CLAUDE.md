# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working
with code in this repository.

## Commands

```bash
npm run dev          # Dev server (astro dev)
npm run build        # astro check (typecheck) + astro build → dist/
npm run build:prod   # Same, production mode
npm run preview      # Serve the production build locally
npm run lint         # eslint .
npm run format:fix   # prettier --write + eslint --fix (use this to clean up)
npm run check        # prettier --check + eslint  (CI-style gate, no fix)
```

There is **no test runner**. `astro check` (bundled into `npm run build`) is
the type gate — treat a clean `npm run build` as the pass condition for any
change. Verify work with `npm run check && npm run build`.

## Architecture

Astro 5 static site (output to `dist/`, deployed to GitHub Pages) using
**React 19 islands** for interactivity and **Tailwind v4** for styling. Path
alias `@/*` → `src/*`.

### Astro vs React boundary

- `.astro` components are static/server-rendered (`src/components/*.astro`).
  They receive either `lang` or a translation function `t` as props.
- `src/components/react/*.tsx` are interactive islands, hydrated explicitly:
  `Spotlight` and `ScrollToTop` use `client:idle`, `ContactForm` uses
  `client:visible`. Match this — never hydrate eagerly without reason.
- `src/components/ui/*` are shadcn/ui primitives (new-york style, neutral
  base, CSS variables — see `components.json`).

### Layout owns the document head

`src/layouts/Layout.astro` is the single layout. It owns **all** SEO/OG/Twitter
meta, JSON-LD structured data, response headers (cache + security), and
`<ClientRouter>` (view transitions). It also mounts `Spotlight`, `Header`, the
page `<slot/>`, and `Footer`. Page-level `.astro` files just pass
`title`/`description`/`image` props to it. Put document-level concerns here,
not in pages.

### i18n (en default, es prefixed)

- Configured in `astro.config.mjs`: locales `["en","es"]`,
  `prefixDefaultLocale: false` → English lives at `/`, Spanish at `/es/...`.
- Translations are JSON: `src/i18n/{en,es}.json`. Access via
  `createTranslations(lang)` → `t("dot.path.key")`. Lookup falls back to en,
  then returns the key itself if missing. `getLangFromUrl(url)` derives the
  active language from the pathname.
- `src/middleware/index.ts` redirects the bare `/` based on the `language`
  cookie / `Accept-Language`; it deliberately does nothing once a locale
  segment is present.
- **When adding a UI string, add the key to BOTH `en.json` and `es.json`.**
  Keep the nested key structure identical across both files.

### Content collections (projects)

- Schema: `src/content/config.ts` (`projects` collection, Zod-validated
  frontmatter).
- Markdown lives in `src/content/projects/{en,es}/<slug>.md`. **A project's
  two language versions share the same `<slug>` filename** across the `en/`
  and `es/` dirs.
- Routes `src/pages/projects/[slug].astro` and
  `src/pages/es/projects/[slug].astro` filter the collection by
  `id.startsWith("en/")` / `"es/"` and strip the 3-char prefix
  (`slug.slice(3)`) to build params.
- **Adding a project = create both `en/<slug>.md` and `es/<slug>.md`** with
  matching slugs, plus referenced assets under `src/assets/projects/`.

### Styling (Tailwind v4, no config file)

Tailwind v4 is wired through the Vite plugin (`@tailwindcss/vite`). **There is
no `tailwind.config.js`** — theme tokens (colors, mono font, animation
keyframes) live in the `@theme` block of `src/styles/global.css`. Add design
tokens there. Merge classes with `cn()` from `src/lib/utils.ts`.

### Contact form / email

`ContactForm.tsx` sends via EmailJS in the browser. Config comes from
`PUBLIC_EMAILJS_{SERVICE_ID,TEMPLATE_ID,PUBLIC_KEY}` env vars
(`src/lib/email.ts`, guarded by `isEmailJSConfigured()`). Copy `.env-example`
→ `.env` for local dev. In CI these are injected from GitHub secrets
(`.github/workflows/deploy.yml`).

## Conventions & gotchas

- **TypeScript is `astro/tsconfigs/strictest` + `noUncheckedIndexedAccess`.**
  Array/index access yields `T | undefined` — guard or default it (you'll see
  this pattern throughout, e.g. `?? ""`). No `any`.
- **Prettier**: no semicolons, double quotes, 2-space indent, 80 col, es5
  trailing commas. Astro + Tailwind class-sorting plugins are active. Run
  `npm run format:fix` before considering work done.
- **Spanish UI text uses sentence-case**, never English title-case (e.g. "Ver
  proyectos", not "Ver Proyectos"). Only capitalize the first word, proper
  nouns, and acronyms. Applies to all `es.json` strings.
- After editing any markdown file, run `npx markdownlint <file>` and fix all
  warnings.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml` → builds and
publishes to GitHub Pages at the `franklinmdev.me` custom domain
(`public/CNAME`). Known hosting constraints (GitHub Pages short asset TTL) are
documented in `docs/performance.md`.
