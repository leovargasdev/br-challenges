import Link from 'next/link'
import Image from 'next/image'
import { FaCalendar, FaUsers } from 'react-icons/fa'

import styles from './styles.module.scss'

export const ChallengeCard = () => (
  <article className={styles.challenge}>
    <div className={styles.challenge__image}>
      <Image src="/challenge-thumbs.png" layout="fill" objectFit="cover" />
    </div>

    <div className={styles.challenge__content}>
      <small>Desafio 01</small>
      <strong>Mount E Coast Photography</strong>

      <ul>
        <li>
          <FaCalendar /> 12 dias restantes
        </li>
        <li>
          <FaUsers /> 8 participantes
        </li>
      </ul>

      <Link href="/desafio/01">
        <a>Acessar desafio</a>
      </Link>
    </div>
  </article>
)
