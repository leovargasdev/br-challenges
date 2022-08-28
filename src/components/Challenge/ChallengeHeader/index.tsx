import Link from 'next/link'
import { useRouter } from 'next/router'
import { PrismicNextImage } from '@prismicio/next'
import { HiDocumentText, HiUserGroup } from 'react-icons/hi'

import { Challenge } from 'types'

import styles from './styles.module.scss'

export const ChallengeHeader = ({
  title,
  author,
  image,
  status
}: Challenge) => {
  const router = useRouter()

  const challengeSlug = router.query?.slug
  const isResultsPage = router.asPath.includes(`${challengeSlug}/resultado`)

  return (
    <header className={styles.header}>
      <div className={styles.header__image}>
        <PrismicNextImage field={image} layout="fill" objectFit="cover" />
      </div>

      <h3>{author.name}</h3>

      <h1>{title}</h1>

      <div className={styles.header__links}>
        <Link href={`/desafio/${challengeSlug}`}>
          <a className="button outline" aria-hidden={isResultsPage}>
            <HiDocumentText />
            Detalhes
          </a>
        </Link>

        {status.type === 'finished' && (
          <Link href={`/desafio/${challengeSlug}/resultado`}>
            <a className="button outline" aria-hidden={!isResultsPage}>
              <HiUserGroup />
              Ver participantes
            </a>
          </Link>
        )}
      </div>
    </header>
  )
}
