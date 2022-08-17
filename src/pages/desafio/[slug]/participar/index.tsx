import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { HiPaperAirplane } from 'react-icons/hi'
import { GetServerSideProps, NextPage } from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { SEO } from 'components/SEO'
import { Input, RadioGroup } from 'components/Form'

import api from 'service/api'
import type { Solution } from 'types'
import { zodSolutionSchema, type SolutionForm } from 'utils/zod'
import { connectMongoose, SolutionModel } from 'service/mongoose'

import styles from './styles.module.scss'

const SolutionChallengePage: NextPage<Solution> = solution => {
  const router = useRouter()

  const useFormMethods = useForm<SolutionForm>({
    mode: 'all',
    resolver: zodResolver(zodSolutionSchema),
    defaultValues: solution
  })

  const onSubmit = async (data: SolutionForm): Promise<void> => {
    const challenge_id = router.query.slug

    try {
      await api.post(`challenge/${challenge_id}/solution`, data)

      router.push('/')
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

        <RadioGroup
          name="level"
          label="Selecione a dificuldade"
          options={[
            { value: 'easy', label: 'Fácil' },
            { value: 'medium', label: 'Médio' },
            { value: 'hard', label: 'Difícil' }
          ]}
        />

        <button
          type="submit"
          className={'button '.concat(styles.button__submit)}
        >
          <HiPaperAirplane />
          Enviar
        </button>
      </form>
    </FormProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const session = await getSession({ req })

  if (session === null) {
    return {
      props: {},
      redirect: {
        destination: '/login'
      }
    }
  }

  const challenge_id = query.slug as string
  const { _id: user_id, challenges } = session.user

  const isSolution = challenges.includes(challenge_id)

  if (!isSolution) {
    return { props: {} }
  }

  await connectMongoose()
  const queryMongo = { user_id, challenge_id }
  const ignoreFields = { createdAt: 0, updatedAt: 0, _id: 0, user_id: 0 }
  const solution = await SolutionModel.findOne(queryMongo, ignoreFields)

  return {
    props: solution._doc
  }
}

export default SolutionChallengePage
