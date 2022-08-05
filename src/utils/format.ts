import { asHTML } from '@prismicio/helpers'
import { Challenge, ChallengePrismic } from 'types/challenge'

export const formattedChallange = (
  challenge: ChallengePrismic | any
): Challenge => ({
  id: challenge.uid,
  name: challenge.data.name,
  title: challenge.data.title,
  finished: challenge.data.finished,
  content: asHTML(challenge.data.content),
  deadline: challenge.data.deadline,
  image: challenge.data.image,
  prototype_url: challenge.data.prototype.url
})
