import { model, connect, models } from 'mongoose'
import {
  UserSchema,
  solutionSchema,
  challengeSchema,
  likeSchema
} from 'utils/schemas'

const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB = process.env.MONGODB_DB || ''

const urlMongo = MONGODB_URI + MONGODB_DB

const UserModel = models.User || model('User', UserSchema)

const SolutionModel = models.Solution || model('Solution', solutionSchema)

const ChallengeModel = models.Challenge || model('Challenge', challengeSchema)

const LikeModel = models.Like || model('Like', likeSchema)

async function connectMongoose() {
  await connect(urlMongo)
}

export { connectMongoose, UserModel, SolutionModel, ChallengeModel, LikeModel }
