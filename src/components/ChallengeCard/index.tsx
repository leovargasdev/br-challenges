import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PrismicNextImage } from '@prismicio/next'
import { ImTrophy, ImBullhorn, ImTicket } from 'react-icons/im'
import { HiOutlineClock, HiFire, HiCalendar } from 'react-icons/hi'

import api from 'service/api'
import styles from './styles.module.scss'
import { SHORT_DATE } from 'constants/date'
import { Challenge, TypeStatusChallenge } from 'types'
import { getDaysRemaining, getFullDate } from 'utils/format/'

// interface IconStatus {
//   [key: TypeStatusChallenge]: React.ReactNode
// }

export const ChallengeCard = (challenge: Challenge) => {
  const [participants, setParticipants] = useState(0)
  const isClosed = ['finished', 'closed'].includes(challenge.status.type)

  const icons: any = {
    finished: <ImTrophy />,
    closed: <ImBullhorn />,
    submitted: <ImTicket />,
    active: ''
  }

  const getParticipants = async () => {
    const response = await api.get(`challenge/${challenge.id}/participants`)

    setParticipants(response.data.count)
  }

  useEffect(() => {
    getParticipants()
  }, [])

  return (
    <article className={`${styles.challenge} ${styles[challenge.status.type]}`}>
      {challenge.status.type !== 'active' && (
        <div
          className={styles.challenge__status}
          data-type={challenge.status.type}
        >
          <span>{icons[challenge.status.type]}</span>
          <strong>{challenge.status.name}</strong>
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
        <small title="Autor do protótipo">{challenge.author.name}</small>

        <h2>{challenge.title}</h2>

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
            <HiFire /> {participants} participantes
          </li>
        </ul>

        <div className={styles.challenge__buttons}>
          <Link href={`/desafio/${challenge.id}`}>
            <a className="button outline">
              {isClosed ? 'Detalhes' : 'Acessar desafio'}
            </a>
          </Link>

          {isClosed && (
            <Link href={`/desafio/${challenge.id}/resultado`}>
              <a
                className="button"
                aria-disabled={challenge.status.type === 'closed'}
              >
                Soluções
              </a>
            </Link>
          )}

          {challenge.status.type === 'submitted' && (
            <Link href={`/desafio/${challenge.id}/participar`}>
              <a className="button">Editar solução</a>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
