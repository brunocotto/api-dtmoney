import { makeCreateTransactionUseCase } from '@/use-cases/factories/make-create-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTransactionBodySchema = z.object({
    userId: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    type: z.string(),
  })
  const { userId, description, category, price, type } =
    createTransactionBodySchema.parse(request.body)

  const createTransactionUseCase = makeCreateTransactionUseCase()

  await createTransactionUseCase.execute({
    userId,
    description,
    category,
    price,
    type,
  })

  return reply.code(201).send()
}
