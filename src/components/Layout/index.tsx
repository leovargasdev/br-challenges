import Image from 'next/image'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

import { User } from 'types/user'
import { Logo, WaveFooter } from 'components/SVG'

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
  user?: User
}

export const Layout = ({ children }: LayoutProps) => {
  const { data, status } = useSession()
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false)

  const user = data?.user as User

  return (
    <div className={styles.container}>
      {status === 'authenticated' && (
        <header className={styles.header}>
          <div className={styles.header__content}>
            <Logo />

            <div className={styles.user}>
              {user?.image && (
                <button
                  className={styles.user__avatar}
                  type="button"
                  onClick={() => setIsActiveMenu(state => !state)}
                >
                  <Image src={user?.image} layout="fill" objectFit="cover" />
                </button>
              )}

              {isActiveMenu && (
                <div className={styles.user__info}>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>

                  <hr />

                  <button
                    type="button"
                    onClick={() => signOut()}
                    className={styles.signOut}
                  >
                    SAIR
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <WaveFooter />

        <small>
          © 2022{' '}
          <a
            href="https://www.leonardovargas.dev/"
            target="_blank"
            rel="noreferrer"
          >
            Leonardo Vargas
          </a>
        </small>
      </footer>
    </div>
  )
}
