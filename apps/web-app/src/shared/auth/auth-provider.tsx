import { apiClientGetRaw, apiClientPostRaw } from '@shared/api'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from './auth-context'
import type {
  AuthContextValue,
  RequestUser,
  RoleCode,
  SignInResponse,
  SignUpRequest,
} from './auth.types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RequestUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadProfile = useCallback(async () => {
    try {
      const [data, error] = await apiClientGetRaw('/auth/me')

      if (error) {
        console.error('Failed to load profile', error)
        setUser(null)
        return
      }

      setUser((data as RequestUser | null) ?? null)
    } catch (error) {
      console.error('Failed to load profile', error)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    let active = true
    loadProfile()
      .catch(() => {
        if (!active) return
        setUser(null)
      })
      .finally(() => active && setIsLoading(false))

    return () => {
      active = false
    }
  }, [loadProfile])

  const signInWithPassword = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const [data, error] = await apiClientPostRaw('/auth/sign-in', { email, password })

      if (error) throw error
      if (!data) throw new Error('Unable to sign in')

      const payload = data as SignInResponse
      if (payload.user) {
        setUser(payload.user)
      } else {
        await loadProfile()
      }

      return payload
    },
    [loadProfile]
  )

  const signUp = useCallback(async (params: SignUpRequest) => {
    const [, error] = await apiClientPostRaw('/auth/signup', params)

    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    await apiClientPostRaw('/auth/sign-out')
    setUser(null)
  }, [])

  const signInWithOAuth = useCallback(async (provider: 'google' | 'github') => {
    const callbackUrl = new URL('/auth/callback', window.location.origin)
    const [data, error] = await apiClientPostRaw(
      provider === 'google' ? '/auth/login/google' : '/auth/login/github',
      { redirectTo: callbackUrl.toString() }
    )

    if (error) throw error
    if (data && typeof data === 'object' && 'url' in data && data.url) {
      window.location.href = String(data.url)
    }
  }, [])

  const hasRole = useCallback(
    (roles: RoleCode[], siteId?: string) => {
      if (!user) return false
      return user.roles.some(
        (role) => roles.includes(role.code as RoleCode) && (!siteId || role.siteId === siteId)
      )
    },
    [user]
  )

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      signUp,
      signInWithPassword,
      signInWithGoogle: () => signInWithOAuth('google'),
      signInWithGithub: () => signInWithOAuth('github'),
      signOut,
      hasRole,
    }),
    [user, isLoading, signUp, signInWithPassword, signOut, hasRole, signInWithOAuth]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
