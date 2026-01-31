import { SupabaseService } from '@modules/supabase/supabase.service'
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { CookieOptions, Response } from 'express'
import type { Session, User } from '@supabase/supabase-js'
import { SignupDto } from './dto/signup.dto'
import { SignInDto } from './dto/signin.dto'
import { UserRepository } from './repositories/auth.repository'
import { AUTH_ACCESS_TOKEN_COOKIE, AUTH_REFRESH_TOKEN_COOKIE } from './auth.constants'
import { AuthCallbackDto } from './dto/callback.dto'

type OAuthInput = {
  redirectTo: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly userRepo: UserRepository,
    private readonly configService: ConfigService
  ) {}

  async signup(input: SignupDto) {
    const { email, password, fullName } = input
    const username = input.username

    const [existingEmail, existingUsername] = await Promise.all(
      [this.userRepo.findByEmail(email), this.userRepo.findByUsername(username)].filter(Boolean)
    )

    if (existingEmail) {
      throw new ConflictException('Email already registered')
    }

    if (existingUsername) {
      throw new ConflictException('Username already taken')
    }

    const { data, error } = await this.supabaseService.createUser({
      email,
      password,
      user_metadata: { fullName },
    })

    if (error) {
      if (error.message?.toLowerCase().includes('duplicate')) {
        throw new ConflictException('Email already registered')
      }
      throw new BadRequestException(error.message)
    }

    const user = data.user

    if (!user) {
      throw new InternalServerErrorException('Unable to create user')
    }

    const profile = await this.userRepo.upsertUserProfile({
      id: user.id,
      email,
      fullName,
      username,
    })

    return this.formatUser(profile)
  }

  async signInWithPassword(input: SignInDto) {
    const { email, password } = input
    const { data, error } = await this.supabaseService.signInWithPassword(email, password)

    if (error) {
      throw new UnauthorizedException(error.message)
    }

    const session = data.session
    const user = data.user

    if (!session || !user) {
      throw new InternalServerErrorException('Unable to create session')
    }

    const profile = await this.userRepo.findByIdWithRoles(user.id)

    if (!profile) {
      throw new UnauthorizedException('User record not found')
    }

    if (!profile.isActive || profile.isDeleted) {
      throw new UnauthorizedException('User is inactive or deleted')
    }

    return {
      user: this.formatUser(profile),
      session,
    }
  }

  async signInWithCallback(input: AuthCallbackDto) {
    const { accessToken, refreshToken, expiresAt, expiresIn } = input

    const supabaseUser = await this.supabaseService.validateAccessToken(accessToken)
    if (!supabaseUser) {
      throw new UnauthorizedException('Invalid or expired token')
    }

    const profile = await this.ensureProfileForOAuthUser(supabaseUser)

    if (!profile) {
      throw new UnauthorizedException('User record not found')
    }

    if (!profile.isActive || profile.isDeleted) {
      throw new UnauthorizedException('User is inactive or deleted')
    }

    const session: Session = {
      access_token: accessToken,
      refresh_token: refreshToken ?? '',
      token_type: 'bearer',
      expires_in: typeof expiresIn === 'number' ? expiresIn : 0,
      expires_at: typeof expiresAt === 'number' ? expiresAt : undefined,
      user: supabaseUser,
    }

    return {
      user: this.formatUser(profile),
      session,
    }
  }

  setAuthCookies(response: Response, session: Session) {
    const accessMaxAgeMs =
      typeof session.expires_in === 'number' ? session.expires_in * 1000 : undefined
    const refreshMaxAgeMs = this.getRefreshTokenMaxAgeMs()

    response.cookie(
      AUTH_ACCESS_TOKEN_COOKIE,
      session.access_token,
      this.getCookieOptions(accessMaxAgeMs)
    )
    if (session.refresh_token) {
      response.cookie(
        AUTH_REFRESH_TOKEN_COOKIE,
        session.refresh_token,
        this.getCookieOptions(refreshMaxAgeMs)
      )
    }
  }

  clearAuthCookies(response: Response) {
    response.clearCookie(AUTH_ACCESS_TOKEN_COOKIE, this.getCookieOptions())
    response.clearCookie(AUTH_REFRESH_TOKEN_COOKIE, this.getCookieOptions())
  }

  async getGoogleLoginUrl(input: OAuthInput) {
    if (!input.redirectTo) throw new BadRequestException('redirectTo is required')
    const url = await this.supabaseService.getOAuthSignInUrl('google', input.redirectTo)
    return { url }
  }

  async getGithubLoginUrl(input: OAuthInput) {
    if (!input.redirectTo) throw new BadRequestException('redirectTo is required')
    const url = await this.supabaseService.getOAuthSignInUrl('github', input.redirectTo)
    return { url }
  }

  private formatUser(profile: {
    id: string
    email: string
    fullName: string | null
    avatar: string | null
    userRoles?: Array<{
      siteId: string
      roleId: string
      role: { code: string; name: string }
    }>
  }) {
    return {
      id: profile.id,
      email: profile.email,
      fullName: profile.fullName,
      avatar: profile.avatar ?? null,
      roles:
        profile.userRoles?.map((userRole) => ({
          siteId: userRole.siteId,
          roleId: userRole.roleId,
          code: userRole.role.code,
          name: userRole.role.name,
        })) ?? [],
    }
  }

  private async ensureProfileForOAuthUser(supabaseUser: User) {
    const existing = await this.userRepo.findByIdWithRoles(supabaseUser.id)
    if (existing) return existing

    const email = supabaseUser.email?.trim()
    if (!email) {
      throw new BadRequestException('OAuth provider did not supply an email address')
    }

    const metadata = (supabaseUser as { user_metadata?: Record<string, unknown> }).user_metadata ?? {}
    const rawFullName = this.pickFirstString(
      metadata.full_name,
      metadata.fullName,
      metadata.name,
      metadata.user_name,
      metadata.username
    )

    const fullName = this.normalizeFullName(rawFullName ?? email.split('@')[0] ?? 'User')
    const usernameBase =
      this.pickFirstString(
        metadata.preferred_username,
        metadata.user_name,
        metadata.username,
        metadata.login
      ) ?? email.split('@')[0]

    const username = await this.getAvailableUsername(usernameBase ?? 'user')
    const avatar = this.pickFirstString(
      metadata.avatar_url,
      metadata.picture,
      metadata.avatar,
      metadata.profile_image_url
    )

    return this.userRepo.upsertUserProfile({
      id: supabaseUser.id,
      email,
      fullName,
      username,
      avatar,
    })
  }

  private pickFirstString(...values: Array<unknown>) {
    for (const value of values) {
      if (typeof value === 'string' && value.trim().length > 0) {
        return value.trim()
      }
    }
    return null
  }

  private normalizeFullName(value: string) {
    const trimmed = value.trim()
    if (!trimmed) return 'User'
    return trimmed.length > 80 ? trimmed.slice(0, 80) : trimmed
  }

  private async getAvailableUsername(raw: string) {
    const base = this.normalizeUsername(raw)
    const candidate = base.length >= 3 ? base : `user${this.randomDigits(4)}`

    if (!(await this.userRepo.findByUsername(candidate))) {
      return candidate
    }

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const suffix = this.randomDigits(4)
      const trimmed = candidate.slice(0, Math.max(3, 30 - (suffix.length + 1)))
      const proposed = `${trimmed}_${suffix}`
      if (!(await this.userRepo.findByUsername(proposed))) {
        return proposed
      }
    }

    const fallbackSuffix = Date.now().toString().slice(-5)
    const fallbackBase = candidate.slice(0, Math.max(3, 30 - (fallbackSuffix.length + 1)))
    return `${fallbackBase}_${fallbackSuffix}`
  }

  private normalizeUsername(value: string) {
    const cleaned = value
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '')

    if (cleaned.length <= 30) return cleaned
    return cleaned.slice(0, 30)
  }

  private randomDigits(length: number) {
    const digits = Math.floor(Math.random() * Math.pow(10, length))
    return digits.toString().padStart(length, '0')
  }

  private getRefreshTokenMaxAgeMs() {
    const envValue = this.configService.get<string>('AUTH_REFRESH_TOKEN_TTL_DAYS')
    const ttlDays = envValue ? Number(envValue) : 30
    if (!Number.isFinite(ttlDays) || ttlDays <= 0) return 30 * 24 * 60 * 60 * 1000
    return ttlDays * 24 * 60 * 60 * 1000
  }

  private getCookieOptions(maxAgeMs?: number): CookieOptions {
    const secure = this.parseBoolean(
      this.configService.get<string>('AUTH_COOKIE_SECURE'),
      this.configService.get<string>('NODE_ENV') === 'production'
    )

    const sameSite =
      this.configService.get<string>('AUTH_COOKIE_SAMESITE') ??
      (secure ? 'none' : 'lax')

    const normalizedSameSite = this.normalizeSameSite(sameSite, secure)

    return {
      httpOnly: true,
      secure,
      sameSite: normalizedSameSite,
      path: '/',
      ...(typeof maxAgeMs === 'number' ? { maxAge: maxAgeMs } : {}),
    }
  }

  private normalizeSameSite(value: string, secure: boolean): 'lax' | 'strict' | 'none' {
    const lower = value.toLowerCase()
    if (lower === 'strict') return 'strict'
    if (lower === 'none') return secure ? 'none' : 'lax'
    return 'lax'
  }

  private parseBoolean(value: string | undefined, fallback: boolean) {
    if (value === undefined) return fallback
    return ['true', '1', 'yes', 'y', 'on'].includes(value.toLowerCase())
  }
}
