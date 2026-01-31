import { supabase } from '@plugins/supabase/client'
import type { Session } from '@supabase/supabase-js'

export type CallbackSession = Pick<
  Session,
  'access_token' | 'refresh_token' | 'token_type' | 'expires_in' | 'expires_at'
>

export type CallbackStatus = 'loading' | 'success' | 'error'

const normalizeTokenType = (value: string | null): 'bearer' => {
  return value === 'bearer' ? 'bearer' : 'bearer'
}

export const getSafeRedirect = (value: string | null) => {
  if (!value) return '/dashboard'
  try {
    const url = new URL(value, window.location.origin)
    if (url.origin !== window.location.origin) return '/dashboard'
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return value.startsWith('/') ? value : '/dashboard'
  }
}

export const verifyEmailLink = async ({
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

export const exchangeCodeForSession = async (code: string): Promise<CallbackSession | null> => {
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

export const getSessionFromHash = (hashParams: URLSearchParams): CallbackSession | null => {
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
