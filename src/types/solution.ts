import { CHALLENGE_LEVELS } from 'constants/index'
import { Types } from 'mongoose'

export interface Solution {
  user_id: Types.ObjectId
  challenge_id: string
  repository_url: string
  solution_url: string
  linkedin_post: string
  shared_url: string
  createdAt: Date
  level: typeof CHALLENGE_LEVELS[number]
}
