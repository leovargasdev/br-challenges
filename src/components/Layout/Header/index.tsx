import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Logo } from 'components/SVG'
import { AvatarMenu } from 'components/AvatarMenu'

import styles from './styles.module.scss'

export const LayoutHeader = () => {
  const { status } = useSession()

  return (
    <nav className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/">
          <a
            className={styles.header__logo}
            aria-label="Link para a página inicial do brchallenges"
          >
            <Logo />
          </a>
        </Link>

        <ul className={styles.header__navigation}>
          <li>
            <Link href="/">
              <a>Página inicial</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Como participar</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Sobre</a>
            </Link>
          </li>
        </ul>

        {status === 'authenticated' ? (
          <AvatarMenu />
        ) : (
          <Link href="/login">
            <a className={'button '.concat(styles.header__signIn)}>
              Acessar conta
            </a>
          </Link>
        )}
      </div>
    </nav>
  )
}
