import { PrismicNextImage } from '@prismicio/next'
import { IconPerson } from 'components/SVG'

import { useChallenge } from 'hooks'

import styles from './styles.module.scss'

export const ChallengeHeaderSimple = () => {
  const { image, name, authors } = useChallenge()

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <PrismicNextImage
          field={image}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
        />

        <div className={styles.header__info}>
          <span>desafio</span>
          <h1>{name}</h1>
          <p title="Autor do layout do desafio">
            <IconPerson /> {authors[0].name}
          </p>
        </div>
      </div>
    </header>
  )
}
