import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
import { AuthGuard } from '@decorations/auth/auth.guard'
import { CurrentUser } from '@decorations/auth/current-user.decorator'
import { RequestUser } from '@modules/auth/auth.types'

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
      service: 'api-app',
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Return the authenticated user profile and roles' })
  me(@CurrentUser() user: RequestUser) {
    return user
  }
}
