import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  createClient,
  type SupabaseClient,
  type User,
  type AdminUserAttributes,
  type UserResponse,
  type Provider,
} from '@supabase/supabase-js'

/**
 * Lightweight Supabase client wrapper to verify access tokens coming from the web app.
 * We use the service role key so the auth API can validate any user's JWT.
 */
@Injectable()
export class SupabaseService {
  private client: SupabaseClient | undefined

  constructor(private readonly configService: ConfigService) {}

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

  async createUser(attrs: AdminUserAttributes): Promise<UserResponse> {
    const client = this.getClient()
    return client.auth.admin.createUser(attrs)
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
