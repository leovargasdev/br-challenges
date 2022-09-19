import { Types } from 'mongoose'
import { LEVELS } from 'utils/constants'

import { User } from './user'

export type SolutionLevel = keyof typeof LEVELS

export type SolutionStatus = 'published' | 'featured' | 'unpublish'
export interface Solution {
  _id: string
  user_id: Types.ObjectId
  challenge_id: string
  repository_url: string
  url: string
  createdAt: string
  updatedAt: string
  level: SolutionLevel
  published: boolean
  likes: number
  status: SolutionStatus

  user?: User
  linkedin_url?: string
}
