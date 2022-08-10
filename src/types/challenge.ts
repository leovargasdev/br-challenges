import { ImageFieldImage, FilledLinkToWebField } from '@prismicio/types'

import { Author } from './author'

export interface Challenge {
  id: string
  title: string
  image: ImageFieldImage
  finished: boolean
  deadline: string
  participate_url: string
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

type TypeStatusChallenge = 'submitted' | 'expired' | 'finished' | 'active'

export interface StatusChallenge {
  name: string
  type: TypeStatusChallenge
}
