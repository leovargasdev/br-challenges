import { PrismicNextImage } from '@prismicio/next'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Aside } from './_components/Aside'
import type { Challenge } from 'types/challenge'
import { ChallengeInfo } from './_components/ChallengeInfo'

import styles from './styles.module.scss'
import MOCK_CHALLENGE from 'mocks/challenge.json'

const ChallengePage: NextPage<Challenge> = challenge => (
  <>
    <picture className={styles.cover}>
      <PrismicNextImage field={challenge.image} />
    </picture>

    <div className={styles.container}>
      <ChallengeInfo {...challenge} />

      <Aside {...challenge} />
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
