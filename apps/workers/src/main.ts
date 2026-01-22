import { logger } from '@justdx/logger'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.init()
  logger.info('🔄 Workers service initialized and ready')
  logger.info('📋 Listening for jobs...')
}
bootstrap()
