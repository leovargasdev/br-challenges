import { UserSchema, solutionSchema } from 'utils/schemas'
import { model, connect, models } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB = process.env.MONGODB_DB || ''

const urlMongo = MONGODB_URI + MONGODB_DB

const User = models.User || model('User', UserSchema)
const Solution = models.Solution || model('Solution', solutionSchema)

async function connectMongoose() {
  await connect(urlMongo)
}

export { connectMongoose, User, Solution }
