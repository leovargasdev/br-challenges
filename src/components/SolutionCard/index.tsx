import { LEVELS } from 'utils/constants'
import { SolutionHeart } from './components/Header'
import { SolutionFooter } from './components/Footer'
import type { Solution, SolutionLevel } from 'types'

import styles from './styles.module.scss'

interface SolutionCardProps {
  solution: Solution
  isLike: boolean
  onLike: (solutionId: string, level: SolutionLevel) => void
}

export const SolutionCard = ({
  solution,
  onLike,
  isLike
}: SolutionCardProps) => {
  return (
    <li key={solution._id} className={styles.solution}>
      <span className={styles.level} data-type={solution.level}>
        {LEVELS[solution.level]}
      </span>

      <SolutionHeart {...solution} isLike={isLike} onLike={onLike} />

      <div className={styles.user__info}>
        <strong>{solution.user?.name}</strong>
        <p>{solution.user?.bio || '-'}</p>
      </div>

      <SolutionFooter {...solution} />
    </li>
  )
}
