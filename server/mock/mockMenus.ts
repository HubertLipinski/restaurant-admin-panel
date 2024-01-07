import type { Menu } from '~/types/menus'

const mockMenus: Menu[] = [
  {
    id: 1,
    name: 'Menu 1',
    active: true,
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
  },
  {
    id: 2,
    name: 'Menu 2',
    active: true,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 3,
    name: 'Menu 3',
    active: false,
    createdAt: '2022-01-01',
    updatedAt: '2022-01-01',
  },
]

export default mockMenus
