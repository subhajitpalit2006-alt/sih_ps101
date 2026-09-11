import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity, Bell, BookOpen, Check, ChevronDown, ChevronRight, CircleHelp, Clock3,
  FileBarChart, Flame, Home, LayoutGrid, Menu, Search, Settings, ShieldCheck,
  Sparkles, Users, X,
} from 'lucide-react'
import type { SearchEntry } from './data/mock'
import { fetchSearchIndex } from './services/api'
import { AccessPrivacyDialog, Modal, NavItem } from './components/parts'
import { LearnerDashboard } from './pages/Dashboard'
import { LearningPath } from './pages/LearningPath'
import { AssessmentEngine } from './pages/Assessment'
import { CompetencyAnalysis } from './pages/Competency'
import { OfficerDirectory } from './pages/Directory'
import { PlatformSettings } from './pages/Settings'
import './App.css'

function App() {
  return <BrowserRouter><AppShell /></BrowserRouter>
}

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(true)
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [accessOpen, setAccessOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchIndex, setSearchIndex] = useState<SearchEntry[]>([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!toastVisible) return
    const timer = window.setTimeout(() => setToastVisible(false), 4500)
    return () => window.clearTimeout(timer)
  }, [toastVisible])

  useEffect(() => {
    let cancelled = false
    fetchSearchIndex().then((entries) => {
      if (!cancelled) setSearchIndex(entries)
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const handleNotificationAction = (event: Event) => {
      const item = (event.target as HTMLElement).closest('.notification-item')
      if (!item) return
      setNotificationsOpen(false)
      navigate(item.textContent?.includes('Competency profile') ? '/skills' : '/learning')
    }
    document.addEventListener('click', handleNotificationAction)
    return () => document.removeEventListener('click', handleNotificationAction)
  }, [navigate])

  useEffect(() => {
    const handleAccessAction = (event: Event) => {
      const button = (event.target as HTMLElement).closest('button')
      if (button?.textContent?.includes('Access and privacy')) {
        setProfileOpen(false)
        setAccessOpen(true)
      }
    }
    document.addEventListener('click', handleAccessAction)
    return () => document.removeEventListener('click', handleAccessAction)
  }, [])

  const trimmedQuery = searchQuery.trim()
  const searchResults = trimmedQuery
    ? searchIndex.filter((entry) => `${entry.label} ${entry.sublabel}`.toLowerCase().includes(trimmedQuery.toLowerCase()))
    : []

  const runSearch = () => {
    if (!trimmedQuery) return
    const query = trimmedQuery.toLowerCase()
    const match = searchIndex.find((entry) => entry.label.toLowerCase().includes(query))
    if (match) {
      setSearchQuery('')
      navigate(match.route)
    }
  }

  const searchIcon = (route: string) => {
    if (route === '/skills') return <LayoutGrid size={14} />
    if (route === '/assessment') return <Sparkles size={14} />
    if (route === '/learning') return <BookOpen size={14} />
    if (route === '/directory') return <Users size={14} />
    if (route === '/settings') return <Settings size={14} />
    return <Home size={14} />
  }

  const breadcrumbLabel =
    location.pathname === '/skills' ? 'AI competency analysis'
    : location.pathname === '/learning' ? 'Personalized learning path'
    : location.pathname === '/assessment' ? 'AI assessment engine'
    : location.pathname === '/directory' ? 'Officer directory'
    : location.pathname === '/settings' ? 'Settings'
    : 'Learner dashboard'

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><Flame className="brand-flame" size={19} strokeWidth={2.2} /><Sparkles className="brand-spark" size={10} strokeWidth={2.5} /></div>
          <div><strong>STARTA<span>FORGE</span></strong><small>Official Statistics Learning</small></div>
        </div>
        <div className="workspace-menu-wrap">
          <button className="workspace-switcher" aria-expanded={workspaceOpen} onClick={() => { setWorkspaceOpen(!workspaceOpen); setProfileOpen(false) }}>
            <span className="avatar avatar-saffron">AS</span>
            <div><strong>Dr. Ananya Sharma</strong><small>MoSPI · Directorate</small></div>
            <ChevronDown size={15} />
          </button>
          {workspaceOpen && (
            <div className="popover workspace-popover">
              <p className="popover-label">Current workspace</p>
              <button className="workspace-option selected"><span className="avatar avatar-saffron">AS</span><span><strong>DIID · MoSPI</strong><small>Directorate workspace</small></span><Check size={14} /></button>
              <button className="workspace-option" onClick={() => { setWorkspaceOpen(false); setToastVisible(true) }}><span className="avatar avatar-navy">NS</span><span><strong>NSO · MoSPI</strong><small>National Statistics Office</small></span></button>
            </div>
          )}
        </div>
        <nav className="side-nav" aria-label="Primary navigation" onClick={() => setSidebarOpen(false)}>
          <p className="nav-label">Workspace</p>
          <NavItem to="/" icon={<Home size={17} />} label="Overview" end />
          <NavItem to="/learning" icon={<BookOpen size={17} />} label="My learning" />
          <NavItem to="/skills" icon={<LayoutGrid size={17} />} label="Skill intelligence" />
          <NavItem to="/assessment" icon={<Sparkles size={17} />} label="Assessment engine" />
          <NavItem to="/reports" icon={<FileBarChart size={17} />} label="Reports" />
          <p className="nav-label nav-label-spaced">Administration</p>
          <NavItem to="/directory" icon={<Users size={17} />} label="Officer directory" />
          <NavItem to="/settings" icon={<Settings size={17} />} label="Settings" />
        </nav>
        <div className="sidebar-footer">
          <button className="help-link" onClick={() => setHelpOpen(true)}><CircleHelp size={17} /><span>Help &amp; guidance</span></button>
          <div className="version"><span className="status-dot"></span>Prototype v0.1 · NIC hosted</div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu size={20} /></button>
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{breadcrumbLabel}</strong></div>
          <div className="topbar-actions">
            <div className="topbar-search">
              <Search size={17} />
              <input
                aria-label="Search"
                placeholder="Search learning, skills or reports"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => { if (event.key === 'Enter') runSearch() }}
              />
              <button className="search-submit" aria-label="Run search" onClick={runSearch}><ChevronRight size={14} /></button>
              {trimmedQuery && (
                <div className="search-results">
                  <p>{searchResults.length ? 'Search results' : 'No results'}</p>
                  {searchResults.length === 0 && (
                    <div className="admin-empty">
                      <span>Nothing matches "{trimmedQuery}". Try a course, skill or officer.</span>
                    </div>
                  )}
                  {searchResults.map((result) => (
                    <button key={`${result.label}:${result.route}`} onClick={() => { setSearchQuery(''); navigate(result.route) }}>
                      {searchIcon(result.route)}
                      <span><strong>{result.label}</strong><small>{result.sublabel}</small></span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="popover-wrap">
              <button className="icon-button notification-button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false) }}>
                <Bell size={18} /><span className="notification-dot"></span>
              </button>
              {notificationsOpen && (
                <div className="popover notification-popover">
                  <div className="popover-heading"><strong>Notifications</strong><button onClick={() => setNotificationsOpen(false)}>Mark read</button></div>
                  <div className="notification-item"><span className="notification-icon"><Activity size={14} /></span><span><strong>Competency profile updated</strong><small>Today · Your latest assessment is now reflected.</small></span></div>
                  <div className="notification-item"><span className="notification-icon amber"><Clock3 size={14} /></span><span><strong>Learning reminder</strong><small>Python for Official Statistics is due this month.</small></span></div>
                </div>
              )}
            </div>
            <div className="popover-wrap">
              <button className="topbar-profile" aria-expanded={profileOpen} onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false) }}>
                <span className="avatar avatar-navy">AS</span><ChevronDown size={15} />
              </button>
              {profileOpen && (
                <div className="popover profile-popover">
                  <div className="profile-popover-header"><span className="avatar avatar-navy">AS</span><span><strong>Dr. Ananya Sharma</strong><small>Senior Statistical Officer</small></span></div>
                  <button onClick={() => { setProfileOpen(false); navigate('/settings') }}><Settings size={14} /> Account settings</button>
                  <button onClick={() => setProfileOpen(false)}><ShieldCheck size={14} /> Access and privacy</button>
                  <button className="profile-signout" onClick={() => setProfileOpen(false)}>Sign out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/skills" element={<CompetencyAnalysis />} />
          <Route path="/learning" element={<LearningPath />} />
          <Route path="/assessment" element={<AssessmentEngine />} />
          <Route path="/directory" element={<OfficerDirectory />} />
          <Route path="/settings" element={<PlatformSettings />} />
          <Route path="*" element={<LearnerDashboard onOpenModal={() => setModalOpen(true)} />} />
        </Routes>
      </main>

      {toastVisible && (
        <div className="toast" role="status">
          <div className="toast-icon"><Check size={15} /></div>
          <div><strong>Learning record synced</strong><span>Your competency profile is up to date.</span></div>
          <button className="toast-close" aria-label="Dismiss notification" onClick={() => setToastVisible(false)}><X size={15} /></button>
        </div>
      )}
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
      {helpOpen && (
        <div className="help-backdrop" onClick={() => setHelpOpen(false)}>
          <aside className="help-drawer" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="help-drawer-header">
              <div><p className="eyebrow">Support centre</p><h2>Help &amp; guidance</h2></div>
              <button className="icon-button" aria-label="Close help" onClick={() => setHelpOpen(false)}><X size={18} /></button>
            </div>
            <p>Find guidance for using SkillSetu and managing your learning record.</p>
            <button className="help-topic"><CircleHelp size={16} /><span><strong>Using your dashboard</strong><small>Understand competency scores and progress.</small></span><ChevronRight size={15} /></button>
            <button className="help-topic"><BookOpen size={16} /><span><strong>Learning and assessments</strong><small>Get help with courses and knowledge checks.</small></span><ChevronRight size={15} /></button>
            <button className="help-topic"><Users size={16} /><span><strong>Contact your administrator</strong><small>Reach your departmental learning coordinator.</small></span><ChevronRight size={15} /></button>
            <div className="help-contact"><strong>Need more support?</strong><span>Submit a request through your departmental helpdesk.</span></div>
          </aside>
        </div>
      )}
      {accessOpen && <AccessPrivacyDialog onClose={() => setAccessOpen(false)} />}
    </div>
  )
}

export default App