import { makeFetchUserTransactionsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-transactions-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const fetchUserTransactionsHistory = makeFetchUserTransactionsHistoryUseCase()

  const { transactions } = await fetchUserTransactionsHistory.execute({
    userId: request.user.sub,
  })

  return reply.code(200).send({
    transactions,
  })
}
