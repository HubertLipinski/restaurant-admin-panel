import type { Dish } from '~/types/dishes'

export interface Menu {
  id: number
  name: string
  active: boolean
  dishes?: Dish[]
  created_at: string | null
  updated_at: string | null
}

export type MenuFilterType = 'active' | 'inactive' | 'all' | null

export interface MenuType {
  name: string
  value: MenuFilterType
}
