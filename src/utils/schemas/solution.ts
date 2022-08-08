import { Schema } from 'mongoose'
import { UserModel } from 'service/mongoose'

import { Solution } from 'types'

export const solutionSchema = new Schema<Solution>(
  {
    repository_url: { type: String, required: true },
    challenge_id: { type: String, required: true },
    solution_url: { type: String, required: true },
    user_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
      $exists: true
    },
    linkedin_post: String,
    shared_url: String
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
