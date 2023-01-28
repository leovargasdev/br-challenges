import type { NextApiResponse, NextApiRequest } from 'next'

import { Like, Solution } from 'types'
import { connectMongoose, LikeModel, SolutionModel } from 'service/mongoose'
import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
    return
  }

  try {
    const session = await getSession({ req })
    const user_id = session?.user._id
    const challenge_id = req.query.id as string

    await connectMongoose()

    const solutions: Solution[] = await SolutionModel.aggregate([
      { $match: { status: { $ne: 'unpublish' }, challenge_id } },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
          pipeline: [{ $project: { createdAt: 0, updatedAt: 0, _id: 0 } }]
        }
      },
      { $unwind: '$user' },
      { $project: { user_id: 0, createdAt: 0, updatedAt: 0 } },
      { $sort: { likes: -1 } }
    ])

    const userLikes = { easy: '', medium: '', hard: '' }

    if (user_id) {
      const isUserLikes: Like[] = await LikeModel.find({
        user_id,
        challenge_id
      })

      if (isUserLikes) {
        isUserLikes.forEach(like => {
          userLikes[like.level] = like.solution_id.toString()
        })
      }
    }

    return res.status(200).json({
      userLikes,
      solutions: solutions.map(s => ({ ...s, _id: String(s._id) }))
    })
  } catch (error) {
    console.log(error)
  }
  return res.status(500).send('Internal Server Error')
}
