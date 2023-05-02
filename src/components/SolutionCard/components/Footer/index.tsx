import { IconGitHub, IconLinkedin } from 'components/SVG'
import type { Solution } from 'types'

import styles from './styles.module.scss'

export const SolutionFooter = (solution: Solution) => (
  <footer className={styles.solution__footer}>
    <a
      className={`${styles.link} ${styles.preview}`}
      href={solution.url}
      target="_blank"
      rel="noreferrer"
    >
      Acessar solução
    </a>

    <a
      className={`${styles.link} ${styles.social}`}
      href={solution.repository_url}
      target="_blank"
      rel="noreferrer"
    >
      <IconGitHub />
    </a>

    <a
      className={`${styles.link} ${styles.social}`}
      href={solution.linkedin_url}
      target="_blank"
      rel="noreferrer"
      aria-disabled={solution.linkedin_url === ''}
    >
      <IconLinkedin />
    </a>
  </footer>
)
