import { useEffect, useState } from 'react'
import {
  Activity, Award, BookOpen, Check, ChevronRight, Clock3,
  MoreHorizontal, PlayCircle, ShieldCheck, Sparkles, Target,
} from 'lucide-react'
import type { Course, DashboardSummary } from '../data/mock'
import { mockDashboardSummary } from '../data/mock'
import { fetchCourses, fetchDashboardSummary } from '../services/api'
import { CompetencyRow, CourseCard, MetricCard } from '../components/parts'
import { formatFullDate } from '../lib/format'

export function LearnerDashboard({ onOpenModal }: { onOpenModal: () => void }) {
  const [summary, setSummary] = useState<DashboardSummary>(mockDashboardSummary)
  const [courses, setCourses] = useState<Course[]>([])
  const [coursesLoading, setCoursesLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchDashboardSummary().then((data) => {
      if (!cancelled) setSummary(data)
    })
    fetchCourses().then((data) => {
      if (!cancelled) setCourses(data)
      setCoursesLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  return (
    <div className="page-container learner-dashboard">
      <div className="page-heading learner-heading">
        <div>
          <p className="eyebrow">Learner dashboard · {formatFullDate(new Date())}</p>
          <h1>Good morning, Ananya</h1>
          <p className="heading-copy">Senior Statistical Officer · Directorate of Industrial and Internal Trade</p>
        </div>
        <button className="button button-primary" onClick={onOpenModal}><BookOpen size={16} /> Browse learning catalogue</button>
      </div>

      <section className="learner-summary">
        <div className="summary-intro">
          <div className="summary-icon"><Award size={20} /></div>
          <div>
            <p className="eyebrow">Annual capability review · FY 2026–27</p>
            <h2>Your capability journey</h2>
            <p>Based on your latest self-assessment, supervisor inputs and completed learning activities.</p>
          </div>
        </div>
        <div className="summary-score">
          <span className="summary-score-label">Overall competency</span>
          <strong>{summary.overallCompetency}<span>/100</span></strong>
          <span className="score-change"><Activity size={12} /> 8 points since April</span>
        </div>
      </section>

      <section className="learner-metrics" aria-label="Learner summary metrics">
        <MetricCard label="Overall competency" value={`${summary.overallCompetency}%`} detail={`Above role benchmark · ${summary.benchmark}%`} tone="green" icon={<Target size={18} />} />
        <MetricCard label="Priority skill gaps" value={String(summary.prioritySkillGaps).padStart(2, '0')} detail="2 high-priority areas" tone="amber" icon={<Activity size={18} />} />
        <MetricCard label="Learning hours" value={String(summary.learningHours)} detail={`of ${summary.plannedHours} hours planned`} tone="blue" icon={<Clock3 size={18} />} />
        <MetricCard label="Courses completed" value={String(summary.coursesCompleted).padStart(2, '0')} detail="This financial year" tone="slate" icon={<ShieldCheck size={18} />} />
      </section>

      <div className="dashboard-columns">
        <section className="panel competency-panel">
          <div className="panel-header">
            <div><p className="eyebrow">Role-aligned capability framework</p><h2>Competency breakdown</h2></div>
            <button className="button button-secondary">View framework <ChevronRight size={14} /></button>
          </div>
          <p className="panel-description">Your proficiency across the competencies mapped to Senior Statistical Officer responsibilities.</p>
          <div className="competency-list">
            <CompetencyRow label="Survey Design" value="86%" level="Advanced" tone="green" benchmark="Role benchmark 78%" />
            <CompetencyRow label="Sampling" value="79%" level="Proficient" tone="green" benchmark="Role benchmark 75%" />
            <CompetencyRow label="Data Analysis" value="74%" level="Proficient" tone="green" benchmark="Role benchmark 72%" />
            <CompetencyRow label="Python" value="58%" level="Developing" tone="amber" benchmark="Role benchmark 65%" />
            <CompetencyRow label="AI / ML" value="42%" level="Foundational" tone="amber" benchmark="Role benchmark 55%" />
            <CompetencyRow label="GIS" value="38%" level="Foundational" tone="amber" benchmark="Role benchmark 48%" />
            <CompetencyRow label="Cybersecurity" value="91%" level="Advanced" tone="green" benchmark="Role benchmark 80%" />
          </div>
        </section>

        <section className="panel assessment-panel">
          <div className="panel-header">
            <div><p className="eyebrow">Latest checkpoint</p><h2>Recent assessment</h2></div>
            <button className="icon-button" aria-label="More assessment options"><MoreHorizontal size={19} /></button>
          </div>
          <div className="assessment-score">
            <div className="assessment-ring"><strong>82</strong><span>/ 100</span></div>
            <div><strong>National Sample Survey<br />Methods — Module 2</strong><span>Completed 28 Aug 2026</span><span className="badge badge-green">Passed</span></div>
          </div>
          <div className="assessment-stats">
            <div><strong>14 / 18</strong><span>Questions correct</span></div>
            <div><strong>38 min</strong><span>Time taken</span></div>
            <div><strong>+6</strong><span>Since last attempt</span></div>
          </div>
          <button className="button button-ghost assessment-link">Review assessment report <ChevronRight size={15} /></button>
        </section>
      </div>

      <div className="dashboard-columns lower-columns">
        <section className="panel course-panel">
          <div className="panel-header">
            <div><p className="eyebrow">Personalised for your role</p><h2>AI-recommended courses</h2></div>
            <button className="button button-secondary">View all <ChevronRight size={14} /></button>
          </div>
          <div className="course-list">
            {coursesLoading && <div className="admin-empty"><span>Loading recommendations…</span></div>}
            {!coursesLoading && courses.map((course) => (
              <CourseCard
                key={course.title}
                title={course.title}
                provider={course.provider}
                meta={course.meta}
                tag={course.tag}
                icon={<Activity size={17} />}
              />
            ))}
          </div>
        </section>

        <section className="panel progress-panel">
          <div className="panel-header">
            <div><p className="eyebrow">Your active plan</p><h2>Current learning progress</h2></div>
            <button className="icon-button" aria-label="More learning options"><MoreHorizontal size={19} /></button>
          </div>
          <div className="current-course">
            <div className="course-thumbnail"><PlayCircle size={23} /></div>
            <div><strong>Advanced Data Analysis with Python</strong><span>Module 3 of 6 · Last opened today</span></div>
          </div>
          <div className="progress-heading"><strong>46% complete</strong><span>2h 10m remaining</span></div>
          <div className="progress-track large-progress"><div className="progress-fill blue" style={{ width: '46%' }}></div></div>
          <div className="next-module">
            <span>Next module</span>
            <strong>Working with official survey microdata</strong>
            <button className="text-button">Continue <ChevronRight size={14} /></button>
          </div>
        </section>
      </div>

      <section className="recommendation-panel">
        <div className="recommendation-icon"><Sparkles size={20} /></div>
        <div className="recommendation-copy">
          <p className="eyebrow">Recommendation rationale</p>
          <h2>Why this course is recommended</h2>
          <p><strong>Python for Official Statistics</strong> is recommended because your role profile shows a 7-point gap against the Python benchmark, and your current learning plan includes analysis of large-scale enterprise survey datasets. Completing this course is expected to improve your ability to automate data validation and reproducible tabulation workflows.</p>
          <div className="reason-tags">
            <span><Check size={13} /> Matches role framework</span>
            <span><Check size={13} /> Addresses priority gap</span>
            <span><Check size={13} /> Supports current assignment</span>
          </div>
        </div>
        <button className="button button-primary recommendation-action">View course <ChevronRight size={15} /></button>
      </section>
    </div>
  )
}