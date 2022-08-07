import { z as zod } from 'zod'
import { HiPaperAirplane } from 'react-icons/hi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { Input } from 'components/Input'

import styles from './styles.module.scss'

const Solution = zod.object({
  repository_url: zod
    .string()
    .min(1, { message: 'A url do repositório é obrigatória' })
    .startsWith('https://git', {
      message: 'O repositório deverá ser do github ou gitlab'
    })
})

const SolutionChallengePage = () => {
  const useFormMethods = useForm({
    mode: 'all',
    resolver: zodResolver(Solution)
  })

  const onSubmit = async (data: any): Promise<void> => {
    console.log(data)
  }

  return (
    <FormProvider {...useFormMethods}>
      <form
        className={styles.container}
        onSubmit={useFormMethods.handleSubmit(onSubmit)}
      >
        <h1>Formulário para enviar o desafio</h1>

        <Input
          type="url"
          label="Repositório"
          name="repository_url"
          placeholder="Link do repositório do github"
        />

        <Input
          label="Visualização"
          name="solution_url"
          placeholder="Link para visualizar o projeto"
        />

        <Input
          label="Post Linkedin"
          name="linkedin_post"
          placeholder="Link do post sobre a solução do desafio"
        />

        <Input
          label="Link de compartilhamento"
          name="shared_url"
          placeholder="Url ao compartilhar a chamada do desafio"
        />

        <button type="submit">
          <HiPaperAirplane />
          Enviar
        </button>
      </form>
    </FormProvider>
  )
}

export default SolutionChallengePage
