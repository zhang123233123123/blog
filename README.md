# 🚀 Star Trek Blog - Liquid Glass Design

A futuristic Hexo blog inspired by Star Trek's advanced interfaces, featuring liquid glass design (glassmorphism) and immersive sci-fi elements.

## ✨ Features

### 🌌 Visual Design
- **Liquid Glass Effect**: Semi-transparent panels with backdrop blur
- **Particle Background**: Dynamic star field simulation using Particles.js
- **Holographic Elements**: Glowing text and interactive animations
- **Futuristic Typography**: Orbitron and Exo 2 fonts
- **Responsive Layout**: Works perfectly on all devices

### 🎨 UI Elements
- Gradient backgrounds with sci-fi color palette
- Hover effects with neon glow
- Smooth animations and transitions
- Custom cursor tracking
- Interactive ripple effects

### 🛸 Theme Colors
- Primary: `#00d4ff` (Cyan)
- Secondary: `#ff6b35` (Orange)
- Accent: `#a855f7` (Purple)

## 🚀 Quick Start

### Local Development
```bash
# Clone repository
git clone <your-repo-url>
cd blog

# Install dependencies
npm install

# Start local server
hexo server
# Visit http://localhost:4000
```

### Create New Post
```bash
hexo new "Your Post Title"
```

### Build for Production
```bash
hexo clean && hexo generate
```

## 📦 Project Structure

```
blog/
├── themes/startrek/          # Custom Star Trek theme
│   ├── layout/              # Template files
│   ├── source/css/          # Styles with glassmorphism
│   └── source/js/           # Animations & particles
├── source/_posts/           # Blog posts
├── .github/workflows/       # GitHub Actions for auto-deploy
└── _config.yml             # Hexo configuration
```

## 🛠 Deployment

This blog is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select "GitHub Actions" as source
4. The site will auto-deploy on every push to main/master

### Manual Deployment
```bash
# Build static files
hexo generate

# Deploy using hexo-deployer-git (optional)
hexo deploy
```

## 🔧 Customization

### Colors
Edit CSS custom properties in `themes/startrek/source/css/style.css`:
```css
:root {
    --primary-color: #00d4ff;
    --secondary-color: #ff6b35;
    --accent-color: #a855f7;
}
```

### Particle Settings
Modify `themes/startrek/source/js/particles-config.js` for particle effects.

### Site Configuration
Update `_config.yml` for site metadata, navigation, and other settings.

## 📱 Browser Compatibility

- Chrome/Edge 76+
- Firefox 72+
- Safari 13+
- iOS Safari 13+
- Android Chrome 76+

*Note: Requires modern browsers with backdrop-filter support for full glassmorphism effects.*

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source. Feel free to use and modify as needed.

---

*"Space... the final frontier. These are the voyages of this blog..."*

**Live long and prosper!** 🖖