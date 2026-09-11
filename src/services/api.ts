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

function resolve<T>(payload: T, delay = 350): Promise<T> {
  return new Promise((resolvePromise) => {
    window.setTimeout(() => resolvePromise(payload), delay)
  })
}

export function fetchOfficers(): Promise<Officer[]> {
  return resolve(mockOfficers)
}

export function fetchCourses(): Promise<Course[]> {
  return resolve(mockCourses)
}

export function fetchRecommendations(): Promise<Recommendation[]> {
  return resolve(mockRecommendations)
}

export function fetchDashboardSummary(): Promise<DashboardSummary> {
  return resolve(mockDashboardSummary, 250)
}

export function fetchAssessmentQuestions(): Promise<AssessmentQuestion[]> {
  return resolve(mockQuestions, 400)
}

export function fetchSearchIndex(): Promise<SearchEntry[]> {
  return resolve(searchSeed, 150)
}