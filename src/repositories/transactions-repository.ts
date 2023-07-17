import { Prisma, Transaction } from '@prisma/client'

export interface TransactionsRepository {
  findManyByUserId(userId: string): Promise<Transaction[]>
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
}
