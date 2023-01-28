import { PrismicRichText } from '@prismicio/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Challenge } from 'types'
import { ChallengeProvider } from 'hooks'
import { CACHE_PAGE } from 'utils/constants'
import { formattedChallenge } from 'utils/format'
import { createClientPrismic } from 'service/prismic'
import challengesSlug from 'utils/data/challenges.json'

import {
  ChallengeNavigation,
  ChallengeHeader,
  AuthorCard
} from 'components/Challenge/'
import { SEO } from 'components/SEO'

import styles from './styles.module.scss'

const ChallengePage: NextPage<Challenge> = challenge => (
  <ChallengeProvider challenge={challenge}>
    <SEO
      tabName={`Desafio ${challenge.name}`}
      title={`Desafio ${challenge.name} do brchallenges`}
      description={challenge.description}
      image={challenge.image.url}
    />

    <ChallengeHeader />

    <div className={styles.content}>
      <ChallengeNavigation />

      <div className={styles.challenge}>
        <h1>{challenge.name}</h1>

        <div className={styles.challenge__content}>
          <PrismicRichText field={challenge.content} />

          <h2>Protótipo do desafio</h2>

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
  const paths = challengesSlug.map(slug => `/desafio/${slug}`)

  return { fallback: 'blocking', paths }
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
