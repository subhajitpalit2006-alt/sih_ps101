import { Router } from 'express'
import { store } from './store.js'

export const healthRouter = Router()

healthRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export const apiRouter = Router()

apiRouter.get('/summary', (_req, res) => {
  res.json(store.dashboardSummary())
})

apiRouter.get('/courses', (_req, res) => {
  res.json(store.courses())
})

apiRouter.get('/recommendations', (_req, res) => {
  res.json(store.recommendations())
})

apiRouter.get('/officers', (_req, res) => {
  res.json(store.officers())
})

apiRouter.get('/assessment/questions', (_req, res) => {
  res.json(store.assessmentQuestions())
})

apiRouter.get('/search', (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : ''
  const entries = store.searchEntries()
  if (!q) {
    res.json(entries)
    return
  }
  res.json(
    entries.filter(
      (entry) =>
        entry.label.toLowerCase().includes(q) ||
        entry.sublabel.toLowerCase().includes(q),
    ),
  )
})