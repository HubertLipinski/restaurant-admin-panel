import type { Menu, MenuFilterType } from '~/types/menus'
import mockMenus from '~/server/mock/mockMenus'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const data: Menu[] = mockMenus

  const type: MenuFilterType = query.type ?? null

  return data.filter((menu) => {
    if (type === 'inactive') {
      return !menu.active
    }

    if (type === 'active') {
      return menu.active
    }

    return true
  })
})
