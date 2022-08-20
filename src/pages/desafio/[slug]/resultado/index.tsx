import Link from 'next/link'
import Image from 'next/image'
import { NextPage } from 'next'
import { GoOctoface } from 'react-icons/go'
import { useSession } from 'next-auth/react'
import { HiCalendar, HiLink } from 'react-icons/hi'

import { getFullDate } from 'utils/format'
import { SHORT_DATE } from 'constants/date'

import styles from './styles.module.scss'

type LevelProps = 'hard' | 'medium' | 'easy'

interface SolutionProps {
  level: LevelProps
  date: string
}

const MOCK_SOLUTIONS: SolutionProps[] = [
  { level: 'hard', date: '2022-20-08' },
  { level: 'medium', date: '2022-20-08' },
  { level: 'medium', date: '2022-22-08' },
  { level: 'easy', date: '2022-21-08' },
  { level: 'medium', date: '2022-10-08' },
  { level: 'hard', date: '2022-15-08' },
  { level: 'medium', date: '2022-01-08' }
]

const LEVELS = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil'
}

const ChallengeResultsPage: NextPage = () => {
  const { data } = useSession()

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__image}>
          <Image src="/thumb-challenge.jpeg" layout="fill" objectFit="cover" />
        </div>

        <h3>Erik Rodrigues</h3>
        <h1>Recriando o site de jogos da Blizzard</h1>
      </header>

      <div className={styles.content}>
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
                    {getFullDate(new Date().toISOString(), SHORT_DATE)}
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
                    Visualizar Solução
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ChallengeResultsPage
