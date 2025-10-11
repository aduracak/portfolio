# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is Abdullah Duracak's portfolio website - a modern, interactive React application showcasing his software engineering skills. The project features advanced animations, 3D graphics, and a responsive design built with cutting-edge web technologies.

## Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: TailwindCSS with custom animations and gradients
- **Animations**: Framer Motion for smooth transitions and interactions
- **3D Graphics**: Three.js with React Three Fiber for particle backgrounds
- **Form Handling**: React Hook Form with validation
- **Icons**: Lucide React
- **Build Tool**: Vite with code splitting and optimization

## Common Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Architecture

### Component Structure
The application follows a modular component architecture:

```
src/
├── components/           # React components
│   ├── Navigation.jsx   # Navigation bar with scroll spy
│   ├── Hero.jsx         # Landing section with 3D particles
│   ├── About.jsx        # About section with timeline
│   ├── Projects.jsx     # Project showcase with modals
│   ├── Skills.jsx       # Skills grid with animations
│   ├── Contact.jsx      # Contact form and info
│   └── ScrollToTop.jsx  # Scroll to top button
├── utils/               # Utility functions and hooks
│   └── useScrollSpy.js  # Hook for active section detection
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and TailwindCSS
```

### Key Features
- **Three.js Integration**: Hero section uses React Three Fiber for floating particle animation
- **Smooth Scrolling**: Custom scroll spy implementation with smooth section transitions
- **Form Validation**: Contact form with real-time validation using React Hook Form
- **Responsive Design**: Mobile-first approach with TailwindCSS responsive utilities
- **Dark Theme**: Consistent dark color scheme with gradient accents
- **Loading States**: Preloader and button loading states for better UX

### Animation System
- **Framer Motion**: Used throughout for enter/exit animations and micro-interactions
- **Custom CSS Animations**: TailwindCSS custom keyframes for specialized effects
- **Scroll-triggered Animations**: Components animate into view using `useInView` hook
- **Three.js Animations**: Particle system with mouse interaction and continuous rotation

### State Management
- **Local State**: Component-level state using React hooks
- **Form State**: React Hook Form for contact form state and validation
- **Theme State**: Dark/light mode toggle (currently defaults to dark)
- **Scroll State**: Active section tracking and scroll-to-top visibility

## Development Guidelines

### Adding New Sections
1. Create component in `src/components/`
2. Add to main App.jsx
3. Update navigation items in Navigation.jsx
4. Add section ID to useScrollSpy hook

### Modifying Animations
- Use Framer Motion's `motion` components for React animations
- Leverage TailwindCSS custom animations defined in `tailwind.config.js`
- For Three.js animations, modify the `FloatingParticles` component in Hero.jsx

### Styling Conventions
- Use TailwindCSS utility classes
- Custom utilities defined in `src/index.css` under `@layer utilities`
- Color scheme based on custom color palette in `tailwind.config.js`
- Responsive design with mobile-first approach

### Form Handling
- Contact form uses React Hook Form with comprehensive validation
- Form submission simulated with timeout (replace with actual API endpoint)
- Error states and success messages handled with Framer Motion animations

## File Organization

### Configuration Files
- `vite.config.js`: Vite configuration with code splitting
- `tailwind.config.js`: TailwindCSS configuration with custom theme
- `postcss.config.js`: PostCSS configuration for TailwindCSS
- `package.json`: Dependencies and build scripts

### Asset Management
- Images loaded from Unsplash CDN (replace with local assets for production)
- Fonts loaded from Google Fonts
- Icons from Lucide React library

## Performance Considerations

### Code Splitting
Vite configuration includes manual chunks for:
- Vendor libraries (React, React DOM)
- Three.js libraries
- Animation libraries (Framer Motion)

### Image Optimization
- Use appropriate image formats and sizes
- Implement lazy loading for project images
- Consider using WebP format for better compression

### Bundle Size
- Tree shaking enabled by default with Vite
- Framer Motion and Three.js are the largest dependencies
- Consider code splitting if bundle size becomes an issue

## Deployment

The project is configured for static site deployment:
- Build output in `dist/` directory
- All assets are bundled and optimized
- No server-side rendering required
- Compatible with services like Netlify, Vercel, or GitHub Pages

## Customization Points

### Personal Information
Update the following files with actual data:
- Contact information in `Contact.jsx`
- Social media links throughout components
- Project data in `Projects.jsx`
- Skills and timeline in `About.jsx` and `Skills.jsx`

### Styling
- Color scheme in `tailwind.config.js`
- Custom animations and keyframes
- Typography settings (fonts are loaded in `index.html`)

### Content
- Replace placeholder project images with actual screenshots
- Update project descriptions and links
- Modify about section content to reflect actual experience