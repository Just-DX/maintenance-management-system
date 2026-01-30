import { config as loadEnv } from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

loadEnv()

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) throw new Error('DATABASE_URL is not set')

/**
 * Prisma client factory
 * Prevents multiple instances in development (hot reload)
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: databaseUrl,
    }),
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

export * from './generated/prisma/client'
export { PrismaClient }
