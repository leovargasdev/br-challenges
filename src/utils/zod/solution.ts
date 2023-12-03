import { z as zod } from 'zod'

// import { LEVELS } from 'utils/constants'
// const levels = Object.keys(LEVELS)

export const zodSolutionSchema = zod.object({
  repository_url: zod
    .string()
    .min(1, { message: 'A url do repositório é obrigatória' }),
  url: zod.string().min(1, { message: 'A url de visualização é obrigatória' }),
  linkedin_url: zod
    .string()
    .startsWith('https://www.linkedin.com/', {
      message: 'A url não segue o padrão de post do linkedin'
    })
    .or(zod.literal('')),
  level: zod.enum(['easy', 'medium', 'hard'], {
    invalid_type_error: 'É preciso selecionar um nível de dificuldade'
  })
})

export type SolutionForm = zod.infer<typeof zodSolutionSchema>
