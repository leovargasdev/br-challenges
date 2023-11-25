import Link from 'next/link'
import { useState } from 'react'
import classNames from 'classnames'
import { useSession, signOut } from 'next-auth/react'

import { Logo } from 'components/SVG'
import { AvatarMenu } from 'components/AvatarMenu'

import styles from './styles.module.scss'

export const LayoutHeader = () => {
  const { status } = useSession()
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false)

  const handleSignOut = () => {
    signOut()
    setIsMobileMenu(false)
  }

  return (
    <header className={styles.header}>
      <nav className={styles.header__content}>
        <Link
          href="/"
          className={styles.header__logo}
          aria-label="Link para a página inicial do brchallenges"
        >
          <Logo />
        </Link>

        <ul
          className={classNames(
            styles.header__navigation,
            isMobileMenu && styles.active
          )}
        >
          <li>
            <Link href="/">Página inicial</Link>
          </li>
          <li>
            <Link href="/sobre">Sobre</Link>
          </li>

          {status === 'authenticated' ? (
            <li className={styles.mobile}>
              <button className="button" onClick={handleSignOut}>
                Sair
              </button>
            </li>
          ) : (
            <li className={styles.mobile}>
              <Link href="/login" className="button">
                Acessar conta
              </Link>
            </li>
          )}
        </ul>

        {status === 'authenticated' ? (
          <AvatarMenu />
        ) : (
          <Link
            href="/login"
            className={'button '.concat(styles.header__signIn)}
          >
            Acessar conta
          </Link>
        )}

        <button
          type="button"
          className={styles.button__toggle}
          aria-expanded={isMobileMenu}
          onClick={() => setIsMobileMenu(state => !state)}
          aria-label="Botão para abrir/fechar o menu mobile"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}
