export interface Officer {
  initials: string
  name: string
  designation: string
  department: string
  competency: string
  status: 'On track' | 'Learning active' | 'Needs review'
}

export interface Course {
  title: string
  provider: string
  meta: string
  tag: string
}

export type RecommendationIcon = 'activity' | 'layout' | 'target' | 'sparkles'

export interface Recommendation {
  source: 'igot' | 'nssta'
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

export const assessmentStages = ['Reading material', 'Extracting concepts', 'Generating questions', 'Validating questions']

export const analysisStages = ['Profile analysis', 'Competency mapping', 'Role framework matching', 'Gap identification', 'Learning recommendation generation']

export const mockQuestions: AssessmentQuestion[] = [
  { question: 'Which measure is most appropriate for assessing the variability of an estimator across repeated samples?', options: ['Standard error', 'Arithmetic mean', 'Median absolute deviation of the population', 'Response rate'], answer: 'Standard error', explanation: 'The standard error measures the expected variability of an estimator across repeated samples and is used to construct confidence intervals.', difficulty: 'Intermediate', topic: 'Sampling and estimation' },
  { question: 'In an official statistical release, what is the primary purpose of a metadata statement?', options: ['To replace the published estimates', 'To describe concepts, methods, quality and limitations', 'To rank the reporting units', 'To disclose individual records'], answer: 'To describe concepts, methods, quality and limitations', explanation: 'Metadata makes official statistics interpretable and transparent by documenting definitions, methods, quality dimensions and known limitations.', difficulty: 'Foundation', topic: 'Statistical quality and metadata' },
  { question: 'Which practice best supports reproducible tabulation of an enterprise survey?', options: ['Manual edits in a spreadsheet', 'Saving only the final chart', 'Version-controlled scripts with documented inputs', 'Sharing a screenshot of the output'], answer: 'Version-controlled scripts with documented inputs', explanation: 'Documented, version-controlled scripts make transformations auditable and allow another analyst to reproduce the published tables.', difficulty: 'Advanced', topic: 'Data analysis and governance' },
  { question: 'A high non-response rate most directly threatens which property of a survey estimate?', options: ['Timeliness only', 'Representativeness and potential non-response bias', 'File compression', 'Geographic coding'], answer: 'Representativeness and potential non-response bias', explanation: 'When respondents differ systematically from non-respondents, the resulting estimates may be biased even when the sample design is otherwise sound.', difficulty: 'Intermediate', topic: 'Survey design' },
]

export const mockOfficers: Officer[] = [
  { initials: 'RK', name: 'Rakesh Kumar', designation: 'Deputy Director', department: 'National Statistical Office', competency: '81%', status: 'On track' },
  { initials: 'PM', name: 'Priya Menon', designation: 'Senior Statistical Officer', department: 'DIID', competency: '74%', status: 'Learning active' },
  { initials: 'SV', name: 'Sanjay Verma', designation: 'Statistical Officer', department: 'Social Statistics Division', competency: '63%', status: 'Needs review' },
  { initials: 'NF', name: 'Nandita Fernandes', designation: 'Assistant Director', department: 'Economic Statistics Division', competency: '88%', status: 'On track' },
]

export const mockCourses: Course[] = [
  { title: 'Python for Official Statistics', provider: 'National Statistical Training Academy', meta: '6 hours · Intermediate', tag: 'Closes skill gap' },
  { title: 'Introduction to Geospatial Data for Surveys', provider: 'UN Statistics Division · eLearning', meta: '4 hours · Foundation', tag: 'Build GIS capability' },
  { title: 'Responsible AI for Public Data Systems', provider: 'Capacity Building Programme', meta: '3 hours · Foundation', tag: 'Emerging priority' },
]

export const mockRecommendations: Recommendation[] = [
  { source: 'igot', title: 'Python for Official Statistics', provider: 'iGOT Karmayogi', duration: '6 hours', difficulty: 'Intermediate', skills: 'Python · Data validation · Reproducible tabulation', reason: 'Closes your 28-point Python gap and supports the enterprise survey data validation work in your current assignment.', progress: 46, action: 'Continue learning', icon: 'activity' },
  { source: 'igot', title: 'Geospatial Data for Evidence-Based Policy', provider: 'iGOT Karmayogi', duration: '4 hours', difficulty: 'Foundation', skills: 'GIS · Spatial analysis · Data visualisation', reason: 'Builds foundational GIS capability identified as a priority in your competency assessment.', progress: 0, action: 'Start course', icon: 'layout' },
  { source: 'nssta', title: 'Advanced Sampling and Estimation Methods', provider: 'NSSTA Recommended Training Programme', duration: '5 days', difficulty: 'Advanced', skills: 'Sampling · Variance estimation · Non-response adjustment', reason: 'Strengthens your existing sampling practice for the upcoming large-scale household survey programme.', progress: 20, action: 'Resume programme', icon: 'target' },
  { source: 'nssta', title: 'Responsible AI in Official Statistics', provider: 'NSSTA Recommended Training Programme', duration: '3 days', difficulty: 'Foundation', skills: 'AI / ML · Data governance · Statistical ethics', reason: 'Introduces practical safeguards for evaluating machine learning use in estimation and anomaly detection.', progress: 0, action: 'View programme', icon: 'sparkles' },
]

export const mockDashboardSummary: DashboardSummary = {
  overallCompetency: 74,
  benchmark: 68,
  prioritySkillGaps: 3,
  learningHours: 31.5,
  plannedHours: 40,
  coursesCompleted: 7,
}

export const searchSeed: SearchEntry[] = [
  { label: 'Overview', sublabel: 'Learner dashboard', route: '/' },
  { label: 'My learning', sublabel: 'Personalized learning path', route: '/learning' },
  { label: 'Skill intelligence', sublabel: 'AI competency analysis', route: '/skills' },
  { label: 'Assessment engine', sublabel: 'Generate a knowledge check', route: '/assessment' },
  { label: 'Officer directory', sublabel: 'Capability oversight', route: '/directory' },
  { label: 'Settings', sublabel: 'Workspace preferences', route: '/settings' },
  ...mockCourses.map((course) => ({ label: course.title, sublabel: course.provider, route: '/learning' })),
  ...mockOfficers.map((officer) => ({ label: officer.name, sublabel: `${officer.designation} · ${officer.department}`, route: '/directory' })),
]