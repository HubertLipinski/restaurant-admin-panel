import { z } from 'zod'

export const FormSchema = z.object({
  status: z.string(),
})
