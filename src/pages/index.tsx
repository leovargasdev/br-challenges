import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { ChallengeCard } from 'components/ChallengeCard'

import { Challenge } from 'types'
import { createClientPrismic } from 'service/prismic'
import { connectMongoose, SolutionModel } from 'service/mongoose'
import { getListChallenges, getParticipants } from 'utils/format/challenge'

import styles from 'styles/home.module.scss'

interface PageProps {
  challenges: Challenge[]
}

const HomePage: NextPage<PageProps> = ({ challenges }) => (
  <section className={styles.home}>
    <SEO
      tabName="Home"
      title="Página inicial"
      description="Essa eh a página inicial"
    />
    {challenges.map(challenge => (
      <ChallengeCard key={challenge.id} {...challenge} />
    ))}
  </section>
)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session === null) {
    return {
      props: {},
      redirect: {
        destination: '/login'
      }
    }
  }

  try {
    const prismic = createClientPrismic({ req })

    const response = await prismic.getAllByType<any>('challenges')

    const challenges = await getListChallenges(
      response,
      session.user.challenges
    )

    await connectMongoose()

    const partipants = await SolutionModel.aggregate([
      { $group: { _id: '$challenge_id', count: { $sum: 1 } } }
    ])

    return {
      props: {
        challenges: getParticipants({
          challenges,
          partipants
        })
      }
    }
  } catch (err) {
    console.log(err)
  }

  return { props: { challenges: [] } }
}

export default HomePage
