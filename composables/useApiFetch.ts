import { defu } from 'defu'
import type { UseFetchOptions } from '#app'
import type { ApiError } from 'next/dist/server/api-utils'

export function useApiFetch<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const { token } = useAuth()
  const config = useRuntimeConfig()

  // set user token if connected
  const authHeader = token.value ? { Authorization: `${token.value}` } : null

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiUrl ?? '127.0.0.1/api',
    key: url,


    headers: {
      accept: 'application/json',
      ...authHeader,
      ...options.headers,
    },

    // onResponse(_ctx) {
    //   // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    // },
    //
    // onResponseError(_ctx) {
    //   throw new Error({
    //     statusCode: _ctx.response.status,
    //     ..._ctx.response._data
    //   })
    // },
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}
