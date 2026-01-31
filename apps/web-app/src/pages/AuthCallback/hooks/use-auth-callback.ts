import { supabase } from '@plugins/supabase/client'
import { apiClientPostRaw } from '@shared/api'
import { useEffect, useMemo, useState } from 'react'
import type { Session } from '@supabase/supabase-js'

type CallbackSession = Pick<
  Session,
  'access_token' | 'refresh_token' | 'token_type' | 'expires_in' | 'expires_at'
>

type CallbackStatus = 'loading' | 'success' | 'error'

const normalizeTokenType = (value: string | null): 'bearer' => {
  return value === 'bearer' ? 'bearer' : 'bearer'
}

const getSafeRedirect = (value: string | null) => {
  if (!value) return '/dashboard'
  try {
    const url = new URL(value, window.location.origin)
    if (url.origin !== window.location.origin) return '/dashboard'
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return value.startsWith('/') ? value : '/dashboard'
  }
}

const verifyEmailLink = async ({
  tokenHash,
  token,
  email,
  type,
}: {
  tokenHash: string | null
  token: string | null
  email: string | null
  type: string | null
}): Promise<CallbackSession | null> => {
  if (!type) return null

  if (tokenHash) {
    const { data, error } = await supabase.auth.verifyOtp({
      type: type as 'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change' | 'email',
      token_hash: tokenHash,
    })
    if (error) throw error
    if (!data.session) return null
    const { access_token, refresh_token, token_type, expires_in, expires_at } = data.session
    return {
      access_token,
      refresh_token,
      token_type: normalizeTokenType(token_type),
      expires_in,
      expires_at,
    }
  }

  if (token && email) {
    const { data, error } = await supabase.auth.verifyOtp({
      type: type as 'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change' | 'email',
      token,
      email,
    })
    if (error) throw error
    if (!data.session) return null
    const { access_token, refresh_token, token_type, expires_in, expires_at } = data.session
    return {
      access_token,
      refresh_token,
      token_type: normalizeTokenType(token_type),
      expires_in,
      expires_at,
    }
  }

  return null
}

const exchangeCodeForSession = async (code: string): Promise<CallbackSession | null> => {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) throw error
  if (!data.session) return null
  const { access_token, refresh_token, token_type, expires_in, expires_at } = data.session
  return {
    access_token,
    refresh_token,
    token_type: normalizeTokenType(token_type),
    expires_in,
    expires_at,
  }
}

const getSessionFromHash = (hashParams: URLSearchParams): CallbackSession | null => {
  const accessToken = hashParams.get('access_token')
  const refreshToken = hashParams.get('refresh_token')
  const expiresIn = hashParams.get('expires_in')
  const expiresAt = hashParams.get('expires_at')
  const tokenType = hashParams.get('token_type')

  if (!accessToken || !tokenType || !expiresIn) return null

  return {
    access_token: accessToken,
    refresh_token: refreshToken ?? '',
    token_type: normalizeTokenType(tokenType),
    expires_in: Number(expiresIn),
    expires_at: expiresAt ? Number(expiresAt) : undefined,
  }
}

export const useAuthCallback = () => {
  const [status, setStatus] = useState<CallbackStatus>('loading')
  const [message, setMessage] = useState('Verifying your sign-in...')

  const redirectTo = useMemo(() => {
    const search = new URLSearchParams(window.location.search)
    return getSafeRedirect(
      search.get('returnTo') ??
        search.get('redirectTo') ??
        search.get('redirect_to') ??
        search.get('next')
    )
  }, [])

  useEffect(() => {
    let active = true

    const run = async () => {
      const searchParams = new URLSearchParams(window.location.search)
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))

      const error =
        searchParams.get('error_description') ||
        searchParams.get('error') ||
        hashParams.get('error_description') ||
        hashParams.get('error')

      if (error) {
        throw new Error(error)
      }

      const tokenHash = searchParams.get('token_hash')
      const token = searchParams.get('token')
      const email = searchParams.get('email')
      const type = searchParams.get('type')
      const code = searchParams.get('code')

      let session: CallbackSession | null =
        tokenHash || token ? await verifyEmailLink({ tokenHash, token, email, type }) : null

      if (!session && code) {
        session = await exchangeCodeForSession(code)
      }

      if (!session) {
        session = getSessionFromHash(hashParams)
      }

      if (!session) {
        throw new Error('No session data found in callback URL')
      }

      const [, callbackError] = await apiClientPostRaw('/auth/callback', {
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: session.expires_at ?? null,
        expiresIn: session.expires_in ?? null,
      })
      if (callbackError) {
        throw callbackError
      }

      window.history.replaceState({}, '', window.location.pathname)

      if (!active) return
      setStatus('success')
      setMessage('Sign-in complete. Redirecting...')

      window.location.replace(redirectTo)
    }

    run().catch((err: unknown) => {
      if (!active) return
      const message = err instanceof Error ? err.message : 'Unable to complete sign-in'
      setStatus('error')
      setMessage(message)
    })

    return () => {
      active = false
    }
  }, [redirectTo])

  return {
    status,
    message,
  }
}
