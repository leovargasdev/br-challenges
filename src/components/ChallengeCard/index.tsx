import Link from 'next/link'
import { useMemo } from 'react'
import { isPast } from 'date-fns'
import { useSession } from 'next-auth/react'
import { PrismicNextImage } from '@prismicio/next'
import { HiOutlineClock, HiFire, HiCalendar } from 'react-icons/hi'

import styles from './styles.module.scss'
import { SHORT_DATE } from 'constants/date'
import { Challenge, StatusChallenge } from 'types'
import { getDaysRemaining, getFullDate } from 'utils/format'

export const ChallengeCard = (challenge: Challenge) => {
  const { data } = useSession()

  // MOVER ESSE CÓDIGO NO EVENTO DE FORMATAR O DESAFIO
  const status: StatusChallenge = useMemo(() => {
    if (challenge.finished) {
      return { type: 'finished', name: 'Finalizado' }
    }

    if (isPast(new Date(challenge.deadline))) {
      return { type: 'expired', name: 'Encerrado' }
    }

    if (['recriando-o-site-de-jogos-da-blizzard'].includes(challenge.id)) {
      return { type: 'submitted', name: 'Em andamento' }
    }
    return { type: 'active', name: '' }
  }, [challenge, data])

  const isClosed = useMemo(
    () => ['finished', 'expired'].includes(status.type),
    [status]
  )

  return (
    <article className={`${styles.challenge} ${styles[status.type]}`}>
      {status.type !== 'active' && (
        <span className={styles.challenge__status} data-type={status.type}>
          {status.name}
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
              <a className="button" aria-disabled={status.type === 'expired'}>
                Soluções
              </a>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
