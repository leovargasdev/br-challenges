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
  authors: Author[]
  content: RichTextField
  prototype_url: string
  description: string
  status?: StatusChallenge
  status_prismic: TypeStatusChallenge
  participants?: number
}

export interface ChallengePrismic {
  uid: string
  data: {
    name: string
    content: any
    deadline: string
    image: ImageFieldImage
    prototype: FilledLinkToWebField
    status_prismic: TypeStatusChallenge
    slices: any[]
  }
}

export interface ChallengeMongo {
  participants: number
  challenge_id: string
}
