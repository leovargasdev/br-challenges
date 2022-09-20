import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'

import styles from './styles.module.scss'
import { useChallenge } from 'hook/useChallenge'

export const ChallengeHeaderSmall = () => {
  const challenge = useChallenge()

  return (
    <header className={styles.header} data-size="small">
      <div className={styles.header__image}>
        <PrismicNextImage
          field={challenge.image}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h3>{challenge.authors[0].name}</h3>

      <h1>
        <Link href={'/desafio/'.concat(challenge.id)}>
          <a>{challenge.name}</a>
        </Link>
      </h1>
    </header>
  )
}
