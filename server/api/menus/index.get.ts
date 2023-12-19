import type { Menu, MenuFilterType } from '~/types/menus'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const data: Menu[] = [
    {
      id: 1,
      name: 'Menu 1',
      active: true,
      created_at: '2020-01-01',
      updated_at: '2020-01-01',
    },
    {
      id: 2,
      name: 'Menu 2',
      active: true,
      created_at: '2021-01-01',
      updated_at: '2021-01-01',
    },
    {
      id: 3,
      name: 'Menu 3',
      active: false,
      created_at: '2022-01-01',
      updated_at: '2022-01-01',
    },
  ]

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
