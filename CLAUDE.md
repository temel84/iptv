# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kaptan IPTV is a static marketing website for an IPTV service. It is a vanilla HTML/CSS/JavaScript Single Page Application (SPA) with no build tools or package managers. The site is optimized for mobile-first design and PWA capabilities.

**Key Characteristics:**
- Static site with no build process (edit files directly, no compilation needed)
- Mobile-first responsive design with 4 breakpoints (360px, 480px, 768px, 1024px)
- Progressive Web App (PWA) with install capability
- Glass morphism design with particle animations
- Turkish language content

## File Structure

```
├── index.html          # Main application (SPA, ~830 lines)
├── style.css           # All styles with CSS variables (~2,900 lines)
├── script.js           # Interactive functionality (~630 lines)
├── manifest.json       # PWA manifest
├── 404.html           # Custom 404 page
└── .nojekyll          # Prevents Jekyll processing on GitHub Pages
```

## Development Workflow

### Local Development
1. Edit files directly in your code editor
2. Open `index.html` in a browser to preview
3. No server required - works as a static file
4. For mobile testing, use browser DevTools responsive mode (Ctrl+Shift+M)

### Deployment
- **GitHub Pages**: Push to `main` branch triggers automatic deployment via `.github/workflows/pages.yml`
- **No build commands**: Deployed as-is to GitHub Pages
- **Deployment URL**: https://temel84.github.io/iptv/

### Git Workflow
- Standard git workflow (no build artifacts to ignore)
- GitHub Actions handles deployment automatically on push to main

## Architecture

### CSS Architecture
- **CSS Variables** defined in `:root` (line 6-27 in style.css)
  - Primary color: `#00f5ff` (cyan)
  - Background: `#0a0e27` (dark navy)
  - Gradients, shadows, transitions all predefined
- **Responsive breakpoints**: Mobile-first, max-width media queries
- **Glass morphism**: Uses `backdrop-filter: blur()` throughout
- **Performance**: GPU acceleration with `transform`, `will-change`

### JavaScript Structure
- **DOM Elements**: Cached at top of script.js
- **Data Objects**: Pricing data stored in `prices` object (TR and AB regions)
- **Key Functions**:
  - `createParticles()`: Dynamic particle generation (20 on mobile, 50 desktop)
  - `handleScroll()`: Navbar scroll effects
  - `toggleMobileMenu()`: Mobile menu with body scroll lock
  - Touch handlers: Swipe gestures for mobile navigation
  - `updatePrices()`: Pricing toggle between TR/AB currencies

### HTML Structure
- Netflix-style loading screen (id: `netflix-loader`)
- Fixed particle background (id: `particles`)
- Fixed navigation with scroll effects
- Section-based layout: Hero, Features, Pricing, Devices, Testimonials, Contact, Footer

## Mobile Optimization Guidelines

This codebase is heavily optimized for mobile. When making changes:

### Touch Targets
- All interactive elements must be minimum **44px** (Apple Human Interface Guidelines)
- Check spacing on buttons, links, and form elements

### Responsive Breakpoints
```css
@media (max-width: 1024px)  /* Tablet & below */
@media (max-width: 768px)   /* Mobile */
@media (max-width: 480px)   /* Small mobile */
@media (max-width: 360px)   /* Ultra small */
```

### Performance Considerations
- Particle count reduced on mobile (20 vs 50)
- Use `transform` instead of position changes for animations
- Add `will-change` for animated properties
- Use passive event listeners for scroll/touch

### Safe Areas (iPhone X+)
```css
padding: max(1rem, env(safe-area-inset-left));
```

## PWA Configuration

The `manifest.json` configures the app for mobile installation:
- **Display mode**: `standalone` (hides browser UI)
- **Theme color**: `#00f5ff` (status bar color)
- **Icons**: Uses external CDN (flaticon.com)
- **Orientation**: `portrait-primary`

## Key Features

### Loading Screen
Netflix-style animated loader with:
- Letter-by-letter logo animation
- Progress bar
- Particle background
- Auto-hides on page load

### Navigation
- Fixed position with backdrop blur
- Scroll-based background change
- Mobile hamburger menu with swipe gestures (swipe right to open, left to close)
- Body scroll lock when menu is open on mobile

### Animations
- Floating particles background
- Scroll reveal animations
- Counter animations for statistics
- Hover effects on all interactive elements

### Pricing System
- Toggle between Turkey (TR) and Abroad (AB) pricing
- Dynamic price updates via JavaScript
- VIP subscription options
- Promotional pricing (e.g., "12+1 months")

## Testing Recommendations

### Mobile Devices
- iPhone SE (375x667)
- iPhone 12/13 (390x844)
- iPhone Pro Max (414x896)
- Samsung Galaxy S21 (360x800)
- iPad Mini (768x1024)

### Performance Metrics
- Target: **60 FPS** on animations
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

### Browser DevTools
- Use responsive mode for viewport testing
- Check Lighthouse scores for performance
- Monitor console for debug messages

## Common Tasks

### Adding/Modifying Content
- Edit `index.html` directly
- Text content is in Turkish
- Icons use FontAwesome 6.5.1

### Styling Changes
- Modify CSS variables in `style.css` :root for global changes
- Mobile-specific styles in media queries at end of file
- Glass morphism: Use `var(--glass)` and `backdrop-filter: blur()`

### JavaScript Changes
- All functionality in `script.js`
- No external dependencies except FontAwesome
- DOM is queried at top of file, ready after DOMContentLoaded

### Pricing Updates
- Modify `prices` object in script.js (lines 14-32)
- TR = Turkey pricing (in TL)
- AB = Abroad pricing (in EUR/USD)
- Each entry: months, price, vip price, optional oldPrice/double

## External Dependencies

- **Fonts**: Google Fonts (Poppins)
- **Icons**: FontAwesome 6.5.1 (CDN)
- **No JavaScript frameworks** (vanilla JS only)
- **No CSS frameworks** (custom CSS only)
- **Icons** are loaded via CDN with lazy loading

## Language Notes

- Primary language: **Turkish** (tr)
- All UI text, content, and comments in Turkish
- HTML lang attribute: `lang="tr"`
- Some documentation files are in French (MOBILE_OPTIMISATION.md, etc.)

## Accessibility Features

- Semantic HTML structure
- Focus visible states for keyboard navigation
- Reduced motion support
- Touch targets 44px+ minimum
- Proper heading hierarchy
- Alt text for images

## Known Issues & Solutions

See `SOLUTION_GITHUB_ACTIONS.md` for GitHub Pages deployment troubleshooting if automatic deployment fails.
