import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from './auth-context'
import { authService } from './auth.service'
import type { AuthContextValue, RequestUser, RoleCode, SignUpRequest } from './auth.types'
import { tokenStorage } from './token-storage'

/**
 * Check if the current path is the auth callback route.
 * We skip the initial /auth/me call on this route since tokens aren't set yet.
 */
const isAuthCallbackRoute = () => {
  return window.location.pathname === '/auth/callback'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RequestUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadProfile = useCallback(async () => {
    // If no token exists, don't attempt to load profile (unless on callback route)
    if (!tokenStorage.getAccessToken() && !isAuthCallbackRoute()) {
      setIsLoading(false)
      return
    }

    try {
      const userProfile = await authService.getProfile()
      setUser(userProfile)
    } catch (error) {
      console.error('Failed to load profile', error)
      setUser(null)

      const msg = error instanceof Error ? error.message : String(error)
      if (msg.includes('401') || msg.toLowerCase().includes('unauthorized')) {
        tokenStorage.clear()
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signUp = useCallback(async (params: SignUpRequest) => {
    await authService.signUp(params)
  }, [])

  const signInWithPassword = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const response = await authService.signInWithPassword({ email, password })

      if (response.accessToken) {
        tokenStorage.setAccessToken(response.accessToken)
      }
      if (response.refreshToken) {
        tokenStorage.setRefreshToken(response.refreshToken)
      }

      if (response.user) {
        setUser(response.user)
      } else {
        await loadProfile()
      }

      return response
    },
    [loadProfile]
  )

  const signInWithOAuth = useCallback(async (provider: 'google' | 'github') => {
    const callbackUrl = new URL('/auth/callback', window.location.origin).toString()
    const redirectUrl = await authService.signInWithOAuth(provider, callbackUrl)
    window.location.href = redirectUrl
  }, [])

  const signOut = useCallback(async () => {
    try {
      await authService.signOut()
    } catch (e) {
      console.error('Sign out error', e)
    }
    tokenStorage.clear()
    setUser(null)
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

  useEffect(() => {
    if (isAuthCallbackRoute()) {
      setIsLoading(false)
      return
    }
    loadProfile()
  }, [loadProfile])

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
      loadProfile,
      hasRole,
    }),
    [user, isLoading, signUp, signInWithPassword, signOut, hasRole, signInWithOAuth, loadProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
