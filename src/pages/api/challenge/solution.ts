import { getSession } from 'next-auth/react'
import { NextApiResponse, NextApiRequest } from 'next'

import { connectMongoose, SolutionModel, UserModel } from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { challenge_id, ...solution } = req.body

    try {
      const session = await getSession({ req })

      await connectMongoose()

      if (session?.user) {
        const user_id = session.user._id
        const challenges = session.user?.challenges || []

        const isUpadateSolution = challenges.includes(challenge_id)

        if (isUpadateSolution) {
          await SolutionModel.updateOne({ user_id, challenge_id }, solution)
          return res.status(200).json({ update: true })
        }

        await UserModel.updateOne(
          { _id: user_id },
          { challenges: [...challenges, challenge_id] }
        )

        const newSolution = {
          user_id,
          challenge_id,
          ...solution
        }

        await SolutionModel.create(newSolution)
      }

      return res.status(200).json({ create: true })
    } catch (err) {
      console.log(err)
    }
  }

  res.setHeader('Allow', 'POST')
  res.status(405).end('Method not allowed')
}
