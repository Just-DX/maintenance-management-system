import { SupabaseService } from '@modules/supabase/supabase.service'
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { SignupDto } from './dto/signup.dto'
import { UserRepository } from './repositories/auth.repository'

type OAuthInput = {
  redirectTo: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly userRepo: UserRepository
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

    return {
      id: profile.id,
      email: profile.email,
      fullName: profile.fullName,
      username: profile.username,
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
}
