import { WaveFooter } from 'components/SVG'

import styles from './styles.module.scss'

export const LayoutFooter = () => (
  <footer className={styles.footer}>
    <WaveFooter />

    <small className={styles.footer__text}>
      Desenvolvido por{' '}
      <a
        href="https://www.leonardovargas.dev/"
        target="_blank"
        rel="noreferrer"
      >
        Leonardo Vargas
      </a>
    </small>
  </footer>
)
