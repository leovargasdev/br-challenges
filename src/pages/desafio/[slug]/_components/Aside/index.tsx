import Link from 'next/link'
import { RxCheck, RxPerson, RxPlus } from 'react-icons/rx'

import { SocialShare } from '../SocialShare'
import type { Challenge } from 'types/challenge'

import styles from './styles.module.scss'
import { ModalSolutionForm } from 'components/Modal'

export const Aside = (challenge: Challenge) => {
  const isParticipant = true

  return (
    <aside className={styles.container}>
      <SocialShare
        url={'https://www.brchallenges.com/desafio/' + challenge.id}
      />

      {isParticipant ? (
        <>
          <span className="button">
            <RxCheck size={14} />
            Participando
          </span>
          <ModalSolutionForm challengeId={challenge.id} />
        </>
      ) : (
        <button className="button" type="button">
          <RxPlus size={14} />
          Quero participar
        </button>
      )}

      <Link
        className="button secondary"
        href={`/desafio/${challenge.id}/participantes`}
      >
        <RxPerson size={14} />
        Ver participantes
      </Link>
    </aside>
  )
}
