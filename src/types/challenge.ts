export interface ChallengeSimple {
  id: string
  title: string
  image: {
    url: string
    alt: string
  }
  finished: boolean
  deadline: string
}

export interface Challenge extends ChallengeSimple {
  name: string
  content: string
  prototype_url: string
}
