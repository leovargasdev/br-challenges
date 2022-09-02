import { GoInfo } from 'react-icons/go'
import { GetServerSideProps, NextPage } from 'next'

import { Tooltip } from 'components/Tooltip'
import { SolutionCard } from 'components/SolutionCard'
import { ChallengeHeader } from 'components/Challenge'

import { Challenge, Solution } from 'types'
import { formattedChallenge, formattedSolution } from 'utils/format'
import { createClientPrismic } from 'service/prismic'
import { contributorsMock } from 'utils/mock'
import { connectMongoose, SolutionModel } from 'service/mongoose'

import styles from './styles.module.scss'

interface PageProps {
  challenge: Challenge
  solutions: Solution[]
}

const ChallengeResultsPage: NextPage<PageProps> = ({
  challenge,
  solutions
}) => (
  <>
    <ChallengeHeader {...challenge} />
    <section className={styles.container}>
      <div>
        <h2>Listagem das soluções</h2>

        <ul className={styles.solutions}>
          {solutions.map(solution => (
            <SolutionCard {...solution} key={solution.repository_url} />
          ))}
        </ul>
      </div>

      <div>
        <h2>
          Apoiadores
          <Tooltip icon={<GoInfo />}>
            Lista das pessoas que contribuiram com algum valor para a premiação
            do desafio.
          </Tooltip>
        </h2>

        <ul className={styles.contributors}>
          {contributorsMock.map(contributor => (
            <li key={contributor}>{contributor}</li>
          ))}
        </ul>
      </div>
    </section>
  </>
)

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const challengeSlug = String(params?.slug)

  const prismic = createClientPrismic({ req })

  const challenge = await prismic.getByUID<any>('challenges', challengeSlug)

  await connectMongoose()

  const solutions: Solution[] = await SolutionModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user_id',
        foreignField: '_id',
        as: 'user',
        pipeline: [{ $project: { createdAt: 0, updatedAt: 0, _id: 0 } }]
      }
    },
    { $unwind: '$user' },
    { $project: { user_id: 0, _id: 0, createdAt: 0 } }
  ]).match({ challenge_id: challengeSlug })

  return {
    props: {
      challenge: formattedChallenge(challenge),
      solutions: solutions.map(formattedSolution)
    }
  }
}

export default ChallengeResultsPage
