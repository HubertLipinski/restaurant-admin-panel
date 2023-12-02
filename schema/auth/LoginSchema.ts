import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string({ required_error: 'Pole Email jest wymagane' }).email({ message: 'Podany email jest niepoprawny' }).trim(),
  password: z.string({ required_error: 'Pole Hasło jest wymagane' }).min(8, { message: 'Hasło powinno mieć przynajmniej 8 znaków' }).trim(),
})
