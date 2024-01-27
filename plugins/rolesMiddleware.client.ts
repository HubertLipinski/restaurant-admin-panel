import { UserRole, User } from '~/types/user'
export default defineNuxtPlugin(() => {

  const { data: user }: { data: Ref<User> } = useAuth()

  for (const role of Object.values(UserRole)) {
    addRouteMiddleware(`role:${role.toLowerCase()}`, () => {
      if (user.value?.role !== role) {
        console.log(`Role ${role} is required!`);
        return navigateTo('/dashboard')
      }
    })
  }
})