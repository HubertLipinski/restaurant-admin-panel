export default defineNuxtRouteMiddleware(() => {
  const isUserAuthenticated: boolean = false
  if (!isUserAuthenticated) {
    return navigateTo('/login')
  }
})
