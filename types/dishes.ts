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
  imageUrl: string | null
  image: null | File
  createdAt: string | null
  updatedAt: string | null
}
