export interface Dish {
  id: number
  name: string
  price: number
  kcal: number
  fat: number
  saturatedFat: number
  carbs: number
  proteins: number
  active: boolean
  imageUrl: string | null | File
  created_at: string | null
  updated_at: string | null
}
