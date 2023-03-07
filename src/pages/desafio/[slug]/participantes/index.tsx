import { useState } from 'react'
import { GoInfo } from 'react-icons/go'
import { getSession } from 'next-auth/react'
import { GetServerSideProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { Tooltip } from 'components/Tooltip'
import { SolutionCard } from 'components/SolutionCard'

import api from 'service/api'
import { ChallengeProvider } from 'hooks'
import { LEVELS_TYPE } from 'utils/constants'
import { formattedChallenge } from 'utils/format'
import { createClientPrismic } from 'service/prismic'
import type { Challenge, Solution, SolutionLevel } from 'types'

import styles from './styles.module.scss'

interface PageProps {
  userLikes: {
    easy: string
    medium: string
    hard: string
  }
  checktime: string
  challenge: Challenge
  solutions: Solution[]
}

const ChallengeParticipantsPage: NextPage<PageProps> = ({
  challenge,
  solutions,
  userLikes,
  checktime
}) => {
  console.log(checktime)
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
        title={`Soluções do desafio ${challenge.name}: veja como outros participantes resolvera`}
        description={`Veja como os outros participantes resolveram o desafio ${challenge.name}. Aprenda com a experiência deles e amplie seus conhecimentos ao navegar no código fonte.`}
        image={challenge.image.url}
      />

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

            <div className={styles.levels}>
              {LEVELS_TYPE.map(level => {
                const solutionsLevel = solutions.filter(s => s.level === level)

                if (solutionsLevel.length === 0) return <></>

                return (
                  <ul className={styles.solutions} key={level}>
                    {solutionsLevel.map(solution => (
                      <SolutionCard
                        key={solution._id}
                        solution={solution}
                        onLike={handleLikeSolution}
                        isLike={solutionsLike[solution.level] === solution._id}
                      />
                    ))}
                  </ul>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  res,
  req,
  params
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  )

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

  const user_id = session?.user._id
  const response = await api.get(`challenge/${challenge_id}/participants`, {
    params: { user_id }
  })

  const { userLikes, solutions } = response.data

  return {
    props: {
      challenge,
      userLikes,
      solutions,
      checktime: new Date().toISOString()
    }
  }
}

export default ChallengeParticipantsPage
