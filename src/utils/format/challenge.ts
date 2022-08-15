import { isPast } from 'date-fns'
import { asHTML } from '@prismicio/helpers'
import { Challenge, ChallengePrismic, StatusChallenge } from 'types'

interface GetStatusProps {
  id: string
  finished: boolean
  deadline: string
  userChallenges: string[]
}

const getStatusChallenge = ({
  id,
  finished,
  deadline,
  userChallenges
}: GetStatusProps): StatusChallenge => {
  if (finished) {
    return { type: 'finished', name: 'Finalizado' }
  }

  if (isPast(new Date(deadline))) {
    return { type: 'closed', name: 'Encerrado' }
  }

  if (userChallenges.includes(id)) {
    return { type: 'submitted', name: 'Participando' }
  }

  return { type: 'active', name: '' }
}

export const formattedChallenge = (
  challenge: ChallengePrismic | any,
  userChallenges: string[] = []
): Challenge => {
  const status = getStatusChallenge({
    ...challenge.data,
    userChallenges,
    id: challenge.uid
  })

  return {
    id: challenge.uid,
    title: challenge.data.title,
    finished: challenge.data.finished,
    content: asHTML(challenge.data.content),
    deadline: challenge.data.deadline,
    image: challenge.data.image,
    prototype_url: challenge.data.prototype.url,
    participate_url: `/desafio/${challenge.uid}/participar`,
    author: challenge.data.author[0],
    status,
    participants: 0
  }
}
