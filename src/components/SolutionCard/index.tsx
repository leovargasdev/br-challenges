import { HiHeart } from 'react-icons/hi'
import { GoOctoface } from 'react-icons/go'
import { FaLinkedinIn } from 'react-icons/fa'

import type { Solution, SolutionLevel } from 'types'
import { LikeButton } from './LikeButton'
import { Participant } from './Participant'
import { LEVELS } from 'utils/constants'

import styles from './styles.module.scss'
import { useChallenge } from 'hook/useChallenge'

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
  const { status_prismic } = useChallenge()

  const isFeatured = solution.status === 'featured'
  const enableLikesInSolution = isFeatured && status_prismic === 'voting'
  const showLikes = isFeatured && status_prismic === 'finished'

  return (
    <li className={styles.solution}>
      <span className={styles.level} data-type={solution.level}>
        {LEVELS[solution.level]}
      </span>

      <div className={styles.solution__content}>
        <span>{solution._id}</span>
        {solution.user && <Participant {...solution.user} />}

        {enableLikesInSolution && (
          <LikeButton
            onLike={onLike}
            level={solution.level}
            solutionId={solution._id}
            isLike={isLike}
          />
        )}

        {showLikes && (
          <span className={styles.likes}>
            <HiHeart size={20} />
            {solution.likes}
          </span>
        )}
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
