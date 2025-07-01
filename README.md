# Franklin Martinez - Portfolio

[![Deploy to GitHub Pages](https://github.com/franklinmdev/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/franklinmdev/portfolio/actions/workflows/deploy.yml)

A modern, responsive portfolio website built with [Astro](https://astro.build/) and deployed on GitHub Pages.

🌐 **Live Site:** [franklinmdev.me](https://franklinmdev.me)

## ✨ Features

- **⚡ Fast & Modern**: Built with Astro for optimal performance
- **📱 Responsive Design**: Works perfectly on all devices
- **🌙 Dark Mode**: Clean dark design with excellent contrast
- **♿ Accessible**: Follows web accessibility best practices
- **🚀 Auto-Deploy**: Automatic deployment via GitHub Actions
- **🎨 Modern UI**: Clean, professional design with smooth animations
- **📈 SEO Optimized**: Meta tags, structured data, and performance optimized

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Styling:** Pure CSS with modern dark theme
- **TypeScript:** Strict mode enabled
- **Deployment:** GitHub Pages
- **CI/CD:** GitHub Actions

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

4. **Build for production**

   ```bash
   npm run build
   ```

## 📁 Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   └── CNAME              # Custom domain configuration
├── src/
│   └── pages/
│       └── index.astro    # Homepage
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── astro.config.mjs       # Astro configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## 🚀 Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Custom Domain Setup

1. **Domain Configuration**: The `CNAME` file in `/public` contains `franklinmdev.me`
2. **DNS Setup**: Point your domain's DNS to GitHub Pages:
   - Create an `A` record pointing to GitHub's IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or create a `CNAME` record pointing to `franklinmdev.github.io`

### GitHub Pages Settings

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The site will be available at your custom domain

## 🎨 Customization

### Colors & Theming

The design uses a carefully crafted dark color palette with excellent contrast:

```css
body {
  background-color: #0f172a; /* Dark slate background */
  color: #f1f5f9;            /* Light text */
}

h1 {
  background: linear-gradient(135deg, #3b82f6, #2563eb); /* Blue gradient */
}

p {
  color: #94a3b8; /* Muted text */
}
```

### Content Updates

- Update personal information in `src/pages/index.astro`
- Modify meta tags for SEO
- Add your projects and content as needed

## 📊 Performance

- **Lighthouse Score**: 100/100 across all categories
- **Zero JavaScript**: Pure HTML/CSS for maximum performance
- **Optimized CSS**: Minimal, unused CSS removed
- **Dark Mode**: Reduces eye strain and saves battery on OLED displays

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: ✨ add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Portfolio**: [franklinmdev.me](https://franklinmdev.me)
- **GitHub**: [github.com/franklinmdev](https://github.com/franklinmdev)
- **LinkedIn**: [linkedin.com/in/franklin-martinez-0a697a253](https://www.linkedin.com/in/franklin-martinez-0a697a253/)
- **Email**: [franklinmdev@hotmail.com](mailto:franklinmdev@hotmail.com)

---

Built with ❤️ using [Astro](https://astro.build/) by Franklin Martinez
