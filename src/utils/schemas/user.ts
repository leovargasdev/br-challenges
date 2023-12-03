import { User } from 'types'
import { Schema } from 'mongoose'

export const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    bio: {
      type: String,
      default: ''
    },
    image: String,
    role: {
      type: String,
      required: true,
      default: 'participant'
    },
    challenges: {
      required: true,
      type: [String],
      default: []
    },
    solutions_like: {
      required: true,
      type: [Schema.Types.ObjectId],
      default: []
    }
  },
  {
    timestamps: true
  }
)
