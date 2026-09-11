import { useEffect, useMemo, useState } from 'react'
import { Search, Users } from 'lucide-react'
import type { Officer } from '../data/mock'
import { fetchOfficers } from '../services/api'

export function OfficerDirectory() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [officers, setOfficers] = useState<Officer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchOfficers().then((data) => {
      if (!cancelled) setOfficers(data)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  const filteredOfficers = useMemo(() =>
    officers.filter((officer) =>
      `${officer.name} ${officer.department} ${officer.designation}`.toLowerCase().includes(query.toLowerCase()) &&
      (statusFilter === 'all' || officer.status === statusFilter)
    ),
    [officers, query, statusFilter]
  )

  return (
    <div className="page-container admin-page">
      <div className="admin-heading">
        <div>
          <p className="eyebrow">Administration · Capability oversight</p>
          <h1>Officer directory</h1>
          <p className="heading-copy">View officers in your administrative scope and their latest competency status.</p>
        </div>
        <span className="directory-count">{loading ? 'Loading…' : `${filteredOfficers.length} of ${officers.length} officers shown`}</span>
      </div>

      <section className="panel directory-toolbar">
        <div className="directory-search">
          <Search size={16} />
          <input
            aria-label="Search officers"
            placeholder="Search by name, department or designation"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <select
          className="text-input directory-filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All competency statuses</option>
          <option>On track</option>
          <option>Learning active</option>
          <option>Needs review</option>
        </select>
      </section>

      <section className="panel directory-table-panel">
        <div className="admin-table-header">
          <div>
            <p className="eyebrow">Current roster</p>
            <h2>Officers and competency status</h2>
          </div>
          <span className="badge badge-grey">{loading ? 'Loading…' : 'Live roster data'}</span>
        </div>

        <div className="directory-table">
          <div className="directory-row directory-row-header">
            <span>Officer</span>
            <span>Designation</span>
            <span>Department</span>
            <span>Competency</span>
            <span>Status</span>
          </div>

          {loading && (
            <div className="admin-empty">
              <span>Fetching latest officer roster…</span>
            </div>
          )}

          {!loading && filteredOfficers.map((officer) => (
            <div className="directory-row" key={officer.name}>
              <div className="officer-name">
                <span className="avatar avatar-saffron">{officer.initials}</span>
                <strong>{officer.name}</strong>
              </div>
              <span>{officer.designation}</span>
              <span>{officer.department}</span>
              <strong>{officer.competency}</strong>
              <span className={`directory-status ${officer.status === 'Needs review' ? 'review' : officer.status === 'Learning active' ? 'active' : ''}`}>
                {officer.status}
              </span>
            </div>
          ))}

          {!loading && filteredOfficers.length === 0 && (
            <div className="admin-empty">
              <Users size={19} />
              <strong>No officers match this search</strong>
              <span>Try a different name, department or designation.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

