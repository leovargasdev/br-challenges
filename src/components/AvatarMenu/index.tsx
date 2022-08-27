import Image from 'next/image'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { User } from 'types/user'

import styles from './styles.module.scss'
import { FaSignOutAlt, FaUser, FaUserAstronaut } from 'react-icons/fa'
import { signOut } from 'next-auth/react'

interface AvatarMenuProps {
  user: User
}

export const AvatarMenu = ({ user }: AvatarMenuProps) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger className={styles.user__avatar}>
      {user?.image ? (
        <Image src={user.image} layout="fill" objectFit="cover" />
      ) : (
        <span>
          <FaUserAstronaut />
        </span>
      )}
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal style={{ zIndex: 100 }}>
      <DropdownMenu.Content
        align="end"
        sideOffset={5}
        className={styles.content}
      >
        <DropdownMenu.Group>
          <DropdownMenu.Label>
            <strong>{user.name}</strong>
          </DropdownMenu.Label>
          <DropdownMenu.Label>
            <strong>{user.email}</strong>
          </DropdownMenu.Label>
        </DropdownMenu.Group>

        <DropdownMenu.DropdownMenuSeparator className={styles.separator} />

        <DropdownMenu.Item className={styles.item}>
          <span>
            <FaUser />
          </span>
          Perfil
        </DropdownMenu.Item>

        <DropdownMenu.Item className={styles.item} onClick={() => signOut()}>
          <span>
            <FaSignOutAlt />
          </span>
          Sair
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
)
