import Link from 'next/link'
import Image from 'next/image'
import { HiOutlineClock, HiFire, HiBadgeCheck } from 'react-icons/hi'

import styles from './styles.module.scss'

interface ChallengeCardProps {
  isSubmited?: boolean
  challengeNumber: number
}

export const ChallengeCard = ({
  isSubmited = false,
  challengeNumber
}: ChallengeCardProps) => (
  <article className={styles.challenge}>
    {isSubmited && (
      <span>
        <HiBadgeCheck /> Participando
      </span>
    )}

    <div className={styles.challenge__image}>
      <Image src="/challenge-thumbs.png" layout="fill" objectFit="cover" />
    </div>

    <div className={styles.challenge__content}>
      <small>Desafio {challengeNumber}</small>
      <strong>Mount E Coast Photography</strong>

      <ul>
        <li>
          <HiOutlineClock /> 12 dias restantes
        </li>
        <li>
          <HiFire /> 8 participantes
        </li>
      </ul>

      <Link href="/desafio/01">
        <a>Acessar desafio</a>
      </Link>
    </div>
  </article>
)
