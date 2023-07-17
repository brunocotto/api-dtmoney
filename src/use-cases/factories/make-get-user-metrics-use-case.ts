import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'

export function makeGetUserMetricsUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const useCase = new GetUserMetricsUseCase(transactionsRepository)

  return useCase
}
