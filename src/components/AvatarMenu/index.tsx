import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FaSignOutAlt, FaUser, FaUserAstronaut } from 'react-icons/fa'

import styles from './styles.module.scss'
import { User } from 'types'

export const AvatarMenu = () => {
  const { data } = useSession()

  if (!data?.user) {
    return <></>
  }

  const user = data.user as User

  return (
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
          sideOffset={10}
          className={styles.content}
        >
          <DropdownMenu.Group>
            <DropdownMenu.Label>
              <strong>{user.name}</strong>
            </DropdownMenu.Label>
          </DropdownMenu.Group>

          <DropdownMenu.DropdownMenuSeparator className={styles.separator} />

          <DropdownMenu.Item>
            <Link href="/usuario/perfil">
              <a className={styles.item}>
                <span>
                  <FaUser />
                </span>
                Perfil
              </a>
            </Link>
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
}
