import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get welcome message' })
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api-admin',
    }
  }
}
