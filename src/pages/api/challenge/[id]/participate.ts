import { ZodError } from 'zod'
import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'

import { ChallengeModel, connectMongoose, UserModel } from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
    return
  }

  try {
    const session = await getSession({ req })

    if (!session?.user) {
      return res.status(401).send('Unauthorized')
    }

    const { _id: user_id, challenges } = session.user

    await connectMongoose()
    const challenge_id = req.query.id as string

    const isParticipate = challenges.includes(challenge_id)

    if (isParticipate) {
      return res.status(204)
    }

    await UserModel.updateOne(
      { _id: user_id },
      { $push: { challenges: challenge_id } }
    )

    await ChallengeModel.updateOne(
      { challenge_id },
      { $inc: { participants: 1 } }
    )

    return res.status(201).json({ updated: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json(error.flatten().fieldErrors)
    }

    return res.status(500).send('Internal Server Error')
  }
}
