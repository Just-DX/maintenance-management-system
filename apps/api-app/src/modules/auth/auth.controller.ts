import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { OAuthLoginDto, OAuthLoginResponseDto } from './dto/oauth.dto'
import { SignupDto, SignupResponseDto } from './dto/signup.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user (Supabase + local profile)' })
  @ApiCreatedResponse({ type: SignupResponseDto })
  async signup(@Body() body: SignupDto) {
    const { email, password, fullName, username } = body
    return this.authService.signup({ email, password, fullName, username })
  }

  @Post('login/google')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Google OAuth login URL' })
  @ApiOkResponse({ type: OAuthLoginResponseDto })
  async loginWithGoogle(@Body() body: OAuthLoginDto) {
    return this.authService.getGoogleLoginUrl(body)
  }

  @Post('login/github')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get GitHub OAuth login URL' })
  @ApiOkResponse({ type: OAuthLoginResponseDto })
  async loginWithGithub(@Body() body: OAuthLoginDto) {
    return this.authService.getGithubLoginUrl(body)
  }
}
