import { TransactionsRepository } from '@/repositories/transactions-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  transactionsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const transactionsCount = await this.transactionsRepository.countByUserId(
      userId,
    )

    return {
      transactionsCount,
    }
  }
}
