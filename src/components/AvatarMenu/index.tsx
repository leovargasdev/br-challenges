import Image from 'next/image'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

import { User } from 'types/user'

import styles from './styles.module.scss'

interface AvatarMenuProps {
  user: User
}

export const AvatarMenu = ({ user }: AvatarMenuProps) => {
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false)

  const handleCloseMenu = () => {
    setTimeout(() => setIsActiveMenu(false), 300)
  }

  return (
    <div className={styles.user} onBlur={handleCloseMenu}>
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
  )
}
