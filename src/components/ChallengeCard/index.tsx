import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'

import type { Challenge } from 'types/challenge'

import styles from './styles.module.scss'
import { RxCalendar, RxPerson, RxReader } from 'react-icons/rx'
import { formatDate } from 'utils/format'

export const ChallengeCard = (challenge: Challenge) => (
  <article className={styles.challenge}>
    {/* <Link
      href={`/desafio/${challenge.id}`}
      aria-label={`Link para a página do desafio ${challenge.name}`}
    </Link> */}

    <picture className={styles.challenge__image}>
      <PrismicNextImage field={challenge.image} />
    </picture>

    <div className={styles.challenge__info}>
      <div className={styles.challenge__date}>
        <RxCalendar size={16} />
        <time dateTime={challenge.deadline}>
          {formatDate(challenge.deadline, 'dd/MM/yyyy')}
        </time>
      </div>

      <strong>{challenge.name}</strong>

      <div className={styles.links}>
        <Link
          className="button"
          href={`/desafio/${challenge.id}/participantes`}
        >
          <RxReader size={14} />
          Mais detalhes
        </Link>
        <Link
          className="button secondary"
          href={`/desafio/${challenge.id}/participantes`}
        >
          <RxPerson size={14} />
          Ver participantes
        </Link>
      </div>
    </div>
  </article>
)
