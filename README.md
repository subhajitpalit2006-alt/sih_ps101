# STARTAFORGE — Official Statistics Learning

Frontend (MVP) for **STARTAFORGE**, the official-statistics learning platform for statistical officers. This is the SMART India Hackathon (SIH) PS-101 submission frontend.

A React SPA with a real HTTP API layer (`src/services/api.ts`) backed by a small Express + TypeScript API in `server/`. When the API is unreachable, the app transparently falls back to in-memory mock data so the UI always renders.

## Stack

- React 19 + React Router 7
- TypeScript (strict: `noUnusedLocals`, `verbatimModuleSyntax`)
- Vite 8 + React Compiler (Babel plugin via `@rolldown/plugin-babel`)
- lucide-react icons
- ESLint 10 (typescript-eslint, react-hooks, react-refresh)

## Features

- **Learner dashboard** — competency summary metrics, radar chart, recommendations, learning progress
- **AI competency analysis** — skill-gap report with stage-based "AI processing" simulation
- **Learning path** — progression rail with recommended courses
- **Assessment engine** — mock assessment generation flow (setup → processing → generated)
- **Officer directory** — searchable mock officer records
- **Settings** — platform preferences and access & privacy dialog
- Interactive shell: sidebar navigation, workspace switcher, notifications, profile popover, search, help drawer, toasts

## Structure

```
src/
  components/parts.tsx   Shared UI components
  pages/                 Page-level views (Dashboard, LearningPath, Assessment, Competency, Directory, Settings)
  services/api.ts        API layer — HTTP calls with mock fallback
  data/mock.ts           Types + mock data (fallback source)
  lib/format.ts          Date formatting helpers
  App.tsx                App shell + routing
  App.css                Styling
server/
  src/index.ts           Server bootstrap
  src/app.ts             Express app (cors, json, routing)
  src/routes.ts          REST endpoints
  src/store.ts           In-memory data layer
  src/data/seed.ts       Seed data (mirror of the frontend mocks)
  render.yaml            Render (free tier) blueprint
```

## Scripts

```bash
npm install        # install frontend dependencies
npm run dev        # start dev server with HMR (proxies /api to :4000)
npm run dev:server # start the backend API (tsx watch, port 4000)
npm run lint       # ESLint
npm run build      # typecheck (tsc -b) + production build to dist/
npm run preview    # preview the production build

cd server && npm install        # install backend dependencies
cd server && npm test           # smoke tests (node:test + supertest)
cd server && npm run build      # typecheck + compile to server/dist
cd server && npm start          # run the compiled API
```

Run `npm run dev:server` and `npm run dev` together for local development.

## API

The Express API (`server/`) serves the frontend contracts over HTTP:

| Method | Route | Returns |
| --- | --- | --- |
| GET | `/health` | `{ status: "ok" }` |
| GET | `/api/officers` | `Officer[]` |
| GET | `/api/courses` | `Course[]` |
| GET | `/api/recommendations` | `Recommendation[]` |
| GET | `/api/summary` | `DashboardSummary` |
| GET | `/api/assessment/questions` | `AssessmentQuestion[]` |
| GET | `/api/search?q=` | `SearchEntry[]` (optionally filtered by `q`) |

Data is stored in memory (`server/src/store.ts`), seeded from the frontend mocks so both sides always agree. Port from `PORT` (default `4000`); CORS defaults to `*` and can be locked down with `CORS_ORIGIN` (comma-separated origins). See `server/.env.example`.

The frontend `api.ts` calls `${VITE_API_URL}/api/...`. In dev, `VITE_API_URL` is unset and Vite proxies `/api` to `http://localhost:4000` (see `vite.config.ts`). Set `VITE_API_URL` at build time to point at a deployed API (e.g. `https://startaforge-api.onrender.com`).

## Deployment

- **Frontend**: Netlify with SPA routing (`public/_redirects`, `netlify.toml`). Publish `dist/`. To use the hosted API, set `VITE_API_URL` in the Netlify build environment.
- **Backend**: Render (free tier) via `server/render.yaml` — root `server/`, `npm install && npm run build`, `npm start`, health check on `/health`. Set `CORS_ORIGIN` to your Netlify frontend origin in production.