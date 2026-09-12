import {
  mockCourses,
  mockDashboardSummary,
  mockOfficers,
  mockRecommendations,
  mockQuestions,
  searchSeed,
  type AssessmentQuestion,
  type Course,
  type DashboardSummary,
  type Officer,
  type Recommendation,
  type SearchEntry,
} from '../data/mock'

const API_BASE: string = import.meta.env.VITE_API_URL ?? ''

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}/api${path}`, {
    signal: AbortSignal.timeout(5000),
  })
  if (!response.ok) {
    throw new Error(`API ${path} responded with ${response.status}`)
  }
  return response.json() as Promise<T>
}

function withFallback<T>(fallback: () => T, path: string): Promise<T> {
  return request<T>(path).catch(() => fallback())
}

export function fetchOfficers(): Promise<Officer[]> {
  return withFallback(() => mockOfficers, '/officers')
}

export function fetchCourses(): Promise<Course[]> {
  return withFallback(() => mockCourses, '/courses')
}

export function fetchRecommendations(): Promise<Recommendation[]> {
  return withFallback(() => mockRecommendations, '/recommendations')
}

export function fetchDashboardSummary(): Promise<DashboardSummary> {
  return withFallback(() => mockDashboardSummary, '/summary')
}

export function fetchAssessmentQuestions(): Promise<AssessmentQuestion[]> {
  return withFallback(() => mockQuestions, '/assessment/questions')
}

export function fetchSearchIndex(): Promise<SearchEntry[]> {
  return withFallback(() => searchSeed, '/search')
}