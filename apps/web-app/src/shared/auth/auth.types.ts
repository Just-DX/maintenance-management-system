import type { AuthResponse, Session } from '@supabase/supabase-js'

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

export type AuthContextValue = {
  user: RequestUser | null
  session: Session | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  signInWithPassword: (params: { email: string; password: string }) => Promise<AuthResponse>
  signInWithGoogle: (redirectTo?: string) => Promise<void>
  signInWithGithub: (redirectTo?: string) => Promise<void>
  signOut: () => Promise<void>
  hasRole: (roles: RoleCode[], siteId?: string) => boolean
}
