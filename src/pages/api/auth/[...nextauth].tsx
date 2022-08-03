import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { User, connectMongoose } from 'service/mongoose'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    })
  ],
  callbacks: {
    async signIn({ user }) {
      await connectMongoose()
      await User.findOneAndUpdate(user, { upsert: true })

      return true
    }
  }
})
