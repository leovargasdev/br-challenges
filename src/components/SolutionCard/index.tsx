import Image from 'next/image'
import { GoOctoface } from 'react-icons/go'
import { FaLinkedinIn } from 'react-icons/fa'
import { HiCalendar, HiHeart, HiOutlineHeart } from 'react-icons/hi'

import api from 'service/api'
import { Solution, User } from 'types'
import { LEVELS } from 'utils/constants'

import styles from './styles.module.scss'
import { useChallenge } from 'hook/useChallenge'

const Participant = (participant: User) => (
  <div className={styles.participant}>
    {participant?.image && (
      <div className={styles.participant__avatar}>
        <Image src={participant.image} layout="fill" objectFit="cover" />
      </div>
    )}

    <div>
      <strong>{participant?.name}</strong>
      <p>{participant?.bio || 'Sem informação'}</p>
    </div>
  </div>
)

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
  const { status_prismic } = useChallenge()

  const isVoting = status_prismic === 'voting'

  const handleLikeSolution = async () => {
    if (solutionLike !== solution._id && isVoting) {
      const data = {
        solution_id: solution._id,
        challenge_id: solution.challenge_id
      }

      await api.post('/like', data)

      onLike(solution._id)
    }
  }

  return (
    <li className={styles.solution} data-type={solution.level}>
      <span className={styles.level}>{LEVELS[solution.level]}</span>

      <div className={styles.solution__content}>
        {solution.user && <Participant {...solution.user} />}

        <button
          type="button"
          onClick={handleLikeSolution}
          className={styles.button__like}
          aria-pressed={solutionLike === solution._id}
        >
          {solutionLike === solution._id ? (
            <HiHeart size={32} />
          ) : (
            <HiOutlineHeart size={32} />
          )}
        </button>
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
