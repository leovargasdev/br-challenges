import Image from 'next/image'
import { IconHeart } from 'components/SVG'
import { useSession } from 'next-auth/react'

import api from 'service/api'
import { useChallenge, useToast } from 'hooks'
import type { Solution, SolutionLevel } from 'types'

import styles from './styles.module.scss'

interface SolutionHeartProps extends Solution {
  isLike: boolean
  onLike: (solutionId: string, level: SolutionLevel) => void
}

export const SolutionHeart = ({
  onLike,
  isLike,
  ...solution
}: SolutionHeartProps) => {
  const toast = useToast()
  const { status } = useSession()
  const { status_prismic, id } = useChallenge()

  const isVoting = status_prismic === 'voting'
  const isFeatured = solution.status === 'featured'
  const enableLikesInSolution = isFeatured && isVoting
  const showLikes = isFeatured && status_prismic === 'finished'

  const handleChangeLike = async () => {
    if (status === 'authenticated' && isVoting) {
      const solution_id = solution._id

      const data = {
        solution_id,
        level: solution.level,
        challenge_id: id
      }

      await api.post('/like', data)
      onLike(isLike ? '' : solution_id, solution.level)

      return
    }

    toast.error('Ops! Tivemos um problema', {
      description: 'Você precisa estar autenticado!',
      duration: 5000
    })
  }

  return (
    <header className={styles.solution__header}>
      {solution.user?.image && (
        <div className={styles.user__image}>
          <Image src={solution.user.image} layout="fill" objectFit="cover" />
        </div>
      )}

      {showLikes && solution.likes > 0 && (
        <span className={styles.likes} aria-label="Quantidade de votos">
          <IconHeart variant="filled" />
          <p>
            {solution.likes} Like{solution.likes > 1 && 's'}
          </p>
        </span>
      )}

      {enableLikesInSolution && (
        <button type="button" onClick={handleChangeLike}>
          <IconHeart variant={isLike ? 'filled' : 'outlined'} />
          {isLike ? 'Deixar de gostar' : 'Gostar'}
        </button>
      )}
    </header>
  )
}
