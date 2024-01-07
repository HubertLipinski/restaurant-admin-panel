import type { Dish } from '~/types/dishes'

export interface Menu {
  id: number
  name: string
  active: boolean
  dishes?: Dish[]
  createdAt: string | null
  updatedAt: string | null
}

export type MenuFilterType = 'active' | 'inactive' | 'all' | null

export interface MenuType {
  name: string
  value: MenuFilterType
}
