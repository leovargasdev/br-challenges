import type {
  ImageFieldImage,
  FilledLinkToWebField,
  RichTextField
} from '@prismicio/types'

import type { Author } from './author'

export type TypeStatusChallenge =
  | 'active'
  | 'submitted'
  | 'closed'
  | 'voting'
  | 'finished'

export interface StatusChallenge {
  name: string
  type: TypeStatusChallenge
}

export interface Challenge {
  id: string
  name: string
  image: ImageFieldImage
  deadline: string
  participate_url: string
  author: Author
  content: RichTextField
  prototype_url: string
  status: StatusChallenge
  status_prismic: TypeStatusChallenge
  participants?: number
  description?: string
}

export interface ChallengePrismic {
  uid: string
  data: {
    name: string
    content: any
    deadline: string
    image: ImageFieldImage
    prototype: FilledLinkToWebField
    author: Author[]
    status_prismic: TypeStatusChallenge
  }
}
