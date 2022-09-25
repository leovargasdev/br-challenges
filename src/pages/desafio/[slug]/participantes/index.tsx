import { useState } from 'react'
import { GoInfo } from 'react-icons/go'
import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { Tooltip } from 'components/Tooltip'
import { SolutionCard } from 'components/SolutionCard'
import { ChallengeHeaderSmall } from 'components/Challenge'

import { Challenge, Solution } from 'types'
import { contributorsMock } from 'utils/mock'
import { ChallengeProvider } from 'hook/useChallenge'
import { createClientPrismic } from 'service/prismic'
import { formattedChallenge, formattedSolution } from 'utils/format'
import { connectMongoose, LikeModel, SolutionModel } from 'service/mongoose'

import styles from './styles.module.scss'

interface PageProps {
  userLike: string
  challenge: Challenge
  solutions: Solution[]
}

const ChallengeParticipantsPage: NextPage<PageProps> = ({
  challenge,
  solutions,
  userLike
}) => {
  const [solutionLike, setSolutionLike] = useState<string>(userLike)

  const handleLikeSolution = (solutionId: string): void => {
    setSolutionLike(solutionId)
  }

  return (
    <ChallengeProvider challenge={challenge}>
      <SEO
        tabName={`Participantes do desafio ${challenge.name}`}
        title={`Participantes do desafio ${challenge.name}`}
        description={`Veja as soluções do desafio ${challenge.name}`}
      />

      <ChallengeHeaderSmall />

      <section className={styles.container}>
        <div>
          <h2>Listagem das soluções</h2>

          <ul className={styles.solutions}>
            {solutions.map(
              solution =>
                solution.status !== 'unpublish' && (
                  <SolutionCard
                    key={solution._id}
                    solution={solution}
                    solutionLike={solutionLike}
                    onLike={handleLikeSolution}
                  />
                )
            )}
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
            {contributorsMock.map(contributor => (
              <li key={contributor}>{contributor}</li>
            ))}
          </ul>
        </div>
      </section>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const session = await getSession({ req })
  const isAdmin = session?.user.role === 'admin'

  const challenge_id = String(params?.slug)

  const prismic = createClientPrismic({ req })

  const prismicChallenge = await prismic.getByUID<any>(
    'challenges',
    challenge_id
  )
  const challenge = formattedChallenge(prismicChallenge)

  if (challenge.status_prismic === 'active' && !isAdmin) {
    return {
      props: {},
      redirect: {
        destination: '/desafio/'.concat(challenge_id),
        permanent: true
      }
    }
  }

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
    { $project: { user_id: 0, createdAt: 0 } }
  ]).match({ challenge_id })

  let userLike = ''

  if (session) {
    const isUserLike = await LikeModel.findOne({
      user_id: session?.user._id,
      challenge_id
    })

    if (isUserLike) {
      userLike = isUserLike.solution_id.toString()
    }
  }

  return {
    props: {
      challenge,
      userLike,
      solutions: solutions
        .map(formattedSolution)
        .sort((a, b) => a.status.localeCompare(b.status))
    }
  }
}

export default ChallengeParticipantsPage
