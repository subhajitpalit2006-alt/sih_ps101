import {
  assessmentQuestions,
  courses,
  dashboardSummary,
  officers,
  recommendations,
  searchSeed,
} from './data/seed.js'
import type {
  AssessmentQuestion,
  Course,
  DashboardSummary,
  Officer,
  Recommendation,
  SearchEntry,
} from './contracts.js'

function copyArray<T extends object>(items: T[]): T[] {
  return items.map((item) => ({ ...item }))
}

export const store = {
  officers: (): Officer[] => copyArray(officers),
  courses: (): Course[] => copyArray(courses),
  recommendations: (): Recommendation[] => copyArray(recommendations),
  assessmentQuestions: (): AssessmentQuestion[] => copyArray(assessmentQuestions),
  dashboardSummary: (): DashboardSummary => ({ ...dashboardSummary }),
  searchEntries: (): SearchEntry[] => copyArray(searchSeed),
}