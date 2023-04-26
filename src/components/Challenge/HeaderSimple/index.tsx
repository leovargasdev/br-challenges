import { PrismicNextImage } from '@prismicio/next'

import { useChallenge } from 'hooks'

import styles from './styles.module.scss'

export const ChallengeHeaderSimple = () => {
  const { image } = useChallenge()

  return (
    <header className={styles.header}>
      <div className={styles.header__image}>
        <PrismicNextImage
          field={image}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
        />
      </div>
    </header>
  )
}
