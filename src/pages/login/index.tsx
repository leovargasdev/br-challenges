import Link from 'next/link'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { GoOctoface } from 'react-icons/go'
import { FaGoogle } from 'react-icons/fa'
import { signIn, getSession } from 'next-auth/react'

import { SEO } from 'components/SEO'
import { Logo } from 'components/SVG'
import styles from './styles.module.scss'

const LoginPage = () => (
  <div className={styles.container}>
    <SEO
      tabName="Login"
      title="Entrar na plataforma"
      description="Aprimore as suas habilidades ao codificar os nossos desafios"
    />

    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>

    <div className={styles.image}>
      <Image src="/banner-login.jpg" layout="fill" objectFit="cover" />
    </div>

    <main className={styles.content}>
      <div className={styles.info}>
        <h1>Seja bem-vindo, faça o login para acessar a sua conta.</h1>

        <hr />

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.github}
            onClick={() => signIn('github')}
          >
            <GoOctoface />
            Github
          </button>

          <button
            type="button"
            className={styles.google}
            onClick={() => signIn('google')}
          >
            <FaGoogle />
            Google
          </button>
        </div>
      </div>
    </main>
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
