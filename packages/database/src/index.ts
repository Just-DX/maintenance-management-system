// @justdx/database - Prisma client wrapper
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Prisma client factory
 * Prevents multiple instances in development (hot reload)
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

/**
 * Get Prisma client instance
 * Use this for serverless environments
 */
export function getPrisma(): PrismaClient {
  return prisma
}

export * from '@prisma/client'
export { PrismaClient }
