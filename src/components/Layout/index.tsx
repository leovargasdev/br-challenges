import Image from 'next/image'
import { signOut } from 'next-auth/react'

import { User } from 'types/user'

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
  user: User
}

export const Layout = ({ user, children }: LayoutProps) => (
  <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.user}>
          {user?.image && (
            <div className={styles.user__avatar}>
              <Image src={user?.image} layout="fill" objectFit="cover" />
            </div>
          )}

          <div className={styles.user__info}>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signOut()}
          className={styles.signOut}
        >
          SAIR
        </button>
      </div>
    </header>

    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#7f5af0"
          fillOpacity="1"
          d="M0,192L60,197.3C120,203,240,213,360,192C480,171,600,117,720,106.7C840,96,960,128,1080,144C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>

      <small>
        © 2022{' '}
        <a href="https://leonardovargas.dev" target="_blank" rel="noreferrer">
          Leonardo Vargas
        </a>
      </small>
    </footer>
  </div>
)
