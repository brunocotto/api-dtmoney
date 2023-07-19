import { makeCreateTransactionUseCase } from '@/use-cases/factories/make-create-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTransactionBodySchema = z.object({
    description: z.string(),
    category: z.string(),
    price: z.number(),
    type: z.string(),
  })
  const { description, category, price, type } =
    createTransactionBodySchema.parse(request.body)

  // Acessando o ID do usuário a partir das informações do usuário no token
  // isso aqui foi nostálgico!
  const userId = request.user.sub

  const createTransactionUseCase = makeCreateTransactionUseCase()

  const { transaction } = await createTransactionUseCase.execute({
    userId,
    description,
    category,
    price,
    type,
  })

  return reply.code(201).send({
    transaction: {
      ...transaction,
      user_id: undefined,
    },
  })
}
