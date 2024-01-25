import { z } from 'zod'

export const FormSchema = z.object({
  name: z.string({ required_error: 'Pole jest wymagane' }).min(3, { message: 'Pole powinno zawierać min. 3 znaki' }),
  seats: z.number({ required_error: 'Pole jest wymagane' }).min(1, { message: 'Minimalna liczba miejsc to 1' }),
})
