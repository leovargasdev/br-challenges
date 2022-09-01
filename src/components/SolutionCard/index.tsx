import Image from 'next/image'
import { GoOctoface } from 'react-icons/go'
import { HiCalendar } from 'react-icons/hi'
import { FaLinkedinIn } from 'react-icons/fa'

import { Solution, SolutionLevel, User } from 'types'
import { getFullDate } from 'utils/format'
import { SHORT_DATE, LEVELS } from 'utils/constants'

import styles from './styles.module.scss'

interface SolutionCardProps {
  solution: any
  participant: any
}

const Participant = (participant: any) => (
  <div className={styles.participant}>
    {participant?.image && (
      <div className={styles.participant__avatar}>
        <Image src={participant.image} layout="fill" objectFit="cover" />
      </div>
    )}

    <div>
      <strong>{participant?.name}</strong>
      <p>{participant.bio}</p>
    </div>
  </div>
)

export const SolutionCard = ({ solution, participant }: SolutionCardProps) => (
  <li className={styles.solution} data-type={solution.level}>
    <div className={styles.solution__content}>
      <Participant {...participant} bio="Super dev" />

      <div className={styles.solution__info}>
        <span>{LEVELS[solution.level as SolutionLevel]}</span>
        <time dateTime={solution.createdAt}>
          <HiCalendar />
          {getFullDate(new Date(solution.createdAt).toISOString(), SHORT_DATE)}
        </time>
      </div>
    </div>

    <div className={styles.solution__links}>
      <a href="/">Acessar Solução</a>
      <a href="/" target="_blank" title="Link do repositório com a solução">
        <GoOctoface />
      </a>
      <a
        href="/"
        target="_blank"
        title="Link do post no linkedin sobre a solução"
      >
        <FaLinkedinIn />
      </a>
    </div>
  </li>
)
