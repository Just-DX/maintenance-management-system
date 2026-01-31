import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
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

export const apiClientGetRaw = async (path: string): Promise<[unknown | null, Error | null]> => {
  try {
    const { data } = await apiClient.get(path)
    return [data, null]
  } catch (e: unknown) {
    const err = e instanceof Error ? e : new Error(String(e))
    return [null, err]
  }
}

export const apiClientPostRaw = async (
  path: string,
  payload?: unknown
): Promise<[unknown | null, Error | null]> => {
  try {
    const { data } = await apiClient.post(path, payload)
    return [data, null]
  } catch (e: unknown) {
    const err = e instanceof Error ? e : new Error(String(e))
    return [null, err]
  }
}

export type ApiClient = typeof apiClient
