import { Types } from 'mongoose'
import { LEVELS } from 'utils/constants'

export type SolutionLevel = keyof typeof LEVELS

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
