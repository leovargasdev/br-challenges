import { compareAsc, isPast, parseISO } from 'date-fns'
import {
  Challenge,
  ChallengePrismic,
  StatusChallenge,
  TypeStatusChallenge
} from 'types'

interface GetStatusProps {
  id: string
  deadline: string
  userChallenges: string[]
  status_prismic: TypeStatusChallenge
}

export const isChallengeClosed = (type: TypeStatusChallenge): boolean => {
  return ['closed', 'finished'].includes(type)
}

export const getStatusChallenge = ({
  id,
  deadline,
  userChallenges,
  status_prismic
}: GetStatusProps): StatusChallenge => {
  if (status_prismic === 'finished') {
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

  const authors = challenge.data.slices.map(slice => ({
    ...slice.primary,
    links: slice.items
  }))

  return {
    id: challenge.uid,
    name: challenge.data.name,
    content: challenge.data.content,
    description: challenge.data.content[0].text,
    deadline: challenge.data.deadline,
    image: challenge.data.image,
    prototype_url: challenge.data.prototype.url,
    participate_url: `/desafio/${challenge.uid}/solucao`,
    authors,
    status_prismic: challenge.data.status_prismic,
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
    const typeOrder = isChallengeClosed(challenge.status.type)
      ? 'after'
      : 'before'

    acc[typeOrder].push(challenge)

    return acc
  }, initalReduce)

  return [...challenges.before, ...challenges.after]
}

interface GetParticipants {
  challenges: Challenge[]
  participants: {
    challenge_id: string
    participants: number
  }[]
}

export const getParticipants = ({
  challenges,
  participants
}: GetParticipants) => {
  return challenges.map(challenge => ({
    ...challenge,
    participants:
      participants.find(p => p.challenge_id === challenge.id)?.participants || 0
  }))
}
