import type { Menu } from '~/types/menus'

const mockMenus: Menu[] = [
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

export default mockMenus
