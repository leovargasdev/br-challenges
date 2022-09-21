import Image from 'next/image'
import { User } from 'types'

import styles from './styles.module.scss'

export const Participant = (participant: User) => (
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
