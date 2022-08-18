import type { NextApiRequest, NextApiResponse } from 'next'
import { parse } from 'node-html-parser'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query

  const response = await fetch(query.url as RequestInfo)
  const body = await response.text()
  const rootElement = parse(body)

  const metaTags = rootElement.getElementsByTagName('meta')

  const title = metaTags
    .filter(
      meta =>
        meta.attributes?.name?.toLowerCase() === 'twitter:title' ||
        meta.attributes?.property?.toLowerCase() === 'og:title'
    )
    .map(meta => meta.attributes.content)[0]

  const imgUrl = metaTags
    .filter(
      meta =>
        meta.attributes?.name?.toLowerCase() === 'twitter:image' ||
        meta.attributes?.property?.toLowerCase() === 'og:image'
    )
    .map(meta => meta.attributes.content)[0]

  return res.json({ title, imgUrl })
}
