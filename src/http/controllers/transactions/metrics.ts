import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { transactionsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.code(200).send({
    transactionsCount,
  })
}
