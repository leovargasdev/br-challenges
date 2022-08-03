import Image from 'next/image'
import { GetServerSideProps, NextPage } from 'next'
import { signOut, getSession } from 'next-auth/react'

import styles from 'styles/home.module.scss'

interface UserProps {
  name: string
  email: string
  image?: string
}

const HomePage: NextPage<UserProps> = user => (
  <div className={styles.container}>
    <header className={styles.header}>
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
    </header>

    <h1>tela inicial</h1>
  </div>
)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session === null) {
    return {
      props: {},
      redirect: {
        destination: '/login'
      }
    }
  }

  const user = session?.user || {}

  return { props: user }
}

export default HomePage
