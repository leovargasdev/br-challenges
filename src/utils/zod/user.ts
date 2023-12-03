import { z as zod } from 'zod'

export const zodUserSchema = zod.object({
  name: zod.string().min(1, { message: 'O nome de usuário é obrigatório' }),
  bio: zod.string().or(zod.literal(''))
})

export type UserForm = zod.infer<typeof zodUserSchema>
