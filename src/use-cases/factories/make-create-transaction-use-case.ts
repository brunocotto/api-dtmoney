import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { TransactionUseCase } from '../transaction'

export function makeCreateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const useCase = new TransactionUseCase(transactionsRepository)

  return useCase
}
