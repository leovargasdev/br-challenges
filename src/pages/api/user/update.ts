import { ZodError } from 'zod'
import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'
import { connectMongoose, UserModel } from 'service/mongoose'

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

    await connectMongoose()

    await UserModel.updateOne({ _id: session.user._id }, { $set: req.body })

    return res.status(201).json({ update: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json(error.flatten().fieldErrors)
    }

    return res.status(500).send('Internal Server Error')
  }
}
