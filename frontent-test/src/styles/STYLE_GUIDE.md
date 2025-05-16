# Bergvik Style Guide

This document outlines the styling patterns, components, and best practices for the Bergvik website.

## Table of Contents
- [Theme Variables](#theme-variables)
- [Component Classes](#component-classes)
- [Layout Patterns](#layout-patterns)
- [Animations](#animations)
- [Best Practices](#best-practices)

## Theme Variables

### Colors
```css
/* Primary Colors */
--color-primary      /* emerald-500 */
--color-primary-dark /* emerald-700 */
--color-primary-light/* emerald-100 */

/* Grays */
--color-gray-{50-900}/* Full gray scale */
```

### Spacing
```css
--space-xs  /* 0.25rem */
--space-sm  /* 0.5rem */
--space-md  /* 1rem */
--space-lg  /* 1.5rem */
--space-xl  /* 2rem */
--space-2xl /* 3rem */
--space-3xl /* 4rem */
```

### Other Variables
```css
/* Border Radius */
--radius-{sm,md,lg,xl}

/* Transitions */
--transition-{fast,normal,slow}

/* Shadows */
--shadow-{sm,md,lg}
```

## Component Classes

### Buttons
```jsx
<button className="btn btn-primary btn-md">Primary Button</button>
<button className="btn btn-outline btn-sm">Outline Button</button>
<button className="btn btn-primary btn-full">Full Width</button>
```

### Forms
```jsx
<div className="form-group">
  <label className="form-label">Email</label>
  <input className="form-input" type="email" />
</div>

<textarea className="form-textarea"></textarea>
<select className="form-select"></select>
<input className="form-checkbox" type="checkbox" />
```

### Cards
```jsx
<div className="card">
  <div className="card-content">...</div>
</div>

<div className="card card-hover">
  Hoverable Card
</div>
```

### Navigation
```jsx
<a className="nav-link">Regular Link</a>
<a className="nav-link nav-link-active">Active Link</a>
```

### Pagination
```jsx
<button className="pagination-btn">Prev</button>
<button className="pagination-number">1</button>
<button className="pagination-number pagination-number-active">2</button>
```

## Layout Patterns

### Grids
```jsx
<div className="grid-2-cols">2 Column Grid</div>
<div className="grid-3-cols">3 Column Grid</div>
<div className="grid-4-cols">4 Column Grid</div>
```

### Spacing
```jsx
<section className="section-spacing">
  <div className="content-spacing">
    <div className="stack-spacing">
      Nested spacing
    </div>
  </div>
</section>
```

### Containers
```jsx
<div className="container-narrow">Max width 2xl</div>
<div className="container-wide">Max width 7xl</div>
```

## Animations

### Fade and Slide
```jsx
<div className="animate-fade">Fade In</div>
<div className="animate-slide-up">Slide Up</div>
<div className="animate-slide-down">Slide Down</div>
<div className="animate-scale">Scale In</div>
```

### Hover Effects
```jsx
<div className="hover-lift">Lift on Hover</div>
<div className="hover-scale">Scale on Hover</div>
<div className="hover-opacity">Fade on Hover</div>
```

## Best Practices

1. **Use Semantic Classes**
   - Prefer semantic classes over utility classes for components
   - Example: Use `btn-primary` instead of `bg-emerald-600 text-white...`

2. **Responsive Design**
   - Grid classes automatically handle responsive layouts
   - Use responsive variants only when needed: `md:hidden`

3. **Dark Mode**
   - Theme variables automatically adjust for dark mode
   - Use `dark:` variant for custom dark mode styles

4. **Animation Performance**
   - Use `will-change` for heavy animations
   - Prefer `transform` over animating dimensions/positions

5. **Accessibility**
   - Forms include proper focus states
   - Interactive elements have hover/focus states
   - Use semantic HTML elements

6. **Maintenance**
   - Keep component styles in `globals.css`
   - Use CSS variables for theme values
   - Document new patterns in this guide 