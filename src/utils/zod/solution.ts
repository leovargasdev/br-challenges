import { z as zod } from 'zod'
import { CHALLENGE_LEVELS } from 'utils/constants'

export const zodSolutionSchema = zod.object({
  repository_url: zod
    .string()
    .min(1, { message: 'A url do repositório é obrigatória' }),
  solution_url: zod
    .string()
    .min(1, { message: 'A url de visualização é obrigatória' }),
  linkedin_post: zod
    .string()
    .startsWith('https://www.linkedin.com/posts/', {
      message: 'A url não segue o padrão de post do linkedin'
    })
    .or(zod.literal('')),
  level: zod.enum(CHALLENGE_LEVELS, {
    invalid_type_error: 'É preciso selecionar um nível de dificuldade'
  })
})

export type SolutionForm = zod.infer<typeof zodSolutionSchema>
