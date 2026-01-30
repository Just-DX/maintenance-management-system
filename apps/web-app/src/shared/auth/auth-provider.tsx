import { AuthContext } from './auth-context'
import type { AuthContextValue, RequestUser, RoleCode } from './auth.types'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@plugins/supabase/client'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<RequestUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

  const loadProfile = useCallback(
    async (accessToken: string) => {
      try {
        const res = await fetch(`${apiUrl}/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (!res.ok) {
          setUser(null)
          return
        }

        const data: RequestUser = await res.json()
        setUser(data)
      } catch (error) {
        console.error('Failed to load profile', error)
        setUser(null)
      }
    },
    [apiUrl]
  )

  useEffect(() => {
    let active = true
    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        if (!active) return
        const currentSession = data.session ?? null
        setSession(currentSession)

        if (currentSession?.access_token) {
          await loadProfile(currentSession.access_token)
        } else {
          setUser(null)
        }
      })
      .finally(() => active && setIsLoading(false))

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!active) return
      setSession(nextSession)

      if (nextSession?.access_token) {
        await loadProfile(nextSession.access_token)
      } else {
        setUser(null)
      }

      setIsLoading(false)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [loadProfile])

  const signInWithPassword = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const result = await supabase.auth.signInWithPassword({ email, password })
      if (result.error) throw result.error

      const accessToken = result.data.session?.access_token
      if (accessToken) {
        await loadProfile(accessToken)
      }

      return result
    },
    [loadProfile]
  )

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }, [])

  const signInWithOAuth = useCallback(
    async (provider: 'google' | 'github', redirectTo?: string) => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectTo ?? `${window.location.origin}/dashboard`,
        },
      })

      if (error) throw error
      if (data?.url) {
        window.location.href = data.url
      }
    },
    []
  )

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
      session,
      accessToken: session?.access_token ?? null,
      isAuthenticated: Boolean(session),
      isLoading,
      signInWithPassword,
      signInWithGoogle: (redirectTo?: string) => signInWithOAuth('google', redirectTo),
      signInWithGithub: (redirectTo?: string) => signInWithOAuth('github', redirectTo),
      signOut,
      hasRole,
    }),
    [user, session, isLoading, signInWithPassword, signOut, hasRole, signInWithOAuth]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
