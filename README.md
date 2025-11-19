# 🚀 HR Portfolio - Modern AI/ML Portfolio

A cutting-edge, high-performance portfolio website showcasing AI/ML expertise, built with the latest web technologies and best practices.

## ✨ Features

### 🎯 Core Features
- **Progressive Web App (PWA)** - Installable, offline-capable
- **Web Components** - Reusable, encapsulated UI elements
- **Modern JavaScript (ES2022+)** - Latest language features
- **CSS Grid & Flexbox** - Modern layout systems
- **Container Queries** - Component-based responsive design
- **Intersection Observer API** - Performance-optimized animations
- **Service Worker** - Advanced caching strategies

### 🎨 Visual Enhancements
- **Particle Systems** - Interactive background animations
- **Glassmorphism Effects** - Modern UI design trends
- **Advanced Animations** - Smooth, performant transitions
- **Responsive Design** - Mobile-first approach
- **Dark/Light Theme** - User preference support
- **Accessibility (A11y)** - WCAG 2.1 AA compliant

### ⚡ Performance Optimizations
- **Lazy Loading** - Images and components
- **Code Splitting** - Optimized bundle sizes
- **Tree Shaking** - Unused code elimination
- **Compression** - Gzip & Brotli support
- **CDN Integration** - Fast resource delivery
- **Critical CSS** - Above-the-fold optimization

### 🔧 Development Tools
- **Vite** - Lightning-fast build tool
- **ESLint** - Code quality enforcement
- **Prettier** - Consistent code formatting
- **TypeScript** - Type safety (optional)
- **Husky** - Git hooks automation
- **Lighthouse CI** - Performance monitoring

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES2022+)** - Latest ECMAScript features
- **Web Components** - Native component system
- **AOS (Animate On Scroll)** - Scroll animations

### Build Tools
- **Vite** - Next-generation frontend tooling
- **PostCSS** - CSS processing
- **Autoprefixer** - Vendor prefix automation
- **Terser** - JavaScript minification

### PWA & Performance
- **Workbox** - Service worker management
- **Web App Manifest** - PWA configuration
- **Cache Strategies** - Intelligent resource caching
- **Background Sync** - Offline functionality

### Development & Quality
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Lint-staged** - Pre-commit checks

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn 1.22+

### Quick Start
```bash
# Clone the repository
git clone https://github.com/hemanthreddyy98-hub/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands
```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Code linting
npm run lint

# Code formatting
npm run format

# Performance analysis
npm run analyze

# Lighthouse audit
npm run lighthouse

# Run tests
npm run test

# Type checking
npm run type-check
```

## 🏗️ Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles.css              # Main stylesheet
├── modern-styles.css       # Modern CSS features
├── script.js               # Main JavaScript
├── sw.js                   # Service worker
├── manifest.json           # PWA manifest
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── .eslintrc.js           # ESLint configuration
├── README.md              # Documentation
├── assets/                # Static assets
│   ├── icons/             # PWA icons
│   ├── images/            # Images
│   └── fonts/             # Custom fonts
└── dist/                  # Build output
```

## 🎨 Customization

### Colors & Theming
The portfolio uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #1e40af;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
  /* ... more variables */
}
```

### Content Updates
1. **Personal Information**: Update `index.html` with your details
2. **Projects**: Modify the projects section with your work
3. **Skills**: Adjust skill percentages and categories
4. **Contact**: Update contact information and social links

### Styling
- Main styles: `styles.css`
- Modern features: `modern-styles.css`
- Custom animations: Add to CSS files
- Component styles: Use CSS custom properties

## 🚀 Deployment

### GitHub Pages
```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Vercel
1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

## 📊 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100
- **PWA**: 100

### Optimization Features
- **Bundle Analysis**: `npm run analyze`
- **Performance Monitoring**: Built-in metrics
- **Caching Strategies**: Intelligent resource caching
- **Image Optimization**: WebP support with fallbacks
- **Font Loading**: Optimized font delivery

## 🔧 Configuration

### PWA Settings
Edit `manifest.json` for PWA customization:
```json
{
  "name": "Your Name - Portfolio",
  "short_name": "Portfolio",
  "theme_color": "#1e40af",
  "background_color": "#142A4D"
}
```

### Service Worker
Configure caching strategies in `sw.js`:
```javascript
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];
```

### Build Configuration
Modify `vite.config.js` for build optimization:
```javascript
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['aos']
        }
      }
    }
  }
});
```

## 🧪 Testing

### Unit Tests
```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Coverage report
npm run test:coverage
```

### E2E Tests
```bash
# Run E2E tests
npm run test:e2e
```

### Performance Tests
```bash
# Lighthouse audit
npm run lighthouse

# Bundle analysis
npm run analyze
```

## 📱 PWA Features

### Installation
- **Automatic**: Browser prompts for installation
- **Manual**: Add to home screen option
- **App-like**: Full-screen experience

### Offline Support
- **Caching**: Intelligent resource caching
- **Background Sync**: Offline form submissions
- **Offline Page**: Graceful offline experience

### Push Notifications
- **Permission**: User consent required
- **Customization**: Configurable notification content
- **Actions**: Interactive notification buttons

## 🌐 Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Legacy Support
- IE 11 (limited features)
- Older browsers (graceful degradation)

## 📈 Analytics & Monitoring

### Built-in Metrics
- **Core Web Vitals**: LCP, FID, CLS
- **Performance**: Load times, bundle sizes
- **User Experience**: Interaction metrics

### External Integration
- **Google Analytics**: Add your tracking ID
- **Hotjar**: User behavior analysis
- **Sentry**: Error monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Development Guidelines
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AOS Library** - Scroll animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **Vite** - Build tooling
- **Workbox** - Service worker utilities

## 📞 Contact

- **Email**: reddyhemanth694@gmail.com
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [hemanthreddyy98-hub](https://github.com/hemanthreddyy98-hub)

---

**Built with ❤️ using modern web technologies**
