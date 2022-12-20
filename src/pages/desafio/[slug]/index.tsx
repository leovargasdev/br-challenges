import { PrismicRichText } from '@prismicio/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { SEO } from 'components/SEO'

import { Challenge } from 'types'
import { CACHE_PAGE } from 'utils/constants'
import { formattedChallenge } from 'utils/format'
import { ChallengeProvider } from 'hook/useChallenge'
import { createClientPrismic } from 'service/prismic'

import { ChallengeNavigation, ChallengeHeader } from 'components/Challenge/'

import styles from './styles.module.scss'
import { AuthorCard } from 'components/AuthorCard'

const ChallengePage: NextPage<Challenge> = challenge => (
  <ChallengeProvider challenge={challenge}>
    <SEO
      tabName={`Desafio - ${challenge.name}`}
      title={`Desafio ${challenge.name} do brchallenges`}
      description={challenge.description}
      image={challenge.image.url}
    />

    <ChallengeHeader />

    <div className={styles.content}>
      <ChallengeNavigation />

      <div className={styles.challenge} id="challenge-description">
        <h1>{challenge.name}</h1>

        <div className={styles.challenge__content}>
          <PrismicRichText field={challenge.content} />

          <h2 id="challenge-prototype">Protótipo do desafio</h2>

          <iframe
            allowFullScreen
            src={`https://www.figma.com/embed?embed_host=astra&url=${challenge.prototype_url}`}
          />

          <AuthorCard {...challenge.authors[0]} />
        </div>
      </div>
    </div>
  </ChallengeProvider>
)

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = []

  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async props => {
  const { params, previewData } = props

  const challengeSlug = String(params?.slug)

  const prismic = createClientPrismic({ previewData })

  const challenge = await prismic.getByUID<any>('challenges', challengeSlug)

  return {
    props: formattedChallenge(challenge),
    revalidate: CACHE_PAGE
  }
}

export default ChallengePage
