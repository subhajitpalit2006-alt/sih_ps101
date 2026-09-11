# STARTAFORGE — Official Statistics Learning

Frontend (MVP) for **STARTAFORGE**, the official-statistics learning platform for statistical officers. This is the SMART India Hackathon (SIH) PS-101 submission frontend.

A mock-first React SPA: the UI is fully wired, and a thin API layer (`src/services/api.ts`) stands in for the backend with simulated latency so the app can be swapped to real endpoints later.

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
  services/api.ts        API layer — replace mock promises with real calls
  data/mock.ts           Types + mock data (courses, officers, questions, recommendations)
  lib/format.ts          Date formatting helpers
  App.tsx                App shell + routing
  App.css                Styling
```

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start dev server with HMR
npm run lint     # ESLint
npm run build    # typecheck (tsc -b) + production build to dist/
npm run preview  # preview the production build
```

## API layer

`src/services/api.ts` exposes Promise-based fetchers (`fetchCourses`, `fetchOfficers`, `fetchRecommendations`, `fetchDashboardSummary`, `fetchAssessmentQuestions`, `fetchSearchIndex`) backed by mock data in `src/data/mock.ts`. Point these at real endpoints when the backend is ready; no component-level changes required.

## Deployment

Configured for Netlify with SPA routing (`public/_redirects`, `netlify.toml`). Publish `dist/`.