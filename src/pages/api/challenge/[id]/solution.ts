import { ZodError } from 'zod'
import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'

import { zodSolutionSchema } from 'utils/zod'
import { connectMongoose, SolutionModel, UserModel } from 'service/mongoose'

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
    const solution = zodSolutionSchema.parse(req.body)

    const isUpdateSolution = challenges.includes(challenge_id)

    if (isUpdateSolution) {
      await SolutionModel.updateOne({ user_id, challenge_id }, solution)

      return res.status(200).json({ updated: true })
    }

    await UserModel.updateOne(
      { _id: user_id },
      { $push: { challenges: challenge_id } }
    )

    await SolutionModel.create({
      user_id,
      challenge_id,
      ...solution
    })

    return res.status(201).json({ created: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json(error.flatten().fieldErrors)
    }

    return res.status(500).send('Internal Server Error')
  }
}
