import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'
import { prisma } from '@/database/prisma'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async findManyByUserId(userId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
    })

    return transactions
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.transaction.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async create(
    data: Prisma.TransactionUncheckedCreateInput,
  ): Promise<Transaction> {
    const transaction = await prisma.transaction.create({
      data,
    })

    return transaction
  }
}
