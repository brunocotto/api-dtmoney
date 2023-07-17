import { Transaction } from '@prisma/client'
import { TransactionsRepository } from '@/repositories/transactions-repository'

interface FetchUserTransactionsHistoryUseCaseRequest {
  userId: string
}

interface FetchUserTransactionsHistoryUseCaseResponse {
  transactions: Transaction[]
}

export class FetchUserTransactionsHistoryUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
  }: FetchUserTransactionsHistoryUseCaseRequest): Promise<FetchUserTransactionsHistoryUseCaseResponse> {
    const transactions = await this.transactionsRepository.findManyByUserId(
      userId,
    )

    return {
      transactions,
    }
  }
}
