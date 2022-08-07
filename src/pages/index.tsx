import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { prismic } from 'service/prismic'
import { Challenge } from 'types/challenge'
import { formattedChallange } from 'utils/format'
import { ChallengeCard } from 'components/ChallengeCard/'

import styles from 'styles/home.module.scss'

interface HomePageProps {
  challenges: Challenge[]
}

const HomePage: NextPage<HomePageProps> = ({ challenges }) => (
  <section className={styles.home}>
    <ChallengeCard challengeNumber={1} {...challenges[0]} />
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

  const client = prismic({ req })
  const response = await client.getAllByType('challenges', {
    pageSize: 5
  })

  const challenges = response.map(formattedChallange)

  return {
    props: {
      challenges
    }
  }
}

export default HomePage
