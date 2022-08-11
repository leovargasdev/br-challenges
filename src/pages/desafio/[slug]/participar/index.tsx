import { useRouter } from 'next/router'
import { HiPaperAirplane } from 'react-icons/hi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { SEO } from 'components/SEO'
import { Input } from 'components/Input'

import api from 'service/api'
import styles from './styles.module.scss'
import { zodSolutionSchema } from 'utils/zod'

const SolutionChallengePage = () => {
  const router = useRouter()
  const useFormMethods = useForm({
    mode: 'all',
    resolver: zodResolver(zodSolutionSchema)
  })

  const onSubmit = async (data: any): Promise<void> => {
    try {
      const solution = {
        ...data,
        challenge_id: router.query.slug
      }

      await api.post('challenge/solution', solution)

      // CRIAR TOAST DE SUCESSO
      // router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FormProvider {...useFormMethods}>
      <SEO tabName="Participar do desafio" title="Participar do desafio" />

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

        <button type="submit" className="button">
          <HiPaperAirplane />
          Enviar
        </button>
      </form>
    </FormProvider>
  )
}

export default SolutionChallengePage
