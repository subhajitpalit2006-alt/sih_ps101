import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import request from 'supertest'
import { createApp } from './app.js'

const app = createApp()

describe('health endpoint', () => {
  it('responds with ok on /health', async () => {
    const response = await request(app).get('/health')
    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { status: 'ok' })
  })
})

describe('GET /api collection endpoints', () => {
  for (const [path, keys, length] of [
    ['/api/officers', ['initials', 'name', 'designation', 'department', 'competency', 'status'], 4],
    ['/api/courses', ['title', 'provider', 'meta', 'tag'], 3],
    ['/api/recommendations', ['source', 'title', 'provider', 'duration', 'difficulty', 'skills', 'reason', 'progress', 'action', 'icon'], 4],
    ['/api/assessment/questions', ['question', 'options', 'answer', 'explanation', 'difficulty', 'topic'], 4],
  ] as const) {
    it(`GET ${path} returns ${length} entries with expected shape`, async () => {
      const response = await request(app).get(path)
      assert.equal(response.status, 200)
      assert.ok(Array.isArray(response.body))
      assert.equal(response.body.length, length)
      assert.deepEqual(Object.keys(response.body[0]).sort(), [...keys].sort())
    })
  }
})

describe('GET /api/summary', () => {
  it('returns the dashboard summary shape', async () => {
    const response = await request(app).get('/api/summary')
    assert.equal(response.status, 200)
    assert.deepEqual(Object.keys(response.body).sort(), [
      'benchmark',
      'coursesCompleted',
      'learningHours',
      'overallCompetency',
      'plannedHours',
      'prioritySkillGaps',
    ])
  })
})

describe('GET /api/search', () => {
  it('returns the full index without a query', async () => {
    const response = await request(app).get('/api/search')
    assert.equal(response.status, 200)
    assert.equal(response.body.length, 13)
  })

  it('filters entries case-insensitively with ?q', async () => {
    const response = await request(app).get('/api/search?q=Python')
    assert.equal(response.status, 200)
    assert.ok(response.body.length > 0)
    for (const entry of response.body) {
      assert.match(`${entry.label} ${entry.sublabel}`.toLowerCase(), /python/)
    }
  })
})

describe('error handling', () => {
  it('returns JSON 404 for unknown routes', async () => {
    const response = await request(app).get('/api/nope')
    assert.equal(response.status, 404)
    assert.deepEqual(response.body, { error: 'Not found' })
  })

  it('returns JSON 400 for malformed JSON bodies', async () => {
    const response = await request(app)
      .post('/api/anything')
      .set('Content-Type', 'application/json')
      .send('{"broken":')
    assert.equal(response.status, 400)
    assert.equal(typeof response.body.error, 'string')
  })
})

describe('CORS', () => {
  it('allows all origins by default', async () => {
    const response = await request(app)
      .options('/api/officers')
      .set('Origin', 'http://localhost:5173')
      .set('Access-Control-Request-Method', 'GET')
    assert.equal(response.status, 204)
    assert.equal(response.headers['access-control-allow-origin'], '*')
  })
})