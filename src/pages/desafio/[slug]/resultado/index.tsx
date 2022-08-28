import { GoInfo } from 'react-icons/go'
import { useSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { formattedChallenge } from 'utils/format'
import { ChallengeHeader } from 'components/Challenge'

import { Challenge } from 'types'
import contributors from 'utils/constants/contributors'
import { createClientPrismic } from 'service/prismic'

import styles from './styles.module.scss'
import { SolutionCard } from 'components/SolutionCard'
import { Tooltip } from 'components/Tooltip'

type LevelProps = 'hard' | 'medium' | 'easy'

interface SolutionProps {
  level: LevelProps
  createdAt: string
}

const MOCK_SOLUTIONS: SolutionProps[] = [
  { level: 'hard', createdAt: '2022-08-20' },
  { level: 'medium', createdAt: '2022-08-20' },
  { level: 'medium', createdAt: '2022-08-22' },
  { level: 'easy', createdAt: '2022-08-21' },
  { level: 'medium', createdAt: '2022-08-10' },
  { level: 'hard', createdAt: '2022-08-15' },
  { level: 'medium', createdAt: '2022-08-01' }
]

const ChallengeResultsPage: NextPage<Challenge> = challenge => {
  const { data } = useSession()

  return (
    <>
      <ChallengeHeader {...challenge} />

      <section className={styles.container}>
        <div>
          <h2>Listagem das soluções</h2>

          <ul className={styles.solutions}>
            {MOCK_SOLUTIONS.map(solution => (
              <SolutionCard
                solution={solution}
                participant={{
                  image: 'https://avatars.githubusercontent.com/u/11177716?v=4',
                  name: 'Leonardo Vargas'
                }}
                key={solution.createdAt}
              />
            ))}
          </ul>
        </div>

        <div>
          <h2>
            Apoiadores
            <Tooltip icon={<GoInfo />}>
              Lista das pessoas que contribuiram com algum valor para a
              premiação do desafio.
            </Tooltip>
          </h2>

          <ul className={styles.contributors}>
            {contributors.map(contributor => (
              <li key={contributor}>{contributor}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const challengeSlug = String(params?.slug)

  const prismic = createClientPrismic({ req })

  const challenge = await prismic.getByUID<any>('challenges', challengeSlug)

  return {
    props: formattedChallenge(challenge)
  }
}

export default ChallengeResultsPage
