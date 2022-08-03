import { Schema, model, connect, models } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''
const MONGODB_DB = process.env.MONGODB_DB || ''

const urlMongo = MONGODB_URI + MONGODB_DB

interface IUser {
  name: string
  email: string
  avatar_url?: string
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar_url: String
})

const User = models.User || model('User', userSchema)

async function connectMongoose() {
  await connect(urlMongo)
}

export { connectMongoose, User }
