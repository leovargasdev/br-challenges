import { useRouter } from 'next/router'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'

import api from 'service/api'
import type { SolutionLevel } from 'types'
import { useChallenge } from 'hook/useChallenge'

import styles from './styles.module.scss'
import { useSession } from 'next-auth/react'
import { useToast } from 'contexts/Toast'

interface LikeButtonProps {
  solutionId: string
  isLike: boolean
  level: SolutionLevel
  onLike: (solutionId: string, level: SolutionLevel) => void
}

export const LikeButton = ({
  isLike,
  onLike,
  solutionId,
  level
}: LikeButtonProps) => {
  const toast = useToast()
  const router = useRouter()
  const { status } = useSession()
  const { status_prismic } = useChallenge()

  const isVoting = status_prismic === 'voting'

  const handleLikeSolution = async () => {
    if (status !== 'authenticated') {
      toast.error('Ops! Tivemos um problema', {
        description:
          'Você precisa estar autenticado na plataforma para efetuar essa ação.',
        duration: 5000
      })

      return
    }

    const slugChallenge = router.query.slug

    if (!isLike && isVoting) {
      const data = {
        level,
        solution_id: solutionId,
        challenge_id: slugChallenge
      }

      await api.post('/like', data)

      onLike(solutionId, level)
    }
  }

  return (
    <button
      type="button"
      onClick={handleLikeSolution}
      className={styles.button__like}
      aria-pressed={isLike}
      aria-label="Votar nessa solução"
    >
      {isLike ? <HiHeart size={32} /> : <HiOutlineHeart size={32} />}
    </button>
  )
}
