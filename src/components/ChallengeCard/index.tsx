import Link from 'next/link'
import Image from 'next/image'
import ptBR from 'date-fns/locale/pt-BR'
import { formatDistanceStrict } from 'date-fns'
import { HiOutlineClock, HiFire, HiBadgeCheck } from 'react-icons/hi'

import styles from './styles.module.scss'
import { ChallengeSimple } from 'types/challenge'

interface ChallengeCardProps extends ChallengeSimple {
  isSubmited?: boolean
  challengeNumber: number
}

export const ChallengeCard = (challenge: ChallengeCardProps) => {
  const daysRemaining = formatDistanceStrict(
    new Date(),
    new Date(challenge.deadline),
    { unit: 'day', locale: ptBR }
  )

  return (
    <article className={styles.challenge}>
      {challenge.isSubmited && (
        <span>
          <HiBadgeCheck /> Participando
        </span>
      )}

      <div className={styles.challenge__image}>
        <Image src={challenge.image.url} layout="fill" objectFit="cover" />
      </div>

      <div className={styles.challenge__content}>
        <small>Desafio {challenge.challengeNumber}</small>
        <strong>{challenge.title}</strong>

        <ul>
          <li>
            <HiOutlineClock />
            {daysRemaining} restantes
          </li>
          <li>
            <HiFire /> 8 participantes
          </li>
        </ul>

        <Link href={'/desafio/'.concat(challenge.id)}>
          <a>Acessar desafio</a>
        </Link>
      </div>
    </article>
  )
}
