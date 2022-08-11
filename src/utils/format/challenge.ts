import { isPast } from 'date-fns'
import { asHTML } from '@prismicio/helpers'
import { Challenge, ChallengePrismic, StatusChallenge } from 'types'

export const getStatusChallenge = (
  challenge: Challenge,
  userChallenges: string[]
): StatusChallenge => {
  if (challenge.finished) {
    return { type: 'finished', name: 'Finalizado' }
  }

  if (isPast(new Date(challenge.deadline))) {
    return { type: 'expired', name: 'Encerrado' }
  }

  if (userChallenges.includes(challenge.id)) {
    return { type: 'submitted', name: 'Em andamento' }
  }

  return { type: 'active', name: '' }
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
  author: challenge.data.author[0],
  status: {
    type: 'active',
    name: ''
  }
})

export const getChallengesInHome = (
  challenges: ChallengePrismic[] | any,
  userChallenges: string[]
): Challenge[] => {
  const challegesFormatted = challenges.map((challenge: ChallengePrismic) => {
    const challengeFormatted = formattedChallenge(challenge)
    return {
      ...challengeFormatted,
      status: getStatusChallenge(challengeFormatted, userChallenges)
    }
  })

  return challegesFormatted
}
