import { Types } from 'mongoose'
export interface User {
  _id: Types.ObjectId
  name: string
  email: string
  image?: string
  role: 'normal' | 'admin'
  username_discord?: string
  pix_key?: string
  challenges: string[]
}
