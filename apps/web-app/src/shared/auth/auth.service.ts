import { apiClientGetRaw, apiClientPostRaw } from '@shared/api'
import type { RequestUser, SignInResponse, SignUpRequest } from './auth.types'

export const authService = {
  getProfile: async (): Promise<RequestUser | null> => {
    const [data, error] = await apiClientGetRaw('/auth/me')
    if (error) throw error
    return (data as RequestUser | null) ?? null
  },

  signUp: async (payload: SignUpRequest): Promise<void> => {
    const [, error] = await apiClientPostRaw('/auth/signup', payload)
    if (error) throw error
  },

  signInWithPassword: async (payload: {
    email: string
    password: string
  }): Promise<SignInResponse> => {
    const [data, error] = await apiClientPostRaw('/auth/sign-in', payload)
    if (error) throw error
    if (!data) throw new Error('Unable to sign in')
    return data as SignInResponse
  },

  signInWithOAuth: async (provider: 'google' | 'github', redirectTo: string): Promise<string> => {
    const endpoint = provider === 'google' ? '/auth/login/google' : '/auth/login/github'
    const [data, error] = await apiClientPostRaw(endpoint, { redirectTo })

    if (error) throw error
    if (data && typeof data === 'object' && 'url' in data && data.url) {
      return String(data.url)
    }
    throw new Error('No redirect URL returned')
  },

  signOut: async (): Promise<void> => {
    await apiClientPostRaw('/auth/sign-out')
  },
}
