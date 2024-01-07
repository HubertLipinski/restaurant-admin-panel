import type { ComputedGetter } from 'vue'
import type { VerticalNavigationLink } from '#ui/types'
import { UserPrivilegesLevel } from '~/types/user'

export const useNavStore = defineStore('nav', () => {
  const route = useRouter()
  const { data: user }: { data: Ref<User> } = useAuth()

  const navigation: VerticalNavigationLink[] = [
    {
      label: 'Dashboard',
      to: '/dashboard',
    },
    {
      label: 'Stoły',
      to: '/tables',
    },
    {
      label: 'Potrawy',
      to: '/dishes',
    },
    {
      label: 'Karty menu',
      to: '/menus',
    },
  ]

  // TODO: for now all roles have the same navigation
  const roleNavigation: Pick<UserPrivilegesLevel, VerticalNavigationLink[]> = {
    [UserPrivilegesLevel['Admin']]: navigation,
    [UserPrivilegesLevel['Waiter']]: navigation,
    [UserPrivilegesLevel['Kitchen']]: navigation,
    [UserPrivilegesLevel['Guest']]: navigation,
  }

  const roleBasedNavigation: ComputedGetter<VerticalNavigationLink[] | null> = computed(
    (): VerticalNavigationLink[] | null => {
      const role: UserPrivilegesLevel = user.value?.privilegesLevel ?? 3
      const nav = roleNavigation[role] ?? null

      if (!nav) {
        return null
      }

      return nav.map((item) => {
        item.active = route.currentRoute.value.path.includes(item.to.split('/')[1])
        return item
      })
    }
  )

  return { roleBasedNavigation }
})
