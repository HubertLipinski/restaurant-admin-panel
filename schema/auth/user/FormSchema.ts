import { z } from 'zod'

export const FormCreateSchema = z.object({
  name: z.string({ required_error: 'Pole jest wymagane' }).min(3, { message: 'Pole powinno zawierać min. 3 znaki' }),
  email: z.string({ required_error: 'Pole jest wymagane' }).email({ message: 'Pole powinno zawierać poprawny adres email' }),
  password: z
    .string({ required_error: 'Pole Hasło jest wymagane' })
    .min(8, { message: 'Hasło powinno mieć przynajmniej 8 znaków' })
    .trim(),
  password_confirmation: z
    .string({ required_error: 'Pole jest wymagane' })
    .min(8, { message: 'Hasło powinno mieć przynajmniej 8 znaków' })
    .trim(),
  role: z.string(),
})

export const FormUpdateSchema = z.object({
  name: z.string({ required_error: 'Pole jest wymagane' }).min(3, { message: 'Pole powinno zawierać min. 3 znaki' }),
  email: z.string({ required_error: 'Pole jest wymagane' }).email({ message: 'Pole powinno zawierać poprawny adres email' }),
  password: z
    .string({ required_error: 'Pole Hasło jest wymagane' })
    .trim()
    .nullable(),
  password_confirmation: z
    .string({ required_error: 'Pole jest wymagane' })
    .trim()
    .nullable(),
  role: z.string(),
  changePassword: z.boolean(),
}).superRefine((data, refinementContext) => {
  if (!data.changePassword) return true
  passwordCheck('password', data, refinementContext)
  passwordCheck('password_confirmation', data, refinementContext)
})

export const FormUpdateProfileSchema = z.object({
  name: z.string({ required_error: 'Pole jest wymagane' }).min(3, { message: 'Pole powinno zawierać min. 3 znaki' }),
  email: z.string({ required_error: 'Pole jest wymagane' }).email({ message: 'Pole powinno zawierać poprawny adres email' }),
  current_password: z
    .string({ required_error: 'Pole Hasło jest wymagane' })
    .trim()
    .nullable(),
  password: z
    .string({ required_error: 'Pole Hasło jest wymagane' })
    .trim()
    .nullable(),
  password_confirmation: z
    .string({ required_error: 'Pole jest wymagane' })
    .trim()
    .nullable(),
  changePassword: z.boolean(),
}).superRefine((data, refinementContext) => {
  if (!data.changePassword) return true
  passwordCheck('password', data, refinementContext)
  passwordCheck('password_confirmation', data, refinementContext)
  passwordCheck('current_password', data, refinementContext)
})

const passwordCheck = (value, data, _ctx) => {
  if (data.changePassword && !data[value]?.length) {
    return _ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Pole jest wymagane.',
      path: [value],
    })
  }
}

