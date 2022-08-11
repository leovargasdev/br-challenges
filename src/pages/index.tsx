import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { ChallengeCard } from 'components/ChallengeCard'

import { Challenge } from 'types/challenge'
import { createClientPrismic } from 'service/prismic'
import { getChallengesInHome } from 'utils/format/challenge'

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

  const prismic = createClientPrismic({ req })

  const response = await prismic.getAllByType('challenges')

  const challenges = getChallengesInHome(response, session.user.challenges)

  return {
    props: {
      challenges
    }
  }
}

export default HomePage
