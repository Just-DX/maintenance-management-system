import type { AppServiceTypes } from '@justdx/types'

export type SignUpRequest = AppServiceTypes.components['schemas']['SignupDto']

export type RoleCode = string

export type RequestUser = {
  id: string
  email: string
  fullName: string | null
  avatar: string | null
  roles: Array<{
    siteId: string
    roleId: string
    code: RoleCode
    name: string
  }>
}

export type SignInResponse = {
  user: RequestUser
  sessionExpiresAt?: number | null
}

export type AuthContextValue = {
  user: RequestUser | null
  isAuthenticated: boolean
  isLoading: boolean
  signUp: (params: SignUpRequest) => Promise<void>
  signInWithPassword: (params: { email: string; password: string }) => Promise<SignInResponse>
  signInWithGoogle: (redirectTo?: string) => Promise<void>
  signInWithGithub: (redirectTo?: string) => Promise<void>
  signOut: () => Promise<void>
  hasRole: (roles: RoleCode[], siteId?: string) => boolean
}
