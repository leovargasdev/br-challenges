import { useRouter } from 'next/router'

import { LayoutHeader } from './Header'
import { LayoutFooter } from './Footer'

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter()

  return (
    <div className={styles.layout}>
      {asPath !== '/login' && <LayoutHeader />}

      <main className={styles.main}>{children}</main>

      {asPath !== '/login' && <LayoutFooter />}
    </div>
  )
}
