import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'
import { HiOutlineClock, HiFire, HiCalendar } from 'react-icons/hi'

import { Challenge } from 'types'
import styles from './styles.module.scss'
import { SHORT_DATE } from 'constants/date'
import { getDaysRemaining, getFullDate } from 'utils/format/'

export const ChallengeCard = (challenge: Challenge) => {
  const isClosed = ['finished', 'expired'].includes(challenge.status.type)

  return (
    <article className={`${styles.challenge} ${styles[challenge.status.type]}`}>
      {challenge.status.type !== 'active' && (
        <span
          className={styles.challenge__status}
          data-type={challenge.status.type}
        >
          {challenge.status.name}
        </span>
      )}

      <div className={styles.challenge__image}>
        <PrismicNextImage
          field={challenge.image}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={styles.challenge__content}>
        <small title="Autor do protótipo">{challenge.author.name}</small>

        <strong>{challenge.title}</strong>

        <ul>
          <li>
            <time dateTime={challenge.deadline}>
              {isClosed ? (
                <>
                  <HiCalendar />
                  {getFullDate(challenge.deadline, SHORT_DATE)}
                </>
              ) : (
                <>
                  <HiOutlineClock />
                  {getDaysRemaining(challenge.deadline)} restantes
                </>
              )}
            </time>
          </li>
          <li>
            <HiFire /> 8 participantes
          </li>
        </ul>

        <div className={styles.challenge__buttons}>
          <Link href={'/desafio/'.concat(challenge.id)}>
            <a className="button outline">
              {isClosed ? 'Detalhes' : 'Acessar desafio'}
            </a>
          </Link>

          {isClosed && (
            <Link href={`/desafio/${challenge.id}/resultado`}>
              <a
                className="button"
                aria-disabled={challenge.status.type === 'expired'}
              >
                Soluções
              </a>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
