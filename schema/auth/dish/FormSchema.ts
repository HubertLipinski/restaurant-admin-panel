import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
export const FormSchema = z.object({
  name: z.string({ required_error: 'Pole jest wymagane' }).min(3, { message: 'Pole powinno zawierać min. 3 znaki' }),
  price: z.string({ required_error: 'Pole jest wymagane' }).refine(
    (v) => {
      const n = Number(v)
      const valid = !isNaN(n) && v?.length > 0
      if (v.slice(-1) === '.') {
        return false
      }
      return valid
    },
    { message: 'Niepoprawny format ceny' }
  ),
  kcal: z.string({ required_error: 'Pole jest wymagane' }).min(1, { message: 'Pole powinno zawierać min. 1 znak' }),
  fat: z.string({ required_error: 'Pole jest wymagane' }).min(1, { message: 'Pole powinno zawierać min. 1 znak' }),
  saturatedFat: z
    .string({ required_error: 'Pole jest wymagane' })
    .min(1, { message: 'Pole powinno zawierać min. 1 znak' }),
  carbs: z.string({ required_error: 'Pole jest wymagane' }).min(1, { message: 'Pole powinno zawierać min. 1 znak' }),
  proteins: z.string({ required_error: 'Pole jest wymagane' }).min(1, { message: 'Pole powinno zawierać min. 1 znak' }),
  image: z
    .any()
    .refine((files) => files?.size > 0, 'Zdjęcie jest wymagane')
    .refine((files) => files?.size <= MAX_FILE_SIZE, 'Maksymalny rozmiar zdjęcia to 5MB')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      'Dozwolone rozszerzenia to: .jpg, .jpeg, .png, .webp'
    ),
  active: z.boolean(),
})
