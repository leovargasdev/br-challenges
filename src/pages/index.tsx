import { asHTML } from '@prismicio/helpers'
import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { prismic } from 'service/prismic'
import { Challenge } from 'types/challenge'
import { ChallengeCard } from 'components/ChallengeCard/'

import styles from 'styles/home.module.scss'

interface HomePageProps {
  challenges: Challenge[]
}

const HomePage: NextPage<HomePageProps> = ({ challenges }) => {
  const CHALLENGE_MOCK = {
    id: 'batatinha123',
    title: 'Mount E Coast Photography',
    image: {
      alt: 'sahdaj',
      url: '/challenge-thumbs.png'
    },
    deadline: '2022-10-10',
    finished: false
  }

  return (
    <section className={styles.home}>
      <ChallengeCard challengeNumber={1} {...challenges[0]} />
      <ChallengeCard challengeNumber={2} isSubmited {...CHALLENGE_MOCK} />
      <ChallengeCard challengeNumber={3} {...CHALLENGE_MOCK} />
      <ChallengeCard challengeNumber={4} {...CHALLENGE_MOCK} />
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // const session = await getSession({ req })

  // if (session === null) {
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: '/login'
  //     }
  //   }
  // }

  const client = prismic({ req })
  const response = await client.getAllByType('challenges', { pageSize: 5 })

  const challenges = response.map(challenge => ({
    id: challenge.uid,
    name: challenge.data.name,
    title: challenge.data.title,
    finished: challenge.data.finished,
    content: asHTML(challenge.data.content),
    deadline: challenge.data.deadline,
    image: challenge.data.image,
    prototype_url: challenge.data.prototype.url
  }))

  return {
    props: {
      challenges
    }
  }
}

export default HomePage
