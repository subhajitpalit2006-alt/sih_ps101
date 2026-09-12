import cors from 'cors'
import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import { apiRouter, healthRouter } from './routes.js'

function parseCorsOrigins(raw: string | undefined): string | string[] {
  if (!raw || raw.trim() === '' || raw.trim() === '*') {
    return '*'
  }
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

function getHttpStatus(err: unknown): number {
  const candidate = (err as { status?: unknown; statusCode?: unknown }).status ?? (err as { statusCode?: unknown }).statusCode
  return typeof candidate === 'number' && candidate >= 400 && candidate < 600 ? candidate : 500
}

function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const status = getHttpStatus(err)
  if (status >= 500) {
    console.error(err)
  }
  res.status(status).json({ error: status >= 500 ? 'Internal server error' : (err as Error).message })
}

export function createApp(): express.Express {
  const app = express()

  app.disable('x-powered-by')
  app.use(cors({ origin: parseCorsOrigins(process.env.CORS_ORIGIN) }))
  app.use(express.json())

  app.use(healthRouter)
  app.use('/api', apiRouter)

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  app.use(errorHandler)

  return app
}