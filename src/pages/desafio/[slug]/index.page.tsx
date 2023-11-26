import Link from 'next/link'
import { RxPerson, RxPlus } from 'react-icons/rx'
import { PrismicNextImage } from '@prismicio/next'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import type { Challenge } from 'types/challenge'
import MOCK_CHALLENGE from 'mocks/challenge.json'
import { SocialShare } from './_components/SocialShare'
import { ChallengeInfo } from './_components/ChallengeInfo'

import styles from './styles.module.scss'

const ChallengePage: NextPage<Challenge> = challenge => (
  <>
    <picture className={styles.cover}>
      <PrismicNextImage field={challenge.image} />
    </picture>

    <div className={styles.container}>
      <ChallengeInfo {...challenge} />

      <aside>
        <SocialShare
          url={'https://www.brchallenges.com/desafio/' + challenge.id}
        />

        <button className="button" type="button">
          <RxPlus size={14} />
          Quero participar
        </button>

        <Link
          className="button secondary"
          href={`/desafio/${challenge.id}/participantes`}
        >
          <RxPerson size={14} />
          Ver participantes
        </Link>
      </aside>
    </div>
  </>
)

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async props => {
  if (process.env.VERCEL_ENV !== 'production') {
    return { props: MOCK_CHALLENGE, revalidate: false }
  }

  return {
    props: { aaa: 'teste' },
    revalidate: 69
  }
}

export default ChallengePage
