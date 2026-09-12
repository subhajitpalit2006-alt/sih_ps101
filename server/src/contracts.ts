export type OfficerStatus = 'On track' | 'Learning active' | 'Needs review'

export interface Officer {
  initials: string
  name: string
  designation: string
  department: string
  competency: string
  status: OfficerStatus
}

export interface Course {
  title: string
  provider: string
  meta: string
  tag: string
}

export type RecommendationIcon = 'activity' | 'layout' | 'target' | 'sparkles'

export type RecommendationSource = 'igot' | 'nssta'

export interface Recommendation {
  source: RecommendationSource
  title: string
  provider: string
  duration: string
  difficulty: string
  skills: string
  reason: string
  progress: number
  action: string
  icon: RecommendationIcon
}

export interface AssessmentQuestion {
  question: string
  options: string[]
  answer: string
  explanation: string
  difficulty: string
  topic: string
}

export interface DashboardSummary {
  overallCompetency: number
  benchmark: number
  prioritySkillGaps: number
  learningHours: number
  plannedHours: number
  coursesCompleted: number
}

export interface SearchEntry {
  label: string
  sublabel: string
  route: string
}