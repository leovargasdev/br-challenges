import { useRouter } from 'next/router'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'

import api from 'service/api'
import { useChallenge } from 'hook/useChallenge'

import styles from './styles.module.scss'

interface LikeButtonProps {
  solutionId: string
  solutionLike: string
  onLike: (solutionId: string) => void
}

export const LikeButton = ({
  solutionLike,
  onLike,
  solutionId
}: LikeButtonProps) => {
  const router = useRouter()
  const { status_prismic } = useChallenge()

  const isVoting = status_prismic === 'voting'

  const handleLikeSolution = async () => {
    const slugChallenge = router.query.slug

    if (solutionLike !== solutionId && isVoting) {
      const data = {
        solution_id: solutionId,
        challenge_id: slugChallenge
      }

      await api.post('/like', data)

      onLike(solutionId)
    }
  }

  return (
    <button
      type="button"
      onClick={handleLikeSolution}
      className={styles.button__like}
      aria-pressed={solutionLike === solutionId}
    >
      {solutionLike === solutionId ? (
        <HiHeart size={32} />
      ) : (
        <HiOutlineHeart size={32} />
      )}
    </button>
  )
}
