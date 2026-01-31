import { apiClientPostRaw } from '@shared/api'
import { useAuth, type SignInResponse } from '@shared/auth'
import { tokenStorage } from '@shared/auth/token-storage'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  exchangeCodeForSession,
  getSafeRedirect,
  getSessionFromHash,
  verifyEmailLink,
  type CallbackSession,
  type CallbackStatus,
} from './auth-callback.utils'

export const useAuthCallback = () => {
  const [status, setStatus] = useState<CallbackStatus>('loading')
  const [message, setMessage] = useState('Verifying your sign-in...')
  const { loadProfile } = useAuth()
  const navigate = useNavigate()

  const redirectTo = useMemo(() => {
    const search = new URLSearchParams(window.location.search)
    return getSafeRedirect(
      search.get('returnTo') ??
        search.get('redirectTo') ??
        search.get('redirect_to') ??
        search.get('next')
    )
  }, [])

  const handleRedirect = useCallback(async () => {
    // Refresh the auth context with the new session (using stored token)
    await loadProfile()

    // Use router navigation to avoid full page reload
    navigate({ to: redirectTo, replace: true })
  }, [loadProfile, navigate, redirectTo])

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

      const [data, callbackError] = await apiClientPostRaw('/auth/callback', {
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: session.expires_at ?? null,
        expiresIn: session.expires_in ?? null,
      })

      if (callbackError) {
        throw callbackError
      }

      const response = data as SignInResponse
      if (response && response.accessToken) {
        tokenStorage.setAccessToken(response.accessToken)
        if (response.refreshToken) {
          tokenStorage.setRefreshToken(response.refreshToken)
        }
      }

      window.history.replaceState({}, '', window.location.pathname)

      if (!active) return
      setStatus('success')
      setMessage('Sign-in complete. Redirecting...')

      await handleRedirect()
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
  }, [handleRedirect])

  return {
    status,
    message,
  }
}
