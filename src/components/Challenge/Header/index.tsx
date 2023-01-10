import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { PrismicNextImage } from '@prismicio/next'

import api from 'service/api'
import { useChallenge } from 'hooks'
import { ModalSolutionForm } from 'components/Modal'
import { IconCheck, IconPerson, IconPlus } from 'components/SVG'

import styles from './styles.module.scss'

export const ChallengeHeader = () => {
  const router = useRouter()

  const { status, data } = useSession()
  const { image, id, status_prismic } = useChallenge()

  const [isParticipant, setIsParticipant] = useState<boolean>(false)

  const isVisibleParticipants =
    status_prismic !== 'active' || data?.user.role === 'admin'

  const toParticipateChallenge = async () => {
    if (status !== 'authenticated') {
      router.push('/login')
    }

    if (!isParticipant) {
      await api.post(`/challenge/${id}/participate`)
      setIsParticipant(true)
    }
  }

  useEffect(() => {
    if (data?.user && data.user.challenges.includes(id)) {
      setIsParticipant(true)
    }
  }, [data?.user, router.pathname])

  return (
    <header className={styles.header}>
      <div>
        <div className={styles.header__image}>
          <PrismicNextImage
            field={image}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        </div>

        <div className={styles.header__actions}>
          {isParticipant && <ModalSolutionForm />}

          {isParticipant ? (
            <span className={'button '.concat(styles.button__participant)}>
              <IconCheck /> Participando
            </span>
          ) : (
            <button
              type="button"
              onClick={toParticipateChallenge}
              className={'button '.concat(styles.button__participate)}
            >
              <IconPlus />
              Quero participar
            </button>
          )}

          {isVisibleParticipants && (
            <Link href="/">
              <a className="button secondary">
                <IconPerson />
                Ver participantes
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
