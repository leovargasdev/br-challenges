import { IconFigma, IconGitHub, IconInfo, IconYoutube } from 'components/SVG'

import { useChallenge } from 'hooks'
import styles from './styles.module.scss'

export const ChallengeNavigation = () => {
  const { prototype_url } = useChallenge()

  return (
    <aside className={styles.container}>
      <ul className={styles.content}>
        <li>
          <a href="#" target="_blank" rel="noreferrer">
            <IconGitHub /> Template do github
          </a>
        </li>
        <li>
          <a href={prototype_url} target="_blank" rel="noreferrer">
            <IconFigma /> Link do protótipo
          </a>
        </li>
        <li>
          <a href="#" target="_blank" rel="noreferrer">
            <IconYoutube /> Vídeo explicativo
          </a>
        </li>
        <li>
          <a href="/como-participar">
            <IconInfo />
            Como participar
          </a>
        </li>
      </ul>
    </aside>
  )
}
