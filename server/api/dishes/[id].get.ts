import type { Dish } from '~/types/dishes'
import mockDishes from '~/server/mock/mockDishes'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const data: Dish[] = mockDishes

  return data.find((dish: Dish) => {
    return dish.id === parseInt(id)
  })
})
