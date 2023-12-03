import { Schema } from 'mongoose'

export const challengeSchema = new Schema(
  {
    challenge_id: {
      type: String,
      required: true,
      unique: true
    },
    participants: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
)
