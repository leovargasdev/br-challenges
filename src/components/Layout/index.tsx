import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { User } from 'types/user'
import { Logo, WaveFooter } from 'components/SVG'
import { AvatarMenu } from 'components/AvatarMenu'

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
  user?: User
}

export const Layout = ({ children }: LayoutProps) => {
  const { data, status } = useSession()

  const user = data?.user as User

  return (
    <div className={styles.container}>
      {status === 'authenticated' && (
        <header className={styles.header}>
          <div className={styles.header__content}>
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>

            <AvatarMenu user={user} />
          </div>
        </header>
      )}

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <WaveFooter />

        <small>
          Desenvolvido por{' '}
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
