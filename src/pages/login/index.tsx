import { GetServerSideProps } from 'next'
import { signIn, getSession } from 'next-auth/react'
import chroma from 'chroma-js'

import { SEO } from 'components/SEO'
import { GoogleIcon } from 'components/SVG/Google'
import { GitHubIcon } from 'components/SVG/GitHub'

import styles from './styles.module.scss'

const glowStart = '#6e56cf'
const glowEnd = '#d6409f'

const LoginPage = () => {
  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    button.style.setProperty('--x', `${x}px`)
    button.style.setProperty('--y', `${y}px`)

    button.style.setProperty(
      '--glow',
      chroma.mix(glowStart, glowEnd, x / rect.width).hex()
    )
  }

  return (
    <div className={styles.container}>
      <SEO
        tabName="Login"
        title="Entrar na plataforma"
        description="Aprimore as suas habilidades ao codificar os nossos desafios"
      />


      <main className={styles.main}>
        <h1>
          Eleve suas habilidades de Front-End com desafios e concorra à prêmios.
        </h1>
        <p>Faça login e comece agora.</p>

        <button
          className={styles.button}
          onClick={() => signIn('google')}
          onPointerMove={onPointerMove}
        >
          <GoogleIcon />
          <span>Entrar com Google</span>
        </button>
        <button
          className={styles.button}
          onClick={() => signIn('github')}
          onPointerMove={onPointerMove}
        >
          <GitHubIcon />
          <span>Entrar com GitHub</span>
        </button>
      </main>
    </div>
  )
}

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
