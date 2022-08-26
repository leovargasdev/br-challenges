import Link from 'next/link'
import Image from 'next/image'
import { GoOctoface } from 'react-icons/go'
import { HiCalendar, HiLink } from 'react-icons/hi'

import { Solution, User } from 'types'
import { getFullDate } from 'utils/format'
import { SHORT_DATE } from 'constants/date'

import styles from './styles.module.scss'

type LevelProps = 'hard' | 'medium' | 'easy'

interface SolutionProps {
  level: LevelProps
  createdAt: string
}

interface SolutionCardProps {
  solution: SolutionProps
  participant: User | undefined
}

const LEVELS = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil'
}

export const SolutionCard = ({ solution, participant }: SolutionCardProps) => (
  <li className={styles.solution} data-type={solution.level}>
    <div className={styles.participant}>
      {participant?.image && (
        <div className={styles.participant__avatar}>
          <Image src={participant.image} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className={styles.participant__info}>
        <strong>{participant?.name}</strong>
        <p>Desenvolvedor frontend</p>
      </div>
    </div>

    <div className={styles.solution__info}>
      <span>{LEVELS[solution.level]}</span>
      <time>
        <HiCalendar />
        {getFullDate(new Date(solution.createdAt).toISOString(), SHORT_DATE)}
      </time>
    </div>

    <Link href="/">
      <a className="button outline">
        <GoOctoface />
        Repositório
      </a>
    </Link>
    <Link href="/">
      <a className="button outline">
        <HiLink />
        Visualizar solução
      </a>
    </Link>
  </li>
)
