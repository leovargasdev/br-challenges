import { NextApiResponse, NextApiRequest } from 'next'

import { formattedChallenge } from 'utils/format'
import { createClientPrismic } from 'service/prismic'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const challenge_id = req.query.id as string

  try {
    const prismic = createClientPrismic({ req })

    const response = await prismic.getByUID<any>('challenges', challenge_id)
    const challenge = formattedChallenge(response)

    return res.status(200).json(challenge)
  } catch (err) {
    console.log(err)
  }

  return res.status(200).json({ error: true })
}
