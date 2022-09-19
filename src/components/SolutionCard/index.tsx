import Image from 'next/image'
import { GoOctoface } from 'react-icons/go'
import { HiCalendar, HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { FaLinkedinIn } from 'react-icons/fa'

import { Solution, User } from 'types'
import { LEVELS } from 'utils/constants'

import styles from './styles.module.scss'
import api from 'service/api'

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

interface SolutionCardProps extends Solution {
  solutionLike: string
  handleChangeLike: (v1: string, v2: string) => void
}

export const SolutionCard = ({
  solutionLike,
  handleChangeLike,
  ...solution
}: SolutionCardProps) => {
  const handleLikeSolution = async () => {
    if (solutionLike !== solution._id) {
      const data = {
        solution_id: solution._id,
        challenge_id: solution.challenge_id
      }

      await api.post('/like', data)

      handleChangeLike(solutionLike, solution._id)
    }
  }

  return (
    <li className={styles.solution} data-type={solution.level}>
      <button
        type="button"
        className={styles.button__link}
        onClick={handleLikeSolution}
        aria-pressed={solutionLike === solution._id}
      >
        {solutionLike === solution._id ? (
          <HiHeart size={18} />
        ) : (
          <HiOutlineHeart size={18} />
        )}
        {solution.likes}
      </button>
      <div className={styles.solution__content}>
        {solution.user && <Participant {...solution.user} />}

        {/* <div className={styles.solution__info}>
          <span>{LEVELS[solution.level]}</span>
          <time dateTime={solution.updatedAt}>
            <HiCalendar /> {solution.updatedAt}
          </time>
        </div> */}
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
