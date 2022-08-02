import { GetServerSideProps } from 'next'
import { GoOctoface } from 'react-icons/go'
import { signIn, getSession } from 'next-auth/react'

import styles from './styles.module.scss'

const LoginPage = () => (
  <div className={styles.container}>
    <button type="button" onClick={() => signIn()}>
      <GoOctoface />
      Login
    </button>
  </div>
)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session === null) {
    return { props: {} }
  }

  return {
    props: {},
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

export default LoginPage
