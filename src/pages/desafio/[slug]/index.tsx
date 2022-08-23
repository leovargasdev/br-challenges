import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { HiOutlineClock, HiPencilAlt } from 'react-icons/hi'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { AuthorCard } from 'components/AuthorCard'
import { ChallengeHeader } from 'components/Challenge'
import { LinkWithPreview } from 'components/LinkWithPreview'

import { Challenge } from 'types'
import { FULL_DATE } from 'constants/date'
import { formattedChallenge, getFullDate } from 'utils/format'
import { createClientPrismic, collectionSlugs } from 'service/prismic'

import styles from './styles.module.scss'
import { PrismicRichText } from '@prismicio/react'

const ChallengePage: NextPage<Challenge> = challenge => {
  const { status } = useSession()

  const disabledButtonSolution =
    status !== 'authenticated' ||
    ['closed', 'finished'].includes(challenge.status.type)

  return (
    <>
      <SEO
        tabName={`Desafio - ${challenge.title}`}
        title={`Desafio - ${challenge.title}`}
        description="Venha confirir esse desafio incrivel"
      />

      <ChallengeHeader {...challenge} />

      <div className={styles.challenge}>
        {/* <time>
          <HiOutlineClock />
          {getFullDate(challenge.deadline, FULL_DATE)}
        </time> */}

        <div className={styles.challenge__content}>
          <PrismicRichText
            field={challenge.content}
            components={{
              hyperlink: ({ node, children }) => (
                <LinkWithPreview node={node}>{children}</LinkWithPreview>
              )
            }}
          />

          <h2>Protótipo do desafio</h2>

          <iframe
            allowFullScreen
            src={`https://www.figma.com/embed?embed_host=astra&url=${challenge.prototype_url}`}
          />
        </div>

        <Link href={challenge.participate_url}>
          <a
            aria-disabled={disabledButtonSolution}
            className={'button '.concat(styles.challenge__solution)}
          >
            <HiPencilAlt />
            Participar
          </a>
        </Link>

        <AuthorCard {...challenge.author} />
      </div>
    </>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await collectionSlugs('/desafio', 'challenges')

  return { fallback: 'blocking', paths }
}

export const getStaticProps: GetStaticProps = async props => {
  const { params, previewData } = props

  const challengeSlug = String(params?.slug)

  const prismic = createClientPrismic({ previewData })

  const challenge = await prismic.getByUID<any>('challenges', challengeSlug)

  return {
    props: formattedChallenge(challenge),
    revalidate: 60 * 5
  }
}

export default ChallengePage
