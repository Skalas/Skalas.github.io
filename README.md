# Miguel Escalante - Personal Website

Personal website and blog for Miguel Escalante, Data Scientist and AI Leader based in Mexico City.

## 🚀 Quick Start

### Prerequisites
- Ruby 3.4+ (managed via rbenv)
- Bundler
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Skalas/Skalas.github.io-1.git
   cd Skalas.github.io-1
   ```

2. **Install Ruby dependencies**
   ```bash
   bundle install
   ```

3. **Start development server**
   ```bash
   ./scripts/dev.sh
   # or manually:
   bundle exec jekyll serve --livereload
   ```

4. **Visit your site**
   Open [http://localhost:4000](http://localhost:4000) in your browser.

## 📝 Content Management

### Adding New Blog Posts
Create new posts in the `_posts/` directory with the format:
```
YYYY-MM-DD-title.md
```

Example front matter:
```yaml
---
layout: post
title: "Your Post Title"
description: "Brief description for SEO"
category: Data Science
header-img: "img/post-bg-02.jpg"
tags: [data-science, machine-learning]
date: 2024-12-19 12:00:00
permalink: your-post-slug
author: Miguel Escalante
---
```

### Updating About Page
Edit `about.html` to update your professional information.

## 🛠️ Development

### Project Structure
```
├── _config.yml          # Site configuration
├── _posts/              # Blog posts
├── _includes/           # Reusable HTML components
├── _layouts/            # Page templates
├── assets/              # CSS, JS, images
├── scripts/             # Development scripts
└── _site/               # Generated site (gitignored)
```

### Key Features
- ✅ Modern Jekyll 4.4.1 setup
- ✅ SEO optimized with meta tags
- ✅ Social media cards (Open Graph, Twitter)
- ✅ RSS feed generation
- ✅ Sitemap generation
- ✅ Responsive design
- ✅ Live reload for development

### Deployment
This site is configured for GitHub Pages deployment. Simply push to the `main` branch and GitHub will automatically build and deploy your site.

## 🔧 Configuration

### Site Settings (`_config.yml`)
- **URL**: https://skalas.me
- **Title**: Skalas
- **Description**: Miguel Escalante, mathematician, developer, data scientist, data engineer, whovian.

### Social Media
- GitHub: [@Skalas](https://github.com/Skalas)
- LinkedIn: [skalas](https://linkedin.com/in/skalas)
- Twitter: [@Skalas](https://twitter.com/Skalas)

## 📊 Analytics & SEO

The site includes:
- Open Graph meta tags for social sharing
- Twitter Card support
- Structured data for better search results
- XML sitemap for search engines
- RSS feed for subscribers

## 🎨 Customization

### Themes
This site uses the Clean Blog theme from StartBootstrap. To customize:
1. Edit `assets/css/clean-blog.css`
2. Modify `_includes/` files for layout changes
3. Update `_layouts/` for template modifications

### Adding New Pages
Create new `.html` or `.md` files in the root directory with appropriate front matter.

## 🚀 Performance Tips

1. **Optimize Images**: Use WebP format and appropriate sizes
2. **Minimize HTTP Requests**: Combine CSS/JS files
3. **Enable Compression**: Configure your web server for gzip
4. **Use CDN**: Consider using a CDN for static assets

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Email: escalas5@gmail.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ using Jekyll and the Clean Blog theme.*