# Yaswanth Ala — Portfolio

Personal portfolio site for Yaswanth Ala, ML/AI Engineer. Built as a single-page
React app with a design system of self-hosted variable fonts, layered dark
surfaces, and scroll-triggered motion.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** — dev server and build
- **Tailwind CSS v4** — CSS-first theming via `@theme`
- **Framer Motion** (`motion`) — scroll reveals, stagger, and interaction animations
- **Fontsource** — self-hosted variable fonts (Bricolage Grotesque for display, Geist for body)

## Local development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Build

```bash
npm run build
```

Outputs a production build to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Type checking

```bash
npm run lint
```

Runs `tsc --noEmit` to check types without emitting output.

## Deployment

The app is a static Vite build — deploy the contents of `dist/` to any static
host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.). No environment
variables or server-side runtime are required.
