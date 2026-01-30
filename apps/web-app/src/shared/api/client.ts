import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'
import { supabase } from '@plugins/supabase/client'
import type { ParseAsResponse } from 'openapi-fetch'
import type { PathsWithMethod } from 'openapi-typescript-helpers'
import type { AppServiceTypes } from '@justdx/types'
import type {
  AppServiceAPIGetErrorResponse,
  AppServiceAPIGetInit,
  AppServiceAPIGetSuccessResponse,
  AppServiceAPIPostErrorResponse,
  AppServiceAPIPostInit,
  AppServiceAPIPostSuccessResponse,
} from './typed-client'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const apiClient = axios.create({
  baseURL,
})

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (token) {
    const headers = AxiosHeaders.from(config.headers ?? {})
    headers.set('Authorization', `Bearer ${token}`)
    config.headers = headers
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Request failed'
    return Promise.reject(new Error(message))
  }
)

export const apiClientGet = async <Path extends PathsWithMethod<AppServiceTypes.paths, 'get'>>(
  path: Path
): Promise<
  [
    ParseAsResponse<AppServiceAPIGetSuccessResponse<Path>, AppServiceAPIGetInit<Path>> | null,
    Error | AppServiceAPIGetErrorResponse<Path> | null,
  ]
> => {
  try {
    const client = apiClient
    const { data } = await client.get(path)
    return [data, null]
  } catch (e: unknown) {
    const err = e instanceof Error ? e : new Error(String(e))
    return [null, err]
  }
}

export const apiClientPost = async <Path extends PathsWithMethod<AppServiceTypes.paths, 'post'>>(
  path: Path,
  payload?: unknown
): Promise<
  [
    ParseAsResponse<AppServiceAPIPostSuccessResponse<Path>, AppServiceAPIPostInit<Path>> | null,
    Error | AppServiceAPIPostErrorResponse<Path> | null,
  ]
> => {
  try {
    const client = apiClient
    const { data } = await client.post(path, payload)
    return [data, null]
  } catch (e: unknown) {
    const err = e instanceof Error ? e : new Error(String(e))
    return [null, err]
  }
}

export type ApiClient = typeof apiClient
