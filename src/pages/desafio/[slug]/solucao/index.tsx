import { useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { HiPaperAirplane } from 'react-icons/hi'
import { GetServerSideProps, NextPage } from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { SEO } from 'components/SEO'
import { Input, RadioGroup } from 'components/Form'
import { ChallengeHeaderSmall } from 'components/Challenge'

import api from 'service/api'
import { Challenge, Solution } from 'types'
import { formattedChallenge } from 'utils/format'
import { createClientPrismic } from 'service/prismic'
import { zodSolutionSchema, SolutionForm } from 'utils/zod'
import { connectMongoose, SolutionModel } from 'service/mongoose'

import styles from './styles.module.scss'

const solutionLevels = [
  { value: 'easy', label: 'Fácil' },
  { value: 'medium', label: 'Médio' },
  { value: 'hard', label: 'Difícil' }
]

interface PageProps {
  solution: Solution
  challenge: Challenge
}

const SolutionChallengePage: NextPage<PageProps> = ({
  solution,
  challenge
}) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const useFormMethods = useForm<SolutionForm>({
    mode: 'all',
    resolver: zodResolver(zodSolutionSchema),
    defaultValues: solution
  })

  const onSubmit = async (data: SolutionForm): Promise<void> => {
    setLoading(true)
    const challenge_id = router.query.slug

    try {
      await api.post(`challenge/${challenge_id}/solution`, data)

      router.push('/')
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ChallengeHeaderSmall {...challenge} />

      <section className={styles.container}>
        <FormProvider {...useFormMethods}>
          <SEO
            tabName="Enviar solução"
            title="Enviar solução"
            description="Formulário para participar do desafio"
          />

          <form
            className={styles.form}
            onSubmit={useFormMethods.handleSubmit(onSubmit)}
          >
            <h2>Formulário de envio</h2>

            <Input
              type="url"
              label="Repositório"
              name="repository_url"
              placeholder="Link do repositório do github"
            />

            <Input
              name="url"
              type="url"
              label="Visualização"
              placeholder="Link para visualizar o projeto"
            />

            <Input
              label="Post do linkedin"
              name="linkedin_url"
              placeholder="Link do post sobre a solução do desafio"
            />

            <RadioGroup
              name="level"
              label="Selecione a dificuldade"
              options={solutionLevels}
            />

            <button
              type="submit"
              className={`button ${styles.button__submit} ${
                loading ? 'loading' : ''
              }`}
              disabled={loading}
            >
              <HiPaperAirplane />
              Enviar
            </button>
          </form>
        </FormProvider>
      </section>
    </>
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

  if (!challenges.includes(challenge_id)) {
    return {
      props: {},
      redirect: {
        destination: '/desafio/'.concat(challenge_id)
      }
    }
  }

  const isSolution = challenges.includes(challenge_id)

  try {
    const prismic = createClientPrismic({ req })
    const response = await prismic.getByUID<any>('challenges', challenge_id)

    const challenge = formattedChallenge(response)

    if (!isSolution) {
      return {
        props: { challenge }
      }
    }

    await connectMongoose()
    const queryMongo = { user_id, challenge_id }
    const ignoreFields = { createdAt: 0, updatedAt: 0, _id: 0, user_id: 0 }
    const solution = await SolutionModel.findOne(queryMongo, ignoreFields)

    return {
      props: {
        solution: solution._doc,
        challenge
      }
    }
  } catch (err) {
    console.log(err)
  }

  return {
    props: {},
    redirect: {
      permanent: true,
      destination: '/'
    }
  }
}

export default SolutionChallengePage
