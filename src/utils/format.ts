import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { asHTML } from '@prismicio/helpers'

import { Challenge, ChallengePrismic } from 'types/challenge'

const dateFnsOptions = {
  locale: ptBR
}

export const formattedChallenge = (
  challenge: ChallengePrismic | any
): Challenge => ({
  id: challenge.uid,
  name: challenge.data.name,
  title: challenge.data.title,
  finished: challenge.data.finished,
  content: asHTML(challenge.data.content),
  deadline: challenge.data.deadline,
  image: challenge.data.image,
  prototype_url: challenge.data.prototype.url,
  participate_url: `/desafio/${challenge.uid}/participar`
})

export const getFullDate = (value: string): string => {
  const date = new Date(value)
  return format(date, "dd' de 'MMMM' de 'yyyy", dateFnsOptions)
}
