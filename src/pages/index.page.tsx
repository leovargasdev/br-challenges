import { GetStaticProps, NextPage } from 'next'

import { SEO, ChallengeCard } from 'components'
import type { Challenge } from 'types/challenge'

import styles from 'styles/home.module.scss'
import MOCK_CHALLENGES from 'mocks/challenges.json'

interface PageProps {
  challenges: Challenge[]
}

const HomePage: NextPage<PageProps> = ({ challenges }) => (
  <section className={styles.container}>
    <SEO
      tabName="Listagem dos desafios"
      title="Desafios Front-end: teste suas habilidades e aprenda novas tecnologias"
      description="Melhore suas habilidades em front-end com nossos desafios práticos e aprenda novas tecnologias. Nossa plataforma é perfeita para iniciantes e profissionais experientes. Participe agora e tenha ótimos projetos em seu portfólio!"
    />

    {challenges.map(challenge => (
      <ChallengeCard key={challenge.id} {...challenge} />
    ))}
  </section>
)

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  if (process.env.VERCEL_ENV !== 'production') {
    return { props: { challenges: MOCK_CHALLENGES }, revalidate: false }
  }

  // try {
  //   const prismic = createClientPrismic({ previewData })

  //   const response = await prismic.getAllByType('challenges')

  //   let challenges = getListChallenges(
  //     response as unknown as ChallengePrismic[]
  //   )

  //   await connectMongoose()

  //   const participants = await ChallengeModel.find()

  //   const users = await UserModel.find().limit(200).sort({ updatedAt: -1 })

  //   challenges = getParticipants({ challenges, participants, users })

  //   return {
  //     props: { challenges },
  //     revalidate: CACHE_PAGE
  //   }
  // } catch (err) {
  //   console.log(err)
  // }

  return { props: { challenges: [] } }
}

export default HomePage
