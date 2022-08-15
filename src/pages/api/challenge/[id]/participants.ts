import { NextApiResponse, NextApiRequest } from 'next'

import { connectMongoose, SolutionModel } from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const challenge_id = req.query.id

    await connectMongoose()

    const count = await SolutionModel.count({ challenge_id })
    return res.status(200).json({ count })
  } catch (err) {
    console.log(err)
  }

  return res.status(200).json({ count: 0 })
}
