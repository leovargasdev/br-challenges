import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

import styles from 'styles/home.module.scss'

const HomePage = () => {
  const { data } = useSession()

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.user}>
          {data?.user?.image && (
            <div className={styles.user__avatar}>
              <Image src={data?.user?.image} layout="fill" objectFit="cover" />
            </div>
          )}
          <div className={styles.user__info}>
            <strong>{data?.user?.name}</strong>
            <span>{data?.user?.email}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signOut()}
          className={styles.signOut}
        >
          SAIR
        </button>
      </header>

      <h1>tela inicial</h1>
    </div>
  )
}

export default HomePage
