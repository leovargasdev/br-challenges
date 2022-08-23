import Link from 'next/link'
import Image from 'next/image'
import { GoOctoface } from 'react-icons/go'
import { useSession } from 'next-auth/react'
import { HiCalendar, HiLink } from 'react-icons/hi'
import { GetServerSideProps, NextPage } from 'next'

import { formattedChallenge, getFullDate } from 'utils/format'
import { ChallengeHeader } from 'components/Challenge'

import { Challenge } from 'types'
import { SHORT_DATE } from 'constants/date'
import { createClientPrismic } from 'service/prismic'

import styles from './styles.module.scss'

type LevelProps = 'hard' | 'medium' | 'easy'

interface SolutionProps {
  level: LevelProps
  date: string
}

const MOCK_SOLUTIONS: SolutionProps[] = [
  { level: 'hard', date: '2022-08-20' },
  { level: 'medium', date: '2022-08-20' },
  { level: 'medium', date: '2022-08-22' },
  { level: 'easy', date: '2022-08-21' },
  { level: 'medium', date: '2022-08-10' },
  { level: 'hard', date: '2022-08-15' },
  { level: 'medium', date: '2022-08-01' }
]

const LEVELS = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil'
}

const ChallengeResultsPage: NextPage<Challenge> = challenge => {
  const { data } = useSession()

  return (
    <>
      <ChallengeHeader {...challenge} />

      <div className={styles.container}>
        <h2>Listagem das soluções</h2>

        <ul>
          {MOCK_SOLUTIONS.map(solution => (
            <li
              key={solution.date}
              className={styles.solution}
              data-type={solution.level}
            >
              <span>
                {data?.user?.image && (
                  <div className={styles.user__avatar}>
                    <Image
                      src={data.user.image}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className={styles.user__info}>
                  <strong>{data?.user.name}</strong>
                  <p>Desenvolvedor frontend</p>
                </div>

                <div className={styles.solution__info}>
                  <span>{LEVELS[solution.level]}</span>
                  <time>
                    <HiCalendar />
                    {getFullDate(
                      new Date(solution.date).toISOString(),
                      SHORT_DATE
                    )}
                  </time>
                </div>
              </span>

              <div className={styles.solution__links}>
                <Link href="/">
                  <a className="button outline">
                    <GoOctoface />
                    Repositório
                  </a>
                </Link>
                <Link href="/">
                  <a className="button outline">
                    <HiLink />
                    Visualizar solução
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const challengeSlug = String(params?.slug)
  console.log(challengeSlug)
  const prismic = createClientPrismic({ req })

  const challenge = await prismic.getByUID<any>('challenges', challengeSlug)

  return {
    props: formattedChallenge(challenge)
  }
}

export default ChallengeResultsPage
