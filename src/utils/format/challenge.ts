import { compareAsc, isPast, parseISO } from 'date-fns'
import {
  Challenge,
  ChallengePrismic,
  StatusChallenge,
  TypeStatusChallenge,
  ChallengeMongo,
  User
} from 'types'

interface GetStatusProps {
  id: string
  deadline: string
  userChallenges: string[]
  status_prismic: TypeStatusChallenge
}

export const isChallengeClosed = (type: TypeStatusChallenge): boolean => {
  return ['closed', 'finished', 'voting'].includes(type)
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

  if (status_prismic === 'voting') {
    return { type: 'voting', name: 'Em votação' }
  }

  if (isPast(new Date(deadline))) {
    return { type: 'closed', name: 'Encerrado' }
  }

  if (userChallenges.includes(id)) {
    return { type: 'submitted', name: 'Participando' }
  }

  return { type: 'active', name: '' }
}

export const formattedChallenge = (challenge: ChallengePrismic): Challenge => {
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
    authors,
    status_prismic: challenge.data.status_prismic
  }
}

interface Acumulator {
  after: Challenge[]
  before: Challenge[]
}

export const getListChallenges = (data: ChallengePrismic[]): Challenge[] => {
  // Ordenando
  data.sort((c1, c2) => {
    const d1 = parseISO(c1.data.deadline)
    const d2 = parseISO(c2.data.deadline)
    return compareAsc(d1, d2)
  })

  const initalReduce = { after: [], before: [] }

  const challenges = data.reduce((acc: Acumulator, item) => {
    const challenge = formattedChallenge(item)
    const typeOrder = challenge.status_prismic === 'active' ? 'before' : 'after'

    acc[typeOrder].push(challenge)

    return acc
  }, initalReduce)

  return [...challenges.before, ...challenges.after]
}

interface GetParticipants {
  challenges: Challenge[]
  participants: ChallengeMongo[]
  users: User[]
}

export const getParticipants = ({
  challenges,
  participants,
  users
}: GetParticipants) => {
  return challenges.map(challenge => {
    const usersPhotos = users.reduce((acc, user) => {
      if (acc.length <= 7) {
        if (user.challenges.includes(challenge.id) && user.image) {
          acc.push(user.image)
        }
      }

      return acc
    }, [] as string[])

    const participantsIndex = participants.findIndex(
      p => p.challenge_id === challenge.id
    )

    return {
      ...challenge,
      users: usersPhotos,
      participants: participants[participantsIndex]?.participants - 7 || 0
    }
  })
}
