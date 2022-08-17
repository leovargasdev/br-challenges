import { CHALLENGE_LEVELS } from 'constants/index'
import { z as zod } from 'zod'

export const zodSolutionSchema = zod.object({
  repository_url: zod
    .string()
    .min(1, { message: 'A url do repositório é obrigatória' })
    .startsWith('https://git', {
      message: 'O repositório deverá ser do github ou gitlab'
    }),
  solution_url: zod
    .string()
    .min(1, { message: 'A url de visualização é obrigatória' })
    .startsWith('https://', {
      message: 'O dominio deverá ter certificado SSL'
    }),
  linkedin_post: zod
    .string()
    .startsWith('https://www.linkedin.com/posts/', {
      message: 'A url não segue o padrão de post do linkedin'
    })
    .or(zod.literal('')),
  shared_url: zod
    .string()
    .startsWith('https://', {
      message: 'O dominio deverá ter certificado SSL'
    })
    .or(zod.literal('')),
  level: zod.enum(CHALLENGE_LEVELS).optional()
})

export type SolutionForm = zod.infer<typeof zodSolutionSchema>
