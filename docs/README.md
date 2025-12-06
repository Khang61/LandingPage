# Landing Page Design Service

Professional landing page for Vietnamese web design agency.

## Quick Start

1. Open `index.html` in browser
2. Or deploy to any static hosting (Netlify, Vercel, GitHub Pages)

## Tech Stack

- HTML5 (semantic)
- CSS3 (Variables, Flexbox, Grid)
- Vanilla JavaScript ES6+
- No build step required

## Project Structure

```
├── index.html          # Main landing page
├── css/
│   ├── styles.css      # Main styles + CSS variables
│   ├── responsive.css  # Mobile breakpoints
│   └── animations.css  # Scroll animations
├── js/
│   ├── main.js         # Core functionality
│   └── animations.js   # Animation handlers
├── assets/
│   ├── images/         # Portfolio, testimonials
│   └── icons/          # SVG icons
└── docs/               # Documentation
```

## Features

- 10 sections: Hero, Values, Services, Why Us, Portfolio, Process, Pricing, Testimonials, FAQ, Contact
- Mobile-first responsive (320px - 1920px)
- Scroll animations with Intersection Observer
- FAQ accordion
- Contact form with validation
- Sticky header
- Floating CTA on mobile

## Color Scheme

| Variable | Color | Usage |
|----------|-------|-------|
| Primary | `#10B981` | Mint green, main brand |
| Secondary | `#34D399` | Light mint, accents |
| Accent | `#059669` | Dark mint, CTAs |
| Background | `#ECFDF5` | Mint tint sections |

## Fonts

- **Headings:** Poppins (Google Fonts)
- **Body:** Roboto (Google Fonts)

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Deployment

### Netlify
```bash
# Drag & drop folder to netlify.com/drop
```

### GitHub Pages
```bash
git add .
git commit -m "Initial landing page"
git push origin main
# Enable Pages in repo settings
```

### Vercel
```bash
npm i -g vercel
vercel
```

## Performance

- Target load time: <2s
- Lazy loading images
- Minified assets (recommended for production)
- No external dependencies

## Customization

1. Edit CSS variables in `css/styles.css`
2. Update content in `index.html`
3. Replace images in `assets/images/`

## License

MIT License
