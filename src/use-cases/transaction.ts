import { Transaction } from '@prisma/client'
import { TransactionsRepository } from '@/repositories/transactions-repository'

interface TransactionUseCaseRequest {
  userId: string
  description: string
  type: string
  price: number
  category: string
}

interface TransactionUseCaseResponse {
  transaction: Transaction
}

export class TransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
    description,
    type,
    price,
    category,
  }: TransactionUseCaseRequest): Promise<TransactionUseCaseResponse> {
    const transaction = await this.transactionsRepository.create({
      user_id: userId,
      description,
      type,
      price,
      category,
    })

    return {
      transaction,
    }
  }
}
