import { ImageFieldImage, FilledLinkToWebField } from '@prismicio/types'

import { Author } from './author'

export interface ChallengeSimple {
  id: string
  title: string
  image: ImageFieldImage
  finished: boolean
  deadline: string
  participate_url: string
}

export interface Challenge extends ChallengeSimple {
  author: Author
  content: string | null
  prototype_url: string
}

export interface ChallengePrismic {
  uid: string | null
  data: {
    name: string
    title: string
    finished: boolean
    content: any
    deadline: string
    image: ImageFieldImage
    prototype: FilledLinkToWebField
    author: Author
  }
}
