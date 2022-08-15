import { getSession } from 'next-auth/react'
import { compareAsc, isPast, parseISO } from 'date-fns'
import { GetServerSideProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { ChallengeCard } from 'components/ChallengeCard'

import { Challenge } from 'types'
import { createClientPrismic } from 'service/prismic'
import { formattedChallenge } from 'utils/format/challenge'

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

    const data = await prismic.getAllByType('challenges')

    const challenges = data.map(challenge =>
      formattedChallenge(challenge, session.user.challenges)
    )

    challenges.sort((a, b) =>
      compareAsc(parseISO(a.deadline), parseISO(b.deadline))
    )

    const order = challenges.reduce(
      (acc: any, item) => {
        const { after, before } = acc

        const deadline = isPast(parseISO(item.deadline))
        if (deadline || item.finished) {
          return {
            after: [...after, item],
            before
          }
        }

        return {
          before: [...before, item],
          after
        }
      },
      { after: [], before: [] }
    )

    return {
      props: {
        challenges: [...order.before, ...order.after]
      }
    }
  } catch (err) {
    console.log(err)
  }

  return { props: { challenges: [] } }
}

export default HomePage
