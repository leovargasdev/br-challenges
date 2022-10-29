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

    const user_id = session.user._id

    await connectMongoose()
    const challenge_id = req.query.id as string
    const solution = zodSolutionSchema.parse(req.body)

    // console.log({ ...solution, challenge_id })

    const isSolution = await SolutionModel.findOneAndUpdate(
      { user_id, challenge_id },
      solution
    )

    // Primeiro envio
    if (!isSolution) {
      await SolutionModel.create({
        user_id,
        challenge_id,
        ...solution
      })
    }

    return res.status(200).json({ type: isSolution ? 'update' : 'create' })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json(error.flatten().fieldErrors)
    }

    return res.status(500).send('Internal Server Error')
  }
}
