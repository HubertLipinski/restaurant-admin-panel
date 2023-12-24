import { defu } from 'defu'
import type { UseFetchOptions } from '#app'

export function useApiFetch<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const { token } = useAuth()
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiUrl ?? '127.0.0.1/api',
    key: url,

    // set user token if connected
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},

    onResponse(_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    onResponseError(_ctx) {
      // throw new myBusinessError()
    },
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}
