import { GetStaticProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { ChallengeCard } from 'components/Challenge'

import { Challenge } from 'types'
import { createClientPrismic } from 'service/prismic'
import { getListChallenges, getParticipants } from 'utils/format'
import { ChallengeModel, connectMongoose } from 'service/mongoose'

import styles from 'styles/home.module.scss'
import { CACHE_PAGE, SMALL_CACHE_PAGE } from 'utils/constants'

interface PageProps {
  challenges: Challenge[]
}

const HomePage: NextPage<PageProps> = ({ challenges }) => (
  <section className={styles.home}>
    <SEO
      title="Desafios frontend para praticar as suas habilidades"
      description="Navegue pela nossa lista de desafios e encontre um projeto interessante para condificar"
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

    challenges = getParticipants({ challenges, participants })

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
