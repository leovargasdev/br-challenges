import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { SEO } from 'components/SEO'

import api from 'service/api'
import { ChallengeProvider } from 'hooks'
import { formattedChallenge } from 'utils/format'
import { createClientPrismic } from 'service/prismic'
import { CACHE_PAGE } from 'utils/constants'
import type { Challenge, Solution, SolutionLevel } from 'types'

import styles from './styles.module.scss'
import { ChallengeHeaderSimple } from 'components/Challenge'
import Image from 'next/image'
import { IconGitHub, IconHeart, IconLinkedin } from 'components/SVG'
import { SolutionCard } from 'components/SolutionCardNew'
import { useState } from 'react'

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

  console.log(solutionsLike)

  return (
    <ChallengeProvider challenge={challenge}>
      <SEO
        tabName={`Participantes do desafio ${challenge.name}`}
        title={`Soluções do desafio ${challenge.name}: veja como outros participantes resolvera`}
        description={`Veja como os outros participantes resolveram o desafio ${challenge.name}. Aprenda com a experiência deles e amplie seus conhecimentos ao navegar no código fonte.`}
        image={challenge.image.url}
      />

      <ChallengeHeaderSimple />

      <section className={styles.container}>
        <h1>Participantes do desafio</h1>

        <ul className={styles.solutions}>
          {solutions.map(solution => (
            <SolutionCard
              key={solution._id}
              solution={solution}
              onLike={handleLikeSolution}
              isLike={solutionsLike[solution.level] === solution._id}
            />
          ))}
        </ul>
      </section>
    </ChallengeProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = challengesSlug.map(slug => `/desafio/${slug}/participantes-new`)

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
    props: {
      challenge,
      ...response.data
    },
    revalidate: CACHE_PAGE
  }
}

export default ChallengeParticipantsPage
