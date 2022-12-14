import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'

import { IconPerson, IconPlus } from 'components/SVG'

import styles from './styles.module.scss'
import { useChallenge } from 'hook/useChallenge'

export const ChallengeHeader = () => {
  const { image } = useChallenge()

  return (
    <header className={styles.header}>
      <div>
        <div className={styles.header__image}>
          <PrismicNextImage
            field={image}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        </div>

        <div className={styles.header__actions}>
          <button type="button" className="button">
            <IconPlus />
            Enviar solução
          </button>
          <button
            type="button"
            className={'button '.concat(styles.button__participate)}
          >
            <IconPlus />
            Quero participar
          </button>
          <Link href="/">
            <a className="button secondary">
              <IconPerson />
              Ver participantes
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}
