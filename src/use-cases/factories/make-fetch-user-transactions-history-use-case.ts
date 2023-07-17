import { FetchUserTransactionsHistoryUseCase } from '../fetch-user-transactions-history'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'

export function makeFetchUserTransactionsHistoryUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const useCase = new FetchUserTransactionsHistoryUseCase(
    transactionsRepository,
  )

  return useCase
}
