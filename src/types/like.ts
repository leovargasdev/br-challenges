import { Types } from 'mongoose'
import { SolutionLevel } from './solution'

export interface Like {
  level: SolutionLevel
  solution_id: Types.ObjectId
  user_id: Types.ObjectId
}
