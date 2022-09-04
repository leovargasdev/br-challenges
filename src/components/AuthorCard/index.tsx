import { ImBehance2 } from 'react-icons/im'
import {
  FaLinkedin,
  FaFigma,
  FaDribbble,
  FaLink,
  FaInstagram
} from 'react-icons/fa'

import { PrismicNextImage } from '@prismicio/next'

import { Author } from 'types/author'

import styles from './styles.module.scss'

const icons = {
  linkedin: <FaLinkedin />,
  dribbble: <FaDribbble />,
  behance: <ImBehance2 />,
  figma: <FaFigma />,
  instagram: <FaInstagram />,
  site: <FaLink />
}

type TypeSocialMedia = keyof typeof icons

interface SocialMedia {
  url: string
  type: TypeSocialMedia
  icon: React.ReactNode
}

export const AuthorCard = (author: Author) => {
  const getTypeSocialMedia = (link: string): TypeSocialMedia => {
    if (link.includes('linkedin')) return 'linkedin'
    else if (link.includes('figma')) return 'figma'
    else if (link.includes('dribbble')) return 'dribbble'
    else if (link.includes('behance')) return 'behance'
    else if (link.includes('instagram')) return 'instagram'

    return 'site'
  }

  const medias: SocialMedia[] = author.links.split(',').map(url => {
    const type = getTypeSocialMedia(url)
    const icon = icons[type]

    return { url, type, icon }
  })
  return (
    <div className={styles.author}>
      <div className={styles.author__image}>
        <PrismicNextImage
          field={author.image}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={styles.author__info}>
        <small>Autor</small>
        <h3>{author.name}</h3>

        <p>{author.description}</p>

        <hr />

        <ul className={styles.author__links}>
          {medias.map(socialMedia => (
            <li key={socialMedia.type}>
              <a
                href={socialMedia.url}
                className="button"
                target="_blank"
                rel="noreferrer"
              >
                {socialMedia.icon}
                {socialMedia.type}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
