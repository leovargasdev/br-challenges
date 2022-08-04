import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { ChallengeCard } from 'components/ChallengeCard'

import styles from 'styles/home.module.scss'

const HomePage: NextPage = () => (
  <section className={styles.home}>
    <ChallengeCard />
    <ChallengeCard />
    <ChallengeCard />
    <ChallengeCard />
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

  return { props: {} }
}

export default HomePage
