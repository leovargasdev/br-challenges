import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { PrismicNextImage } from '@prismicio/next'

import { Challenge } from 'types'
import { SHORT_DATE } from 'utils/constants'
import {
  getDaysRemaining,
  getFullDate,
  getStatusChallenge,
  isChallengeClosed
} from 'utils/format'
import { IconPerson, IconCalendar, IconClock } from 'components/SVG'

import styles from './styles.module.scss'
import Image from 'next/image'

export const ChallengeCard = (challenge: Challenge) => {
  const { data } = useSession()

  const status = getStatusChallenge({
    ...challenge,
    userChallenges: data?.user.challenges || []
  })

  const isClosed = isChallengeClosed(status.type)

  return (
    <article className={styles.challenge}>
      <Link href={`/desafio/${challenge.id}`}>
        <a aria-label={`Link para a página do desafio ${challenge.name}`}>
          <div className={styles.challenge__image}>
            <PrismicNextImage
              field={challenge.image}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </a>
      </Link>

      <div className={styles.challenge__content}>
        <Link href={`/desafio/${challenge.id}`}>
          <a aria-label={`Link para a página do desafio ${challenge.name}`}>
            <h2>{challenge.name}</h2>
          </a>
        </Link>

        <div className={styles.challenge__info}>
          <strong aria-label="Nome do autor do protótipo do desafio">
            <IconPerson /> {challenge.authors[0].name}
          </strong>

          <time dateTime={challenge.deadline}>
            {isClosed ? (
              <>
                <IconCalendar />
                {getFullDate(challenge.deadline, SHORT_DATE)}
              </>
            ) : (
              <>
                <IconClock />
                {getDaysRemaining(challenge.deadline)} restantes
              </>
            )}
          </time>
        </div>

        {challenge?.users && (
          <div className={styles.challenge__participants}>
            <strong>
              <IconPerson />
              Partipantes
            </strong>

            <div className={styles.users}>
              {challenge.users.map((image, index) => (
                <figure
                  key={image}
                  style={{ transform: `translateX(-${index * 12}px)` }}
                >
                  <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                  />
                </figure>
              ))}

              <span>+ {challenge.participants}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.challenge__footer}>
        <Link href={`/desafio/${challenge.id}`}>
          <a className="button secondary">
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
    </article>
  )
}
