# Code Standards

## CSS

### Naming Convention
- BEM-like: `.block`, `.block--modifier`, `.block__element`
- Utility classes: `.section`, `.container`, `.btn`

### CSS Variables
All design tokens in `:root`:
```css
--color-primary: #10B981;
--font-heading: 'Poppins', sans-serif;
--spacing-md: 2rem;
--radius-md: 0.5rem;
```

### File Organization
1. `styles.css` - Variables, reset, components
2. `responsive.css` - Media queries only
3. `animations.css` - Keyframes, animation classes

## HTML

### Semantic Structure
```html
<header> - Navigation
<main> - Content sections
<section> - Each content block
<footer> - Footer info
```

### Accessibility
- All images have `alt` text
- Form inputs have `label`
- ARIA labels on icon buttons
- Proper heading hierarchy

## JavaScript

### Pattern
- IIFE for encapsulation
- Event delegation where possible
- Intersection Observer for scroll effects
- No global variables

### Error Handling
```javascript
try {
  // async operation
} catch (error) {
  console.error(error);
}
```

## Performance

- Inline critical CSS (optional)
- Defer non-critical JS
- Lazy load images below fold
- Preconnect Google Fonts
