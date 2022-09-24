import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { PrismicNextImage } from '@prismicio/next'
import { HiOutlineClock, HiFire, HiCalendar } from 'react-icons/hi'

import icons from './icons'
import { Challenge } from 'types'
import { SHORT_DATE } from 'utils/constants'
import {
  getDaysRemaining,
  getFullDate,
  getStatusChallenge,
  isChallengeClosed
} from 'utils/format'

import styles from './styles.module.scss'

export const ChallengeCard = (challenge: Challenge) => {
  const { data } = useSession()

  const status = getStatusChallenge({
    ...challenge,
    userChallenges: data?.user.challenges || []
  })

  const isClosed = isChallengeClosed(status.type)

  return (
    <article className={`${styles.challenge} ${styles[status.type]}`}>
      {status.type !== 'active' && (
        <div className={styles.challenge__status} data-type={status.type}>
          <span>{icons[status.type]}</span>
          <strong>{status.name}</strong>
        </div>
      )}

      <div className={styles.challenge__image}>
        <PrismicNextImage
          field={challenge.image}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={styles.challenge__content}>
        <small title="Autor do protótipo">{challenge.authors[0].name}</small>

        <h2>{challenge.name}</h2>

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
            <HiFire /> {challenge.participants} participantes
          </li>
        </ul>

        <div className={styles.challenge__buttons}>
          <Link href={`/desafio/${challenge.id}`}>
            <a className="button outline">
              {isClosed ? 'Detalhes' : 'Acessar desafio'}
            </a>
          </Link>

          {isClosed && (
            <Link href={`/desafio/${challenge.id}/participantes`}>
              <a className="button" aria-disabled={status.type === 'closed'}>
                Participantes
              </a>
            </Link>
          )}

          {status.type === 'submitted' && (
            <Link href={`/desafio/${challenge.id}/solucao`}>
              <a className="button">Minha solução</a>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
