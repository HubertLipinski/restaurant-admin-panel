import { type User, UserRole } from '~/types/user'

export default function() {

  const { data: user }: { data: Ref<User> } = useAuth()

  function hasRole(role: UserRole) {
    return user.value?.role === role
  }

  return {
    hasRole,
  }
}