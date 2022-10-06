import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'

import { connectMongoose, LikeModel, SolutionModel } from 'service/mongoose'

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

    const { solution_id, challenge_id, level } = req.body
    const user_id = session.user._id

    await connectMongoose()

    const isLike = await LikeModel.findOneAndUpdate(
      { user_id, challenge_id, level },
      { solution_id }
    )

    if (!isLike) {
      await LikeModel.create({ user_id, challenge_id, solution_id, level })

      await SolutionModel.updateOne(
        { _id: solution_id },
        { $inc: { likes: 1 } }
      )
    } else {
      const newLike = solution_id
      const oldLike = isLike.solution_id.toString()

      if (oldLike !== newLike) {
        await SolutionModel.updateOne({ _id: oldLike }, { $inc: { likes: -1 } })
        await SolutionModel.updateOne({ _id: newLike }, { $inc: { likes: 1 } })
      }
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.log(err)

    return res.status(500).send('Internal Server Error')
  }
}
