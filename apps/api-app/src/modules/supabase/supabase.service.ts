import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  createClient,
  type AdminUserAttributes,
  type Provider,
  type SupabaseClient,
  type User,
  type UserResponse,
} from '@supabase/supabase-js'

/**
 * Lightweight Supabase client wrapper to verify access tokens coming from the web app.
 * We use the service role key so the auth API can validate any user's JWT.
 */
@Injectable()
export class SupabaseService {
  private client: SupabaseClient | undefined
  private publicClient: SupabaseClient | undefined
  private websiteUrl: string | undefined

  constructor(private readonly configService: ConfigService) {
    this.websiteUrl = this.configService.get<string>('WEBSITE_URL')
  }

  private getClient(): SupabaseClient {
    if (this.client) return this.client

    const url = this.configService.get<string>('SUPABASE_URL')
    const serviceKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')

    if (!url || !serviceKey) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
    }

    this.client = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    return this.client
  }

  async validateAccessToken(accessToken: string): Promise<User | null> {
    const client = this.getClient()
    const { data, error } = await client.auth.getUser(accessToken)

    if (error) {
      return null
    }

    return data.user
  }

  private getPublicClient(): SupabaseClient {
    if (this.publicClient) return this.publicClient

    const url = this.configService.get<string>('SUPABASE_URL')
    const anonKey = this.configService.get<string>('SUPABASE_ANON_KEY')

    if (!url || !anonKey) {
      throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set')
    }

    this.publicClient = createClient(url, anonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    return this.publicClient
  }

  async signInWithPassword(email: string, password: string) {
    const client = this.getPublicClient()
    return client.auth.signInWithPassword({ email, password })
  }

  private inviteUserByEmail(email: string): Promise<UserResponse> {
    const client = this.getClient()
    return client.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${this.websiteUrl}/auth/callback`,
    })
  }

  async createUser(attrs: AdminUserAttributes): Promise<UserResponse> {
    const client = this.getClient()
    const user = await client.auth.admin.createUser(attrs)

    // not await to avoid delaying the response
    if (attrs.email) {
      this.inviteUserByEmail(attrs.email)
    }

    return user
  }

  async getOAuthSignInUrl(provider: Provider, redirectTo: string): Promise<string> {
    const client = this.getClient()
    const { data, error } = await client.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    })

    if (error || !data?.url) {
      throw new Error(error?.message ?? 'Unable to create OAuth sign-in URL')
    }

    return data.url
  }
}
