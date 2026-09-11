import { useEffect, useState } from 'react'
import { Activity, BookOpen, Check, ChevronRight, LayoutGrid, Sparkles, Target } from 'lucide-react'
import type { Recommendation, RecommendationIcon } from '../data/mock'
import { fetchRecommendations } from '../services/api'
import { LearningRecommendation, ProgressionStep } from '../components/parts'

const sourceIcons = {
  activity: Activity,
  layout: LayoutGrid,
  target: Target,
  sparkles: Sparkles,
} satisfies Record<RecommendationIcon, typeof Activity>

export function LearningPath() {
  const [source, setSource] = useState<'all' | 'igot' | 'nssta'>('all')
  const [startedCourse, setStartedCourse] = useState('')
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchRecommendations().then((data) => {
      if (!cancelled) setRecommendations(data)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  const visibleRecommendations = source === 'all'
    ? recommendations
    : recommendations.filter((course) => course.source === source)

  return (
    <div className="page-container learning-page">
      <div className="learning-heading">
        <div>
          <p className="eyebrow">My learning · FY 2026–27</p>
          <h1>Personalized learning path</h1>
          <p className="heading-copy">A role-aligned sequence of learning from your current competency profile to your next professional target.</p>
        </div>
        <div className="path-status"><span className="status-dot"></span>Path updated today</div>
      </div>

      <section className="path-overview panel">
        <div className="path-overview-copy">
          <p className="eyebrow">Your progression plan</p>
          <h2>From capable practitioner to advanced statistical leader</h2>
          <p>Based on your role as Senior Statistical Officer, competency analysis and the NSSTA recommended training framework.</p>
        </div>
        <div className="path-stats">
          <div><strong>67%</strong><span>Current competency</span></div>
          <ChevronRight size={18} />
          <div><strong>82%</strong><span>Target competency</span></div>
          <div className="path-stat-meta"><span>Estimated pathway</span><strong>18–24 hours</strong></div>
        </div>
      </section>

      <section className="progression-panel panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Competency progression</p>
            <h2>Current state to target state</h2>
          </div>
          <span className="badge badge-blue">3 milestones</span>
        </div>
        <div className="progression-rail">
          <div className="rail-line"><div className="rail-complete"></div></div>
          <span className="progression-value value-first">67%</span>
          <span className="progression-value value-second">74%</span>
          <span className="progression-value value-target">82%</span>
          <ProgressionStep number="01" label="Current profile" detail="Developing in Python, AI / ML and GIS" tone="current" />
          <ProgressionStep number="02" label="Priority foundation" detail="Complete recommended foundation courses" tone="middle" />
          <ProgressionStep number="03" label="Role target" detail="Advanced statistical practice" tone="target" />
        </div>
      </section>

      <div className="learning-content-grid">
        <section className="panel recommendations-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Curated for your role</p>
              <h2>Recommended learning</h2>
            </div>
            <div className="source-tabs" role="tablist" aria-label="Learning sources">
              <button className={source === 'all' ? 'active' : ''} onClick={() => setSource('all')}>All recommendations</button>
              <button className={source === 'igot' ? 'active' : ''} onClick={() => setSource('igot')}>iGOT Karmayogi</button>
              <button className={source === 'nssta' ? 'active' : ''} onClick={() => setSource('nssta')}>NSSTA programme</button>
            </div>
          </div>

          {loading && (
            <div className="admin-empty">
              <span>Loading your learning recommendations…</span>
            </div>
          )}

          {!loading && (
            <div className="recommendation-list">
              {visibleRecommendations.map((course) => {
                const { icon, ...courseFields } = course
                const CourseIcon = sourceIcons[icon]
                return (
                  <LearningRecommendation
                    key={course.title}
                    {...courseFields}
                    icon={<CourseIcon size={18} />}
                    started={startedCourse === course.title}
                    onStart={() => setStartedCourse(course.title)}
                  />
                )
              })}
            </div>
          )}
        </section>

        <aside className="panel pathway-aside">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Pathway summary</p>
              <h2>Your next steps</h2>
            </div>
            <BookOpen size={19} className="pathway-icon" />
          </div>
          <div className="pathway-step done"><span><Check size={13} /></span><div><strong>Competency profile analysed</strong><small>Completed today</small></div></div>
          <div className="pathway-step active"><span>2</span><div><strong>Close priority skill gaps</strong><small>2 courses recommended</small></div></div>
          <div className="pathway-step"><span>3</span><div><strong>Reassess competency</strong><small>After 30 days of learning</small></div></div>
          <div className="pathway-note"><Sparkles size={15} /><p>Recommendations are refreshed when your assessment results or role responsibilities change.</p></div>
        </aside>
      </div>
    </div>
  )
}