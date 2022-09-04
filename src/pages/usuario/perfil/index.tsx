import Link from 'next/link'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { HiRefresh, HiPencil, HiTrash } from 'react-icons/hi'

import { User } from 'types'
import api from 'service/api'
import { Input } from 'components/Form'
import { useToast } from 'contexts/Toast'
import { zodUserSchema, UserForm } from 'utils/zod'
import { createClientPrismic } from 'service/prismic'

import styles from './styles.module.scss'

interface UserChallenge {
  slug: string
  name: string
}

interface PageProps {
  user: User
  challenges: UserChallenge[]
}

const ProfilePage: NextPage<PageProps> = ({ user, challenges }) => {
  const router = useRouter()
  const toast = useToast()
  const useFormMethods = useForm<UserForm>({
    mode: 'all',
    resolver: zodResolver(zodUserSchema),
    defaultValues: user
  })

  const onSubmit = async (data: UserForm): Promise<void> => {
    try {
      await api.post('/user/update', data)
      toast.success('Sucesso', {
        description: 'Os dados foram atualizados com sucesso'
      })
      router.push('/')
    } catch (err) {
      console.log(err)
      toast.error('deu ruim')
    }
  }

  return (
    <section className={styles.container}>
      <FormProvider {...useFormMethods}>
        <form
          className={styles.form}
          onSubmit={useFormMethods.handleSubmit(onSubmit)}
        >
          <h2>Perfil</h2>

          <Input
            name="name"
            type="text"
            label="Nome"
            placeholder="Nome de usuário"
          />

          <Input
            type="text"
            name="bio"
            label="Bio"
            placeholder="Escreva algo sobre você"
          />

          <h2>Desafios que você está participando</h2>

          <ul className={styles.challenges}>
            {challenges.map(challenge => (
              <li key={challenge.slug} className={styles.challenge}>
                <strong>{challenge.name}</strong>
                <div>
                  <Link href={`/desafio/${challenge.slug}/participar`}>
                    <a className="button outline">
                      <HiPencil />
                      Editar solução
                    </a>
                  </Link>

                  <button className="button" disabled>
                    <HiTrash />
                    Excluir solução
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button type="submit" className={`button ${styles.button__submit}`}>
            <HiRefresh />
            Atualizar
          </button>
        </form>
      </FormProvider>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session?.user) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { user } = session

  const prismic = createClientPrismic({ req })

  const prismicChallenges = await prismic.getAllByUIDs<any>(
    'challenges',
    user.challenges
  )

  const challenges = prismicChallenges.map(challenge => ({
    slug: challenge.uid,
    name: challenge.data.name
  }))

  return {
    props: { user, challenges }
  }
}

export default ProfilePage
