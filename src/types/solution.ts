import { Types } from 'mongoose'
import { CHALLENGE_LEVELS } from 'utils/constants'

export type SolutionLevel = typeof CHALLENGE_LEVELS[number]

export interface Solution {
  user_id: Types.ObjectId
  challenge_id: string
  repository_url: string
  solution_url: string
  linkedin_post: string
  createdAt: Date
  level: SolutionLevel
  score: number
}
