import Link from 'next/link'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { FaGoogle } from 'react-icons/fa'
import { GoOctoface } from 'react-icons/go'
import { signIn, getSession } from 'next-auth/react'

import { SEO } from 'components/SEO'
import { Logo } from 'components/SVG'

import styles from './styles.module.scss'

const LoginPage = () => (
  <>
    <div className={styles.container}>
      <SEO
        tabName="Login"
        title="Entrar na plataforma"
        description="Aprimore as suas habilidades ao codificar os nossos desafios"
      />

      <Link href="/">
        <a
          className={styles.logo}
          aria-label="Link para a página inicial do brchallenges"
        >
          <Logo />
        </a>
      </Link>

      <figure className={styles.image}>
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          src="/banner-login.jpg"
        />
      </figure>

      <h1>Seja bem-vindo, faça o login para acessar a sua conta.</h1>

      <hr />

      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.github}
          onClick={() => signIn('github')}
        >
          <GoOctoface />
          Entrar com Github
        </button>

        <button
          type="button"
          className={styles.google}
          onClick={() => signIn('google')}
        >
          <FaGoogle />
          Entrar com Google
        </button>
      </div>
    </div>

    <footer className={styles.footer}>
      <p>
        Desenvolvido por{' '}
        <a
          href="https://www.leonardovargas.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Leonardo Vargas
        </a>
      </p>
    </footer>
  </>
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
