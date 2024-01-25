import { Dish } from '~/types/dishes.js'

const mockDishes: Dish[] = [
  {
    id: 1,
    name: 'Potrawa 2',
    price: 200,
    kcal: 5432,
    fat: 1233,
    saturated_fat: 2323,
    carbs: 11,
    proteins: 234,
    active: true,
    image_url: 'https://via.placeholder.com/150',
    created_at: '2020-01-01',
    updated_at: '2020-01-01',
  },
  {
    id: 2,
    name: 'Potrawa 2',
    price: 4234,
    kcal: 5445,
    fat: 2344,
    saturated_fat: 12,
    carbs: 12,
    proteins: 343,
    active: true,
    image_url: 'https://via.placeholder.com/150',
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
  },
  {
    id: 4,
    name: 'Potrawa 4',
    price: 33,
    kcal: 44,
    fat: 543.23,
    saturated_fat: 324,
    carbs: 44,
    proteins: 323,
    active: false,
    image_url: 'https://via.placeholder.com/150',
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
  },
]

export default mockDishes
