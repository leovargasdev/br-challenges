import { Schema } from 'mongoose'

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
  challenge_id: {
    type: String,
    default: ''
  }
})
