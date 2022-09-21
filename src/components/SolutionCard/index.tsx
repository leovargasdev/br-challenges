import { GoOctoface } from 'react-icons/go'
import { FaLinkedinIn } from 'react-icons/fa'

import { Solution } from 'types'
import { LikeButton } from './LikeButton'
import { Participant } from './Participant'
import { LEVELS } from 'utils/constants'

import styles from './styles.module.scss'

interface SolutionCardProps {
  solution: Solution
  solutionLike: string
  onLike: (solutionId: string) => void
}

export const SolutionCard = ({
  solution,
  onLike,
  solutionLike
}: SolutionCardProps) => {
  return (
    <li className={styles.solution}>
      <span className={styles.level} data-type={solution.level}>
        {LEVELS[solution.level]}
      </span>

      <div className={styles.solution__content}>
        {solution.user && <Participant {...solution.user} />}

        <LikeButton
          onLike={onLike}
          solutionId={solution._id}
          solutionLike={solutionLike}
        />
      </div>

      <div className={styles.solution__links}>
        <a href={solution.url}>Acessar Solução</a>
        <a
          target="_blank"
          rel="noreferrer"
          href={solution.repository_url}
          title="Link do repositório com a solução"
        >
          <GoOctoface />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={solution.linkedin_url}
          aria-disabled={!solution.linkedin_url}
          title="Link do post no linkedin sobre a solução"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </li>
  )
}
