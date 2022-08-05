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
  content: string | null
  prototype_url: string
}

export interface ChallengePrismic {
  uid: string
  data: {
    name: string
    title: string
    finished: boolean
    content: any
    deadline: string
    image: {
      url: string
      alt: string
    }
    prototype: {
      url: string
    }
  }
}
