import Link from 'next/link'
import { useRouter } from 'next/router'
import { PrismicNextImage } from '@prismicio/next'
import { HiCheck, HiDocumentText, HiPlus, HiUserGroup } from 'react-icons/hi'

import { Challenge } from 'types'

import styles from './styles.module.scss'
import { useSession } from 'next-auth/react'
import api from 'service/api'

interface ChallengeHeaderProps extends Challenge {
  isSmall?: boolean
}

export const ChallengeHeader = ({
  isSmall = false,
  ...challenge
}: ChallengeHeaderProps) => {
  const router = useRouter()
  const { status } = useSession()

  const challengeSlug = router.query?.slug
  const isResultsPage = router.asPath.includes(`${challengeSlug}/participantes`)

  const toParticipateChallenge = async () => {
    if (status === 'authenticated') {
      await api.post(`/challenge/${challenge.id}/participate`)
    } else {
      router.push('/login')
    }
  }

  return (
    <header className={styles.header} data-size={isSmall ? 'small' : 'default'}>
      <div className={styles.header__image}>
        <PrismicNextImage
          field={challenge.image}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h3>{challenge.authors[0].name}</h3>

      <h1>
        <Link href={'/desafio/'.concat(challenge.id)}>
          <a>{challenge.name}</a>
        </Link>
      </h1>

      <div className={styles.header__links}>
        <Link href={`/desafio/${challengeSlug}`}>
          <a className="button outline" aria-hidden={isResultsPage}>
            <HiDocumentText />
            Detalhes
          </a>
        </Link>

        <div>
          <button
            type="button"
            className="button outline"
            onClick={toParticipateChallenge}
          >
            <HiPlus />
            Participar
          </button>

          {/* <button type="button" className="button">
            <HiCheck />
            Participando
          </button> */}

          {/* {challenge.status.type === 'finished' && ( */}
          <Link href={`/desafio/${challengeSlug}/participantes`}>
            <a className="button outline" aria-hidden={!isResultsPage}>
              <HiUserGroup />
              Ver participantes
            </a>
          </Link>
          {/* )} */}
        </div>
      </div>
    </header>
  )
}
