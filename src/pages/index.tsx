import { GetStaticProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { ChallengeCard } from 'components/Challenge'

import { Challenge } from 'types'
import { createClientPrismic } from 'service/prismic'
import { getListChallenges, getParticipants } from 'utils/format'
import { ChallengeModel, connectMongoose, UserModel } from 'service/mongoose'

import styles from 'styles/home.module.scss'
import { CACHE_PAGE, SMALL_CACHE_PAGE } from 'utils/constants'

interface PageProps {
  challenges: Challenge[]
}

const HomePage: NextPage<PageProps> = ({ challenges }) => (
  <section className={styles.home}>
    <SEO
      tabName="Listagem dos desafios"
      title="Desafios Front-end: teste suas habilidades e aprenda novas tecnologias"
      description="Melhore suas habilidades em front-end com nossos desafios práticos e aprenda novas tecnologias. Nossa plataforma é perfeita para iniciantes e profissionais experientes. Participe agora e tenha ótimos projetos em seu portfólio!"
    />

    {/* <h1>Navegue pelos nossos desafios</h1> */}

    {challenges.map(challenge => (
      <ChallengeCard key={challenge.id} {...challenge} />
    ))}
  </section>
)

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  try {
    const prismic = createClientPrismic({ previewData })

    const response = await prismic.getAllByType<any>('challenges')

    let challenges = getListChallenges(response)

    await connectMongoose()

    const participants = await ChallengeModel.find()

    const users = await UserModel.find().limit(100).sort({ updatedAt: -1 })

    challenges = getParticipants({ challenges, participants, users })

    return {
      props: { challenges },
      revalidate: CACHE_PAGE
    }
  } catch (err) {
    console.log(err)
  }

  return { props: { challenges: [] }, revalidate: SMALL_CACHE_PAGE }
}

export default HomePage
