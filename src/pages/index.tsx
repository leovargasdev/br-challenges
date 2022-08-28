import { GetStaticProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { ChallengeCard } from 'components/Challenge'

import { Challenge } from 'types'
import { SMALL_CACHE_PAGE } from 'utils/constants'
import { createClientPrismic } from 'service/prismic'
import { getListChallenges, getParticipants } from 'utils/format'
import { connectMongoose, SolutionModel } from 'service/mongoose'

import styles from 'styles/home.module.scss'

interface PageProps {
  challenges: Challenge[]
}

const HomePage: NextPage<PageProps> = ({ challenges }) => (
  <section className={styles.home}>
    <SEO
      tabName="Listagem dos desafios"
      title="Listagem dos desafios"
      description="Navegue pela nossa lista de desafios e encontre um projeto interessante para condificar"
    />
    {challenges.map(challenge => (
      <ChallengeCard key={challenge.id} {...challenge} />
    ))}
  </section>
)

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  try {
    const prismic = createClientPrismic({ previewData })

    const response = await prismic.getAllByType<any>('challenges')

    const challenges = getListChallenges(response, [])

    await connectMongoose()

    const participants = await SolutionModel.aggregate([
      { $group: { _id: '$challenge_id', count: { $sum: 1 } } }
    ])

    return {
      props: {
        challenges: getParticipants({
          challenges,
          participants
        })
      },
      revalidate: SMALL_CACHE_PAGE
    }
  } catch (err) {
    console.log(err)
  }

  return { props: { challenges: [] }, revalidate: 10 }
}

export default HomePage
