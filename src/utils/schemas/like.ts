import { Schema } from 'mongoose'
import { LEVELS } from 'utils/constants'

const enumLevels = Object.keys(LEVELS)

export const likeSchema = new Schema({
  user_id: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
    $exists: true
  },
  solution_id: {
    type: Schema.Types.ObjectId,
    ref: 'Solution',
    $exists: true
  },
  level: {
    type: String,
    required: true,
    enum: enumLevels
  },
  challenge_id: {
    type: String,
    default: ''
  }
})
