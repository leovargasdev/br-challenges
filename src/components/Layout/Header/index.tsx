import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Logo } from 'components/SVG'
import { AvatarMenu } from 'components/AvatarMenu'

import styles from './styles.module.scss'
import { useState } from 'react'

export const LayoutHeader = () => {
  const { status } = useSession()
  const [isMobileMenu, setisMobileMenu] = useState<boolean>(false)

  return (
    <header className={styles.header}>
      <nav className={styles.header__content}>
        <Link href="/">
          <a
            className={styles.header__logo}
            aria-label="Link para a página inicial do brchallenges"
          >
            <Logo />
          </a>
        </Link>

        <ul
          className={`${styles.header__navigation} ${
            isMobileMenu ? styles.active : ''
          }`}
        >
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

          <li className={styles.mobile}>
            <Link href="/login">
              <a className="button">Acessar conta</a>
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

        <button
          type="button"
          className={styles.button__toggle}
          aria-expanded={isMobileMenu}
          onClick={() => setisMobileMenu(state => !state)}
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
