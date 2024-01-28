export default defineNuxtRouteMiddleware((to, from) => {

  const { error } = useNotification()
  const { data: user }: { data: Ref<User> } = useAuth()

  if (!user.value) {
    return navigateTo('/login')
  }

  if (to.meta.requiredRole) {
    const routeRoles = to.meta.requiredRole
    const requiredRoles = Array.isArray(routeRoles) ? [...routeRoles] : [routeRoles]
    const userRole = user.value?.role

    if (!requiredRoles.includes(userRole)) {
      error('Nie możesz przejść do tej strony!', 'Brak uprawnień', 'role-middleware')
      return navigateTo(to.fullPath === from.fullPath ? '/dashboard' : from.fullPath, { replace: true })
    }
  }
})
