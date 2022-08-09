import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { ChallengeCard } from 'components/ChallengeCard'

import { Challenge } from 'types/challenge'
import { formattedChallenge } from 'utils/format'
import { createClientPrismic } from 'service/prismic'

import styles from 'styles/home.module.scss'
import { SEO } from 'components/SEO'

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
    {challenges.map((challenge, index) => (
      <ChallengeCard
        key={challenge.id}
        challengeNumber={index}
        {...challenge}
      />
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

  const prismic = createClientPrismic({ req })

  const response = await prismic.getAllByType('challenges')

  const challenges = response.map(formattedChallenge)

  return {
    props: {
      challenges
    }
  }
}

export default HomePage
