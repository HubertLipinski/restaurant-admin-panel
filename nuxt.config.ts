// https://nuxt.com/docs/api/configuration/nuxt-config

import User from './types/user'
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  modules: ['@nuxt/ui', '@vueuse/nuxt', '@formkit/auto-animate/nuxt', '@sidebase/nuxt-auth', '@pinia/nuxt'],

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      titleTemplate: '%s | ' + process.env.APP_TITLE,
      title: 'Panel' || '',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },

  nitro: {
    devProxy: {
      host: 'localhost',
    },
  },

  auth: {
    baseURL: process.env.BASE_URL,
    globalAppMiddleware: true,
    provider: {
      type: 'local',
      endpoints: {
        getSession: { path: '/user', method: 'get' },
      },
    },
    sessionDataType: User,
  },

  runtimeConfig: {
    public: {
      apiUrl: '',
      appMode: '',
      baseUrl: '',
    },
  },

  colorMode: {
    preference: 'light',
  },
})
