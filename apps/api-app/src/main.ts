import 'reflect-metadata'

import { logger } from '@justdx/logger'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  })

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  )

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Main App API')
    .setDescription('Maintenance Management System - Main App API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 4002
  await app.listen(port)
  logger.info(`🚀 Main App API running on http://localhost:${port}`)
  logger.info(`📚 Swagger docs at http://localhost:${port}/api`)
}
bootstrap()
