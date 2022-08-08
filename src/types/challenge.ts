import { ImageFieldImage, FilledLinkToWebField } from '@prismicio/types'

export interface ChallengeSimple {
  id: string
  title: string
  image: ImageFieldImage
  finished: boolean
  deadline: string
  participate_url: string
}

export interface Challenge extends ChallengeSimple {
  name: string
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
  }
}
