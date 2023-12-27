import type { Menu } from '~/types/menus'
import mockMenus from '~/server/mock/mockMenus'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const data: Menu[] = mockMenus

  return data.find((menu) => {
    return menu.id === parseInt(id)
  })
})
