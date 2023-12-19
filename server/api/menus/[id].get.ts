import type { Menu } from '~/types/menus'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

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

  await setTimeout(() => {}, 3000)

  return data.find((menu) => {
    return menu.id === parseInt(id)
  })
})
