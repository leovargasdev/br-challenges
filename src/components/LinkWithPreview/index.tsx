import { useState, useEffect } from 'react'
import type { RTLinkNode } from '@prismicio/types'

import styles from './styles.module.scss'

interface LinkWithPreviewProps {
  node: RTLinkNode
  children: JSX.Element[]
}

export const LinkWithPreview = ({ node, children }: LinkWithPreviewProps) => {
  const [title, setTitle] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [mount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, [])

  useEffect(() => {
    async function getMeta() {
      const response = await fetch(`/api/meta?url=${node.data.url}`)
      const data = await response.json()
      setTitle(data.title)
      setImgUrl(data.imgUrl)
    }
    getMeta()
  }, [])

  return mount ? (
    <div
      className={styles.container}
      onMouseMove={event => {
        const el = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - el.left
        const y = event.clientY - el.top
        event.currentTarget.style.setProperty('--x', `${x}px`)
        event.currentTarget.style.setProperty('--y', `${y}px`)
      }}
    >
      <a className={styles.link} href={node.data.url}>
        {children[0]}
      </a>
      {Boolean(imgUrl) && (
        <div className={styles.preview__container}>
          <img src={imgUrl} className={styles.preview__image} loading="lazy" />
          <span className={styles.preview__title}>{title}</span>
        </div>
      )}
    </div>
  ) : null
}
