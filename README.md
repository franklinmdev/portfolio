# Franklin Martinez - Portfolio

[![Deploy to GitHub Pages](https://github.com/franklinmdev/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/franklinmdev/portfolio/actions/workflows/deploy.yml)

A modern, high-performance portfolio website built with [Astro](https://astro.build/), [React](https://react.dev/), and [Tailwind CSS v4](https://tailwindcss.com/).

🌐 **Live Site:** [franklinmdev.me](https://franklinmdev.me)

## ✨ Features

- **⚡ Lightning Fast**: Built with Astro for optimal performance and minimal JavaScript
- **🎨 Modern Design**: Responsive dark theme with smooth animations and hover effects
- **🔧 Interactive Components**: React components for dynamic features (contact form, spotlight effect)
- **📱 Mobile First**: Perfect responsive design across all devices
- **♿ Accessible**: WCAG compliant with proper ARIA labels and semantic HTML
- **🌟 Visual Effects**: Interactive mouse spotlight and smooth scroll animations
- **📧 Contact Form**: Functional contact form with validation
- **🚀 Auto-Deploy**: Continuous deployment via GitHub Actions
- **📈 SEO Optimized**: Meta tags, structured data, and performance optimized
- **🛡️ Type Safety**: Strictest TypeScript configuration, no usage of `any`, and up-to-date Astro context types

## 🛠️ Tech Stack

- **Framework:** [Astro v5](https://astro.build/) with TypeScript (strictest mode)
- **Frontend:** [React 19](https://react.dev/) for interactive components
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom theme
- **Icons:** [Lucide React](https://lucide.dev/) for modern iconography
- **UI Components:** Custom components with [shadcn/ui](https://ui.shadcn.com/) setup
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
│   ├── avatar.png         # Profile avatar
│   ├── favicon.png        # Site favicon
│   ├── favicon-16x16.png  # PNG favicon (16x16)
│   ├── favicon-32x32.png  # PNG favicon (32x32)
│   ├── apple-touch-icon.png # iOS home screen icon
│   ├── android-chrome-192x192.png # Android icon
│   ├── android-chrome-512x512.png # Android icon
│   ├── site.webmanifest   # PWA manifest
│   └── CNAME              # Custom domain configuration
├── src/
│   ├── components/
│   │   ├── react/         # React interactive components
│   │   │   ├── ContactForm.tsx    # Contact form with validation
│   │   │   ├── Spotlight.tsx      # Mouse spotlight effect
│   │   │   └── UserAvatar.tsx     # User avatar component
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Experience.astro       # Work experience timeline
│   │   ├── Footer.astro           # Site footer
│   │   ├── Header.astro           # Navigation header
│   │   ├── Projects.astro         # Projects showcase
│   │   └── Technologies.astro     # Tech stack display
│   ├── content/           # Content collections (markdown, config)
│   │   ├── config.ts      # Zod schema for projects
│   │   └── projects/      # Project markdown files (en/es)
│   ├── i18n/              # Internationalization utilities and translations
│   │   ├── en.json        # English translations
│   │   ├── es.json        # Spanish translations
│   │   └── utils.ts       # Type-safe i18n helpers
│   ├── layouts/
│   │   └── Layout.astro   # Main site layout
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   ├── middleware/
│   │   └── index.ts       # Language detection and routing middleware (type-safe)
│   ├── pages/
│   │   ├── [locale]/      # Localized dynamic routes
│   │   ├── 404.astro      # Main 404 page
│   │   ├── index.astro    # Homepage
│   │   └── projects/      # Project detail pages
│   └── styles/
│       └── global.css     # Global styles and animations
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── astro.config.mjs       # Astro configuration
├── components.json        # shadcn/ui configuration
├── eslint.config.js       # ESLint configuration
├── tsconfig.json          # TypeScript configuration (strictest)
├── TASKS.md               # Development task tracking
└── LICENSE                # MIT License
```

## 🛡️ Type Safety & Code Comments

- **Strict TypeScript**: The entire codebase uses the strictest TypeScript settings. All context and helper functions are fully typed—no usage of `any` remains.
- **Astro Middleware**: Middleware and helpers use up-to-date Astro types (e.g., `MiddlewareHandler`), ensuring type safety for all context and cookies operations.
- **i18n Utilities**: All translation utilities are type-safe, with translation keys and language codes strictly typed.
- **Commenting Best Practices**: Only concise, essential comments are present. All unnecessary, verbose, or AI-generated comments have been removed. Comments are used only to clarify non-obvious logic or configuration.

## 🎨 Design System

### Color Palette

- **Background**: Deep slate (`#0f172a`) with noise texture overlay
- **Text**: High contrast whites and grays for excellent readability
- **Accents**: Blue gradient (`#3b82f6` → `#2563eb`) for CTAs and highlights
- **Interactive**: Violet hover states (`#7c3aed`) for enhanced UX

### Typography

- **Primary**: System font stack optimized for performance
- **Code**: Fira Code for syntax highlighting in IDE blocks

### Components

- **Hero Section**: Split layout with sticky sidebar on desktop
- **Experience Timeline**: Interactive timeline with hover effects
- **Technology Tags**: Animated badges with hover states
- **Project Cards**: Grid layout with smooth hover animations
- **Contact Form**: Validated form with success states

## 🚀 Deployment

### Automatic Deployment

This site automatically deploys to GitHub Pages when changes are pushed to the `main` branch using GitHub Actions.

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

- **Astro Islands**: React components are hydrated only when needed (`client:load`, `client:idle`)
- **CSS-in-CSS**: Tailwind utility classes with custom CSS for complex animations
- **Component Organization**: Clear separation between Astro (static) and React (interactive) components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits:

   ```bash
   git commit -m 'feat: ✨ add amazing feature'
   ```

4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) with gitmoji:

- `feat: ✨ new feature`
- `fix: 🐛 bug fix`
- `docs: 📝 documentation`
- `style: 💄 styling`
- `refactor: ♻️ code refactoring`
- `perf: ⚡️ performance improvement`
- `test: ✅ tests`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Portfolio**: [franklinmdev.me](https://franklinmdev.me)
- **GitHub**: [github.com/franklinmdev](https://github.com/franklinmdev)
- **LinkedIn**: [linkedin.com/in/franklin-martinez-0a697a253](https://www.linkedin.com/in/franklin-martinez-0a697a253/)
- **Email**: [franklinmdev@hotmail.com](mailto:franklinmdev@hotmail.com)

---

Built with ❤️ using [Astro](https://astro.build/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/) by Franklin Martinez
