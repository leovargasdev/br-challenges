import { Types } from 'mongoose'
import { LEVELS } from 'utils/constants'

import { User } from './user'

export type SolutionLevel = keyof typeof LEVELS

export interface Solution {
  user_id: Types.ObjectId
  challenge_id: string
  repository_url: string
  url: string
  createdAt: string
  updatedAt: string
  level: SolutionLevel
  published: boolean
  best_rated: boolean

  user?: User
  linkedin_url?: string
}
