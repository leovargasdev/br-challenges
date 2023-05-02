import Link from 'next/link'
import { useChallenge } from 'hooks'
import { IconPerson } from 'components/SVG'
import { PrismicNextImage } from '@prismicio/next'

import styles from './styles.module.scss'

export const ChallengeHeaderSimple = () => {
  const { image, name, authors, id } = useChallenge()

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
          <Link href={`/desafio/${id}`}>
            <a aria-label={`Link para a página do desafio ${name}`}>
              <h1>{name}</h1>
            </a>
          </Link>

          <p title="Autor do layout do desafio">
            <IconPerson /> {authors[0].name}
          </p>
        </div>
      </div>
    </header>
  )
}
