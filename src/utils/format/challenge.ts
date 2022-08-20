import { compareAsc, isPast, parseISO } from 'date-fns'
import {
  Challenge,
  ChallengePrismic,
  StatusChallenge,
  TypeStatusChallenge
} from 'types'

interface GetStatusProps {
  id: string
  finished: boolean
  deadline: string
  userChallenges: string[]
}

export const isClosed = (type: TypeStatusChallenge): boolean => {
  return ['closed', 'finished'].includes(type)
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
  challenge: ChallengePrismic,
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
    content: challenge.data.content,
    deadline: challenge.data.deadline,
    image: challenge.data.image,
    prototype_url: challenge.data.prototype.url,
    participate_url: `/desafio/${challenge.uid}/participar`,
    author: challenge.data.author[0],
    status
  }
}

interface Acumulator {
  after: Challenge[]
  before: Challenge[]
}

export const getListChallenges = (
  data: ChallengePrismic[],
  userChallenges: string[]
): Challenge[] => {
  // Ordenando
  data.sort((c1, c2) => {
    const d1 = parseISO(c1.data.deadline)
    const d2 = parseISO(c2.data.deadline)
    return compareAsc(d1, d2)
  })

  const initalReduce = { after: [], before: [] }

  const challenges = data.reduce((acc: Acumulator, item) => {
    const challenge = formattedChallenge(item, userChallenges)
    const typeOrder = isClosed(challenge.status.type) ? 'after' : 'before'

    acc[typeOrder].push(challenge)

    return acc
  }, initalReduce)

  return [...challenges.before, ...challenges.after]
}

interface GetParticipants {
  challenges: Challenge[]
  participants: {
    _id: string
    count: number
  }[]
}

export const getParticipants = ({
  challenges,
  participants
}: GetParticipants) => {
  return challenges.map(challenge => ({
    ...challenge,
    participants:
      participants.find(({ _id }) => _id === challenge.id)?.count || 0
  }))
}
