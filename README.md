# NASA APOD Explorer

A React + TypeScript app that lets you explore NASA's Astronomy Picture of the Day for any date since June 16, 1995.

## Features
- Search any date from NASA's APOD archive
- Displays image (or video thumbnail), title, explanation, copyright, and HD link
- Accessible: skip link, ARIA labels, semantic HTML, live regions, keyboard navigation
- Responsive design

## Tech Stack
- React 18 + TypeScript
- Vite
- CSS Modules
- NASA APOD API (no credit card required — uses DEMO_KEY)

## Getting Started

```bash
npm install
npm run dev
```

## Deploy to Netlify

### Option A — Drag & Drop (fastest)
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Deploy manually"
3. Drag the `dist/` folder into the upload area
4. Done — Netlify gives you a live URL instantly

### Option B — GitHub Integration (auto-deploy on every push)
1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import an existing project"
3. Connect your GitHub account and select the repo
4. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site" — every push to `main` redeploys automatically

## API Notes
- Uses `DEMO_KEY` — no signup required
- Rate limit: 30 requests/hour per IP, 50/day
- If you hit the limit, register a free key at https://api.nasa.gov/ and replace `DEMO_KEY` in `src/hooks/useApod.ts`
