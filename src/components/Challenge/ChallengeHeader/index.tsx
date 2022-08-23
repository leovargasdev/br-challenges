import Link from 'next/link'
import { useRouter } from 'next/router'
import { PrismicNextImage } from '@prismicio/next'
import type { ImageFieldImage } from '@prismicio/types'
import { HiDocumentText, HiUserGroup } from 'react-icons/hi'

import { Author } from 'types/author'

import styles from './styles.module.scss'

interface ChallengeHeaderProps {
  title: string
  author: Author
  image: ImageFieldImage
}

export const ChallengeHeader = ({
  title,
  author,
  image
}: ChallengeHeaderProps) => {
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

        <Link href={`/desafio/${challengeSlug}/resultado`}>
          <a className="button outline" aria-hidden={!isResultsPage}>
            <HiUserGroup />
            Ver participantes
          </a>
        </Link>
      </div>
    </header>
  )
}
