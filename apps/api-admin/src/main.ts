import { logger } from '@justdx/logger'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors()

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Maintenance Management System - Admin API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 4001
  await app.listen(port)
  logger.info(`🚀 Admin API running on http://localhost:${port}`)
  logger.info(`📚 Swagger docs at http://localhost:${port}/api`)
}
bootstrap()
