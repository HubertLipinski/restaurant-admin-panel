import { useUserStore } from '~/stores/useUserStore'

// @ts-ignore
export default defineNuxtRouteMiddleware(({ $pinia }) => {
  const store = useUserStore($pinia)

  if (!store.isAuth) {
    return navigateTo('/login')
  }
})
