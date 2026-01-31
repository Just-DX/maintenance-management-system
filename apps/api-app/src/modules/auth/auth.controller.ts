import { AuthGuard } from '@decorations/auth/auth.guard'
import { CurrentUser } from '@decorations/auth/current-user.decorator'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import type { RequestUser } from './auth.types'
import { AuthCallbackDto } from './dto/callback.dto'
import { OAuthLoginDto, OAuthLoginResponseDto } from './dto/oauth.dto'
import { SignInDto, SignInResponseDto, SignOutResponseDto } from './dto/signin.dto'
import { SignupDto, SignupResponseDto } from './dto/signup.dto'
import { UserDto } from './dto/user.dto'

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

  @Post('callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete OAuth/email callback' })
  @ApiOkResponse({ type: SignInResponseDto })
  async callback(@Body() body: AuthCallbackDto) {
    const { user, session } = await this.authService.signInWithCallback(body)
    return {
      user,
      sessionExpiresAt: session.expires_at ?? null,
      accessToken: session.access_token,
      refreshToken: session.refresh_token || null,
    }
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiOkResponse({ type: SignInResponseDto })
  async signIn(@Body() body: SignInDto) {
    const { user, session } = await this.authService.signInWithPassword(body)
    return {
      user,
      sessionExpiresAt: session.expires_at ?? null,
      accessToken: session.access_token,
      refreshToken: session.refresh_token || null,
    }
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

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Return the authenticated user profile and roles' })
  @ApiOkResponse({ type: UserDto })
  me(@CurrentUser() user: RequestUser) {
    const { raw: _raw, ...safeUser } = user
    return safeUser
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign out' })
  @ApiOkResponse({ type: SignOutResponseDto })
  async signOut() {
    return { success: true }
  }
}
