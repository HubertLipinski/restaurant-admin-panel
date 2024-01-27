import type { ComputedGetter } from 'vue'
import type { VerticalNavigationLink } from '#ui/types'
import { UserRole } from '~/types/user'

export const useNavStore = defineStore('nav', () => {
  const route = useRouter()
  const { data: user }: { data: Ref<User> } = useAuth()

  const navigation: VerticalNavigationLink[] = [
    {
      label: 'Dashboard',
      to: '/dashboard',
      icon: 'heroicons-outline:document-report',
      roles: null,
    },
    {
      label: 'Stoły',
      to: '/tables',
      icon: 'i-ic-round-table-restaurant',
      roles: null,
    },
    {
      label: 'Potrawy',
      to: '/dishes',
      icon: 'i-healthicons-hot-meal',
      roles: null,
    },
    {
      label: 'Karty menu',
      to: '/menus',
      icon: 'i-bx-food-menu',
      roles: null,
    },
    {
      label: 'Użytkownicy',
      to: '/users',
      icon: 'heroicons-outline:user-group',
      roles: ['Admin'],
    },
  ]

  const roleBasedNavigation: ComputedGetter<VerticalNavigationLink[] | null> = computed(
    (): VerticalNavigationLink[] | null => {
      const role: UserRole = user.value?.role ?? UserRole.Guest

      let nav = navigation;
      if (role !== UserRole.Admin) {
        nav = nav.filter((item) => item.roles === null || item.roles.includes(role))
      }

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
