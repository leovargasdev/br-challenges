import { getSession } from 'next-auth/react'
import { NextApiResponse, NextApiRequest } from 'next'

import { connectMongoose, SolutionModel } from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const solution = req.body

  if (req.method === 'POST') {
    try {
      const session = await getSession({ req })

      await connectMongoose()

      if (session?.user) {
        const user_id = session.user._id
        await SolutionModel.create({ ...solution, user_id })
      }

      return res.status(200).json({ create: true })
    } catch (err) {
      console.log(err)
    }
  }

  res.setHeader('Allow', 'POST')
  res.status(405).end('Method not allowed')
}
