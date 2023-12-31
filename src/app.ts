import fastify from 'fastify'

import { fastifyCors } from '@fastify/cors'
import { fastifyCookie } from '@fastify/cookie'

import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { transactionsRoutes } from './http/controllers/transactions/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(fastifyCors, {
  // Opções de configuração do CORS, se necessário
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'ETag'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
})

app.register(usersRoutes)
app.register(transactionsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .code(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // ferramenta de logs
  }

  return reply.code(500).send({ message: 'Internal server error.' })
})
