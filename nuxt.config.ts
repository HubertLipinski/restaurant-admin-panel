// https://nuxt.com/docs/api/configuration/nuxt-config

import User from './types/user'
export default defineNuxtConfig({
  devtools: { enabled: process.env.NUXT_PUBLIC_APP_MODE === 'development' },

  ssr: false,

  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@formkit/auto-animate/nuxt',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      titleTemplate: '%s | ' + process.env.NUXT_PUBLIC_APP_TITLE,
      title: 'Panel' || '',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // Configuration for auth provider
  auth: {
    globalAppMiddleware: true,
    baseURL: process.env.NUXT_PUBLIC_API_URL,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        signOut: { path: '/logout', method: 'get' },
        getSession: { path: '/user', method: 'get' },
      },
      pages: {
        login: '/login',
      },
      sessionDataType: {},
    },
    globalMiddlewareOptions: {
      allow404WithoutAuth: true,
      addDefaultCallbackUrl: '/dashboard',
    },
  },

  runtimeConfig: {
    public: {
      appTitle: '',
      apiUrl: '',
      appMode: '',
      baseUrl: '',
    },
  },

  colorMode: {
    preference: 'light',
  },

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage',
  },

  nitro: {
    devProxy: {
      host: 'localhost',
    },
  },

  devServer: {
    port: 4909,
  },
})
