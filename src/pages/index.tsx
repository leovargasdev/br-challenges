import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { ChallengeCard } from 'components/ChallengeCard/'

import styles from 'styles/home.module.scss'

const HomePage: NextPage = () => {
  return (
    <section className={styles.home}>
      <ChallengeCard challengeNumber={1} />
      <ChallengeCard challengeNumber={2} isSubmited />
      <ChallengeCard challengeNumber={3} />
      <ChallengeCard challengeNumber={4} />
    </section>
  )
}

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

  return { props: {} }
}

export default HomePage
