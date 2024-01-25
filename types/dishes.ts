export interface Dish {
  id: number
  name: string
  price: number
  kcal: number
  fat: number
  saturated_fat: number
  carbs: number
  proteins: number
  active: boolean
  image_url: string | null
  image: null | File
  created_at: string | null
  updated_at: string | null
}
