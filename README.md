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

The dev server runs at `http://localhost:3000/portfolio/` (the `/portfolio/`
base path matches the GitHub Pages deployment — see below).

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

Live at **https://yashala.github.io/portfolio/**.

Deployment is automatic: `.github/workflows/deploy.yml` builds and publishes
to GitHub Pages on every push to `main`. The app is otherwise a plain static
Vite build and can be deployed to any static host (Vercel, Netlify, Cloudflare
Pages, etc.) — just drop the `base` path in `vite.config.ts` if hosting at a
domain root instead of a `/portfolio/` subpath. No environment variables or
server-side runtime are required.
