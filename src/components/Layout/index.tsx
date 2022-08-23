import { LayoutHeader } from './Header'
import { LayoutFooter } from './Footer'

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <LayoutHeader />

      <main className={styles.main}>{children}</main>

      <LayoutFooter />
    </div>
  )
}
