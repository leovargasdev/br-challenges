import Link from 'next/link'
import Image from 'next/image'
import { PrismicNextImage } from '@prismicio/next'

import type { Challenge } from 'types/challenge'

import styles from './styles.module.scss'
import {
  RxCalendar,
  RxPencil1,
  RxPencil2,
  RxPerson,
  RxReader
} from 'react-icons/rx'
import { formatDate } from 'utils/format'

export const ChallengeCard = (challenge: Challenge) => (
  <article className={styles.challenge}>
    {/* <Link
      href={`/desafio/${challenge.id}`}
      aria-label={`Link para a página do desafio ${challenge.name}`}
    </Link> */}

    <picture className={styles.challenge__image}>
      <PrismicNextImage field={challenge.image} />
    </picture>

    <div className={styles.challenge__info}>
      <h1>{challenge.name}</h1>

      <div className={styles.challenge__line}>
        <div className={styles.challenge__date}>
          <strong>
            <RxPencil1 size={16} />
            Design
          </strong>
          <p>{challenge.authors[0].name}</p>
        </div>
        <div className={styles.challenge__date}>
          <strong>
            <RxCalendar size={16} />
            Publicando em
          </strong>
          <time dateTime={challenge.deadline}>
            {formatDate(challenge.deadline, 'dd/MM/yyyy')}
          </time>
        </div>
      </div>

      <div className={styles.challenge__participants}>
        <strong>
          <RxPerson />
          Partipantes
        </strong>

        {challenge.users.length ? (
          <div className={styles.users}>
            {challenge.users.map((image, index) => (
              <picture
                key={image}
                className={styles.user__image}
                style={{ '--position': index } as never}
              >
                {/* <Image src={image} alt="imagem de avatar" loading="lazy" /> */}
              </picture>
            ))}

            {!!challenge.participants && (
              <span
                className={styles.participants__counter}
                style={{ '--position': challenge.users.length } as never}
              >
                + {challenge.participants}
              </span>
            )}
          </div>
        ) : (
          <p>Sem participantes no momento 🙁</p>
        )}
      </div>

      <div className={styles.links}>
        <Link
          className="button"
          href={`/desafio/${challenge.id}/participantes`}
        >
          <RxReader size={14} />
          Mais detalhes
        </Link>
        <Link
          className="button secondary"
          href={`/desafio/${challenge.id}/participantes`}
        >
          <RxPerson size={14} />
          Ver participantes
        </Link>
      </div>
    </div>
  </article>
)
