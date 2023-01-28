import { useState } from 'react'
import { GoInfo } from 'react-icons/go'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { Tooltip } from 'components/Tooltip'
import { SolutionCard } from 'components/SolutionCard'

import api from 'service/api'
import { ChallengeProvider } from 'hooks'
import { formattedChallenge } from 'utils/format'
import { createClientPrismic } from 'service/prismic'
import challengesSlug from 'utils/data/challenges.json'
import { CACHE_PAGE, LEVELS_TYPE } from 'utils/constants'
import type { Challenge, Solution, SolutionLevel } from 'types'

import styles from './styles.module.scss'
interface PageProps {
  userLikes: {
    easy: string
    medium: string
    hard: string
  }
  challenge: Challenge
  solutions: Solution[]
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = challengesSlug.map(slug => `/desafio/${slug}/participantes`)

  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async ({
  previewData,
  params
}) => {
  const challenge_id = String(params?.slug)

  const prismic = createClientPrismic({ previewData })

  const prismicChallenge = await prismic.getByUID<any>(
    'challenges',
    challenge_id
  )

  const challenge = formattedChallenge(prismicChallenge)

  const response = await api.get(
    `${process.env.NEXTAUTH_URL}/api/challenge/${challenge_id}/participants`
  )

  return {
    props: { challenge, ...response.data },
    revalidate: CACHE_PAGE
  }
}

export default ChallengeParticipantsPage
