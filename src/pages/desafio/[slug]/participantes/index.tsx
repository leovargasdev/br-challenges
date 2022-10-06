import { useState } from 'react'
import { GoInfo } from 'react-icons/go'
import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { Tooltip } from 'components/Tooltip'
import { SolutionCard } from 'components/SolutionCard'
import { ChallengeHeaderSmall } from 'components/Challenge'

import { ChallengeProvider } from 'hook/useChallenge'
import { createClientPrismic } from 'service/prismic'
import { formattedChallenge, formattedSolution } from 'utils/format'
import type { Challenge, Like, Solution, SolutionLevel } from 'types'
import { connectMongoose, LikeModel, SolutionModel } from 'service/mongoose'

import styles from './styles.module.scss'

interface ListSolutions {
  featured: Solution[]
  published: Solution[]
}

interface PageProps {
  userLikes: {
    easy: string
    medium: string
    hard: string
  }
  challenge: Challenge
  solutions: ListSolutions
}

const ChallengeParticipantsPage: NextPage<PageProps> = ({
  challenge,
  solutions,
  userLikes
}) => {
  const [solutionsLike, setSolutionsLike] = useState(userLikes)

  const handleLikeSolution = (
    solutionId: string,
    level: SolutionLevel
  ): void => {
    setSolutionsLike(state => ({ ...state, [level]: solutionId }))
  }

  return (
    <ChallengeProvider challenge={challenge}>
      <SEO
        tabName={`Participantes do desafio ${challenge.name}`}
        title={`Participantes do desafio ${challenge.name}`}
        description={`Veja as soluções do desafio ${challenge.name}`}
      />

      <ChallengeHeaderSmall />

      <div className={styles.container}>
        <div className={styles.listSolutions}>
          <section>
            <h2>
              Soluções em destaque
              <Tooltip icon={<GoInfo />}>
                Soluções que estão aptas a participar da premiação do desafio,
                por terem entregue até a data solicitada e atendido os critérios
                de aceite. No período de votação do desafio, as soluções dessa
                lista podem receber likes dos usuários da plataforma.
              </Tooltip>
            </h2>

            <ul className={styles.solutions}>
              {solutions.featured.map(solution => (
                <SolutionCard
                  key={solution._id}
                  solution={solution}
                  onLike={handleLikeSolution}
                  isLike={solutionsLike[solution.level] === solution._id}
                />
              ))}
            </ul>
          </section>

          {!!solutions.published.length && (
            <section>
              <h2>
                Outras soluções
                <Tooltip icon={<GoInfo />}>
                  Lista das demais soluções, são envios que foram entregues fora
                  da data solicitada ou foram desclassificados por algum motivo.
                </Tooltip>
              </h2>

              <ul className={styles.solutions}>
                {solutions.published.map(solution => (
                  <SolutionCard
                    key={solution._id}
                    solution={solution}
                    onLike={handleLikeSolution}
                    isLike={solutionsLike[solution.level] === solution._id}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* <div>
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
        </div> */}
      </div>
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

  const userLikes = {
    easy: '',
    medium: '',
    hard: ''
  }

  if (session) {
    const isUserLikes: Like[] = await LikeModel.find({
      user_id: session.user._id,
      challenge_id
    })

    if (isUserLikes) {
      isUserLikes.forEach(like => {
        userLikes[like.level] = like.solution_id.toString()
      })
    }
  }

  const result = solutions.reduce(
    (acc, solution) => {
      const solutionType = solution.status

      if (solutionType === 'unpublish') {
        return acc
      }

      acc[solutionType].push(formattedSolution(solution))

      return acc
    },
    { featured: [], published: [] } as ListSolutions
  )

  return {
    props: {
      challenge,
      userLikes,
      solutions: result
    }
  }
}

export default ChallengeParticipantsPage
