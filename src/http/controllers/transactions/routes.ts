import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'

import { history } from './history'
import { metrics } from './metrics'
import { create } from './create'

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/transactions/history', history)
  app.get('/transactions/metrics', metrics)

  app.post('/transactions', create)
}
