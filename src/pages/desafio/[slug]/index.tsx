import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { PrismicNextImage } from '@prismicio/next'
import { HiOutlineClock, HiPencilAlt } from 'react-icons/hi'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { SEO } from 'components/SEO'
import { AuthorCard } from 'components/AuthorCard'

import { Challenge } from 'types/challenge'
import { formattedChallenge, getFullDate } from 'utils/format'
import { createClientPrismic, collectionSlugs } from 'service/prismic'

import styles from './styles.module.scss'

const ChallengePage: NextPage<Challenge> = challenge => {
  const { status } = useSession()

  return (
    <div className={styles.challenge}>
      <SEO
        tabName={`Desafio - ${challenge.title}`}
        title={`Desafio - ${challenge.title}`}
        description="Venha confirir esse desafio incrivel"
      />

      <div className={styles.challenge__image}>
        <PrismicNextImage
          field={challenge.image}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h1>{challenge.title}</h1>

      <time>
        <HiOutlineClock />
        {getFullDate(challenge.deadline)}
      </time>

      <div className={styles.challenge__content}>
        <span dangerouslySetInnerHTML={{ __html: challenge.content || '' }} />

        <h2>Protótipo do desafio</h2>

        <iframe
          allowFullScreen
          src={`https://www.figma.com/embed?embed_host=astra&url=${challenge.prototype_url}`}
        />
      </div>

      <Link href={challenge.participate_url}>
        <a
          aria-disabled={status !== 'authenticated'}
          className={'button '.concat(styles.challenge__solution)}
        >
          <HiPencilAlt />
          Participar
        </a>
      </Link>

      <AuthorCard {...challenge.author} />
    </div>
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

  const challenge = await prismic.getByUID('challenges', challengeSlug)

  return { props: formattedChallenge(challenge), revalidate: 60 * 5 }
}

export default ChallengePage
