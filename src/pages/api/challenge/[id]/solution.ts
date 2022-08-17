import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'

import { connectMongoose, SolutionModel, UserModel } from 'service/mongoose'
import { zodSolutionSchema } from 'utils/zod'

// const bodySchema = zodSolutionSchema.extend({ challenge_id: z.string() })

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'POST': {
        const session = await getSession({ req })
        if (!session?.user) return res.status(401).send('Unauthorized')

        await connectMongoose()
        const user_id = session.user._id
        const challenges = session.user.challenges || []
        const challenge_id = req.query.id as string
        const solution = zodSolutionSchema.parse(req.body)

        const hasSolution = challenges.includes(challenge_id)

        if (hasSolution) {
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
        return res.status(201).json({ create: true })
      }
      default: {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json(error.flatten().fieldErrors)
    }
    return res.status(500).send('Internal Server Error')
  }
}
