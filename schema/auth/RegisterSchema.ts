import { z } from 'zod'

export const RegisterSchema = z
  .object({
    name: z.string({ required_error: 'Pole jest wymagane' }).min(1, { message: 'Pole jest wymagane' }).trim(),
    email: z
      .string({ required_error: 'Pole Email jest wymagane' })
      .email({ message: 'Podany email jest niepoprawny' })
      .trim(),
    password: z
      .string({ required_error: 'Pole Hasło jest wymagane' })
      .min(8, { message: 'Hasło powinno mieć przynajmniej 8 znaków' })
      .trim(),
    password_confirmation: z
      .string({ required_error: 'Pole jest wymagane' })
      .min(8, { message: 'Hasło powinno mieć przynajmniej 8 znaków' })
      .trim(),
    birthdayDate: z.string({ required_error: 'Pole Data urodzenia jest wymagane' }).pipe(
      z.coerce.date({
        errorMap: (issue, { defaultError }) => ({
          message: issue.code === 'invalid_date' ? 'Podana data jest nieprawidłowa' : defaultError,
        }),
      })
    ),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Podane hasła są różne',
    path: ['password_confirmation'],
  })
