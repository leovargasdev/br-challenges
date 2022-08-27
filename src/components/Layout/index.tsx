import { useRouter } from 'next/router'

import { LayoutHeader } from './Header'
import { LayoutFooter } from './Footer'

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter()

  if (asPath === '/login') {
    return children
  }

  return (
    <div className={styles.layout}>
      <LayoutHeader />

      <main className={styles.main}>{children}</main>

      <LayoutFooter />
    </div>
  )
}
