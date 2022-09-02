import Image from 'next/image'
import { GoOctoface } from 'react-icons/go'
import { HiCalendar } from 'react-icons/hi'
import { FaLinkedinIn } from 'react-icons/fa'

import { Solution, User } from 'types'
import { LEVELS } from 'utils/constants'

import styles from './styles.module.scss'

const Participant = (participant: User) => (
  <div className={styles.participant}>
    {participant?.image && (
      <div className={styles.participant__avatar}>
        <Image src={participant.image} layout="fill" objectFit="cover" />
      </div>
    )}

    <div>
      <strong>{participant?.name}</strong>
      <p>{participant?.bio || '-'}</p>
    </div>
  </div>
)

export const SolutionCard = (solution: Solution) => (
  <li className={styles.solution} data-type={solution.level}>
    <div className={styles.solution__content}>
      {solution.user && <Participant {...solution.user} />}

      <div className={styles.solution__info}>
        <span>{LEVELS[solution.level]}</span>
        <time dateTime={solution.updatedAt}>
          <HiCalendar /> {solution.updatedAt}
        </time>
      </div>
    </div>

    <div className={styles.solution__links}>
      <a href={solution.url}>Acessar Solução</a>
      <a
        href={solution.repository_url}
        target="_blank"
        title="Link do repositório com a solução"
        rel="noreferrer"
      >
        <GoOctoface />
      </a>
      <a
        href={solution.linkedin_url}
        target="_blank"
        title="Link do post no linkedin sobre a solução"
        rel="noreferrer"
        aria-disabled={!solution.linkedin_url}
      >
        <FaLinkedinIn />
      </a>
    </div>
  </li>
)
