import Image from 'next/image'
import { FaLinkedin } from 'react-icons/fa'
import { SvgDribbble } from 'components/SVG'

import styles from './styles.module.scss'

export const AuthorCard = () => (
  <div className={styles.author}>
    <div className={styles.author__image}>
      <Image
        src="https://media-exp1.licdn.com/dms/image/C4E03AQH7CMEzwVAJZQ/profile-displayphoto-shrink_200_200/0/1584096049473?e=1665014400&v=beta&t=-JzDIxK6IULccjX8-t9-UYqMAsKXajEYpMEwWRJr6U0"
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className={styles.author__info}>
      <small>Autor</small>
      <h3>Leonardo Vargas</h3>

      <p>Frontend | React | NextJs | Streamer | Criador de conteúdo</p>

      <hr />

      <ul className={styles.author__links}>
        <li>
          <a href="">
            <SvgDribbble />
            Dribble
          </a>
        </li>
        <li>
          <a href="">
            <FaLinkedin />
            Linkedin
          </a>
        </li>
      </ul>
    </div>
  </div>
)
