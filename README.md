# Franklin Martinez - Portfolio

[![Deploy to GitHub Pages](https://github.com/franklinmdev/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/franklinmdev/portfolio/actions/workflows/deploy.yml)

A modern, high-performance portfolio website built with
[Astro](https://astro.build/), [React](https://react.dev/), and
[Tailwind CSS v4](https://tailwindcss.com/).

🌐 **Live Site:** [franklinmdev.me](https://franklinmdev.me)

## ✨ Features

- **⚡ Lightning Fast**: Built with Astro for optimal performance and minimal JavaScript
- **🎨 Modern Design**: Responsive dark theme with smooth animations and hover effects
- **🔧 Interactive Components**: React components for dynamic features
  (contact form, spotlight effect)
- **📱 Mobile First**: Perfect responsive design across all devices
- **♿ Accessible**: WCAG compliant with proper ARIA labels and semantic HTML
- **🌟 Visual Effects**: Interactive mouse spotlight and smooth scroll animations
- **📧 Contact Form**: Functional contact form with validation
- **🚀 Auto-Deploy**: Continuous deployment via GitHub Actions
- **📈 SEO Optimized**: Meta tags, structured data, and performance optimized
- **🛡️ Type Safety**: Strictest TypeScript configuration, no usage of
  `any`, and up-to-date Astro context types

## 🛠️ Tech Stack

- **Framework:** [Astro v5](https://astro.build/) with TypeScript (strictest mode)
- **Frontend:** [React 19](https://react.dev/) for interactive components
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom theme
- **Icons:** [Lucide React](https://lucide.dev/) for modern iconography
- **UI Components:** Custom components with
  [shadcn/ui](https://ui.shadcn.com/) setup
- **Code Quality:** ESLint + Prettier with Astro and TypeScript support
- **Deployment:** GitHub Pages with custom domain
- **CI/CD:** GitHub Actions for automated deployment

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/franklinmdev/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Code quality commands**

   ```bash
   npm run lint          # Check for linting issues
   npm run format        # Format code with Prettier
   npm run check         # Run both linting and formatting checks
   npm run format:fix    # Auto-fix formatting and linting issues
   ```

5. **Build for production**

   ```bash
   npm run build
   npm run preview       # Preview production build locally
   ```

## 📁 Project Structure

```text
portfolio/
├── public/
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── CNAME
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── favicon.png
│   └── site.webmanifest
├── src/
│   ├── assets/
│   │   ├── avatar.webp            # Profile avatar
│   │   └── projects/              # Project-specific assets
│   ├── components/
│   │   ├── react/                 # React interactive components
│   │   │   ├── ContactForm.tsx    # Contact form with validation
│   │   │   ├── ProjectCard.tsx    # Project card component
│   │   │   ├── ProjectsSection.tsx# Grid of project cards
│   │   │   └── Spotlight.tsx      # Mouse spotlight effect
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── Experience.astro       # Work experience timeline
│   │   ├── Footer.astro           # Site footer
│   │   ├── Header.astro           # Navigation header
│   │   ├── HomePage.astro         # Home page content
│   │   ├── NotFoundPage.astro     # 404 error page content (used by both languages)
│   │   ├── Projects.astro         # Projects showcase
│   │   ├── ProjectPage.astro      # Project detail wrapper
│   │   ├── ProjectHeader.astro    # Project header
│   │   ├── ProjectBody.astro      # Project body
│   │   ├── ProjectNav.astro       # Project navigation
│   │   ├── ProjectSidebar.astro   # Project sidebar
│   │   ├── SocialLinks.astro      # Social links
│   │   ├── IDEBlock.astro         # IDE code block
│   │   └── Technologies.astro     # Tech stack display
│   ├── content/
│   │   └── projects/              # Project markdown files (en/es)
│   ├── content.config.ts          # Content collection schema (glob loader)
│   ├── i18n/                      # Internationalization utilities and translations
│   │   ├── en.json                # English translations
│   │   ├── es.json                # Spanish translations
│   │   └── utils.ts               # Type-safe i18n helpers
│   ├── layouts/
│   │   └── Layout.astro           # Main site layout
│   ├── lib/
│   │   ├── email.ts               # EmailJS sending logic
│   │   └── utils.ts               # Utility functions
│   ├── pages/
│   │   ├── 404.astro              # Main 404 page (English, used for /404)
│   │   ├── es/
│   │   │   ├── 404.astro          # Spanish 404 page (used for /es/404)
│   │   │   ├── index.astro        # Spanish homepage
│   │   │   └── projects/
│   │   │       └── [slug].astro   # Project detail pages (Spanish)
│   │   ├── index.astro            # Homepage (English)
│   │   └── projects/
│   │       └── [slug].astro       # Project detail pages (English)
│   └── styles/
│       └── global.css             # Global styles and animations
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions deployment
├── astro.config.mjs               # Astro configuration
├── components.json                # shadcn/ui configuration
├── eslint.config.js               # ESLint configuration
├── tsconfig.json                  # TypeScript configuration (strictest)
└── LICENSE                        # MIT License
```

## 🛡️ Type Safety & Code Comments

- **Strict TypeScript**: The entire codebase uses the strictest
  TypeScript settings. All context and helper functions are fully
  typed—no usage of `any` remains.
- **i18n Utilities**: All translation utilities are type-safe, with
  translation keys and language codes strictly typed.
- **Commenting Best Practices**: Only concise, essential comments are
  present. All unnecessary, verbose, or AI-generated comments have been
  removed. Comments are used only to clarify non-obvious logic or
  configuration.

## 🎨 Design System

### Color Palette

- **Background**: Near-black (`#111111`) with a subtle noise texture overlay
- **Text**: High contrast whites and grays for excellent readability
- **Accents**: Violet (`#7c3aed` / `#a78bfa`) for CTAs and highlights
- **Interactive**: Violet hover states (`#7c3aed`) for enhanced UX

### Typography

- **Primary**: Inter, self-hosted via `@fontsource` for performance
- **Code**: Fira Code for syntax highlighting in IDE blocks

### Components

- **Hero Section**: Split layout with sticky sidebar on desktop
- **Experience Timeline**: Interactive timeline with hover effects
- **Technology Tags**: Animated badges with hover states
- **Project Cards**: Grid layout with smooth hover animations
- **Contact Form**: Validated form with success states

## 🚀 Deployment

### Automatic Deployment

This site automatically deploys to GitHub Pages when changes are pushed
to the `main` branch using GitHub Actions.

### Custom Domain Setup

1. **Domain Configuration**: The `CNAME` file contains `franklinmdev.me`
2. **DNS Setup**: Configure your domain's DNS:
   - **A Records** pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **Or CNAME** pointing to `franklinmdev.github.io`

### Performance Metrics

- **Lighthouse Score**: Targeting 100/100 across all categories
- **Bundle Size**: Minimal JavaScript (~50KB total)
- **Core Web Vitals**: Optimized for excellent user experience

## 🔧 Development

### Code Quality

- **ESLint**: Configured with TypeScript, React, and Astro rules
- **Prettier**: Automatic code formatting with Astro and Tailwind plugins
- **TypeScript**: Strictest configuration for maximum type safety

### Architecture Decisions

- **Astro Islands**: React components are hydrated only when needed
  (`client:idle`, `client:visible`)
- **CSS-in-CSS**: Tailwind utility classes with custom CSS for complex
  animations
- **Component Organization**: Clear separation between Astro (static)
  and React (interactive) components

## 📝 License

This project is licensed under the MIT License - see the
[LICENSE](LICENSE) file for details.

## 🔗 Links

- **Portfolio**: [franklinmdev.me](https://franklinmdev.me)
- **GitHub**: [github.com/franklinmdev](https://github.com/franklinmdev)
- **LinkedIn**: [linkedin.com/in/franklin-martinez-0a697a253](https://www.linkedin.com/in/franklin-martinez-0a697a253/)
- **Email**: [franklinmdev@hotmail.com](mailto:franklinmdev@hotmail.com)

---

Built with ❤️ using [Astro](https://astro.build/),
[React](https://react.dev/), and
[Tailwind CSS](https://tailwindcss.com/) by Franklin Martinez
