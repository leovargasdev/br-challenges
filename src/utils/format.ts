import ptBR from 'date-fns/locale/pt-BR'
import { asHTML } from '@prismicio/helpers'
import { format, formatDistanceStrict } from 'date-fns'

import { Challenge, ChallengePrismic } from 'types/challenge'

const dateFnsOptions = {
  locale: ptBR
}

export const formattedChallenge = (
  challenge: ChallengePrismic | any
): Challenge => ({
  id: challenge.uid,
  title: challenge.data.title,
  finished: challenge.data.finished,
  content: asHTML(challenge.data.content),
  deadline: challenge.data.deadline,
  image: challenge.data.image,
  prototype_url: challenge.data.prototype.url,
  participate_url: `/desafio/${challenge.uid}/participar`,
  author: challenge.data.author[0]
})

export const getFullDate = (value: string, formatString: string): string => {
  const date = new Date(value)

  return format(date, formatString, dateFnsOptions)
}

export const getDaysRemaining = (value: string): string => {
  const today = new Date()
  const dateTest = new Date(value)
  return formatDistanceStrict(today, dateTest, {
    unit: 'day',
    ...dateFnsOptions
  })
}
