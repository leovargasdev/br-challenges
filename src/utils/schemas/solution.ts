import { Solution } from 'types'
import { Schema } from 'mongoose'
import { LEVELS } from 'utils/constants'
import { UserModel } from 'service/mongoose'

const enumLevels = Object.keys(LEVELS)

export const solutionSchema = new Schema<Solution>(
  {
    user_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
      $exists: true
    },
    url: {
      type: String,
      required: true
    },
    challenge_id: {
      type: String,
      required: true
    },
    repository_url: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true,
      enum: enumLevels
    },
    linkedin_url: String,
    score: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    published: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

solutionSchema.pre('save', async function (next) {
  const userExist = await UserModel.exists({ _id: this.user_id })
  if (userExist) {
    next()
  } else {
    throw new Error('Usuario não existe')
  }
})
