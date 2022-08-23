import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { User } from 'types'
import { Logo } from 'components/SVG'
import { AvatarMenu } from 'components/AvatarMenu'

import styles from './styles.module.scss'

export const LayoutHeader = () => {
  const { data, status } = useSession()

  if (status !== 'authenticated') {
    return <></>
  }

  const user = data?.user as User

  return (
    <nav className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/">
          <a className={styles.header__logo}>
            <Logo />
          </a>
        </Link>

        <AvatarMenu user={user} />
      </div>
    </nav>
  )
}
