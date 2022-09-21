/* eslint-disable @typescript-eslint/no-explicit-any */
import { asLink } from '@prismicio/helpers'
import { enableAutoPreviews } from '@prismicio/next'
import { createClient, getRepositoryName } from '@prismicio/client'

const prismicURL = process.env.PRISMIC_URL || ''
const accessToken = process.env.PRISMIC_TOKEN || ''

export const repositoryName = getRepositoryName(prismicURL)

interface PrismicConfg {
  req?: any
  previewData?: any
}

export const createClientPrismic = (config: PrismicConfg = {}) => {
  const client = createClient(prismicURL, { accessToken })

  enableAutoPreviews({ client, ...config })

  return client
}

export const collectionSlugs = async (
  baseUrl: string,
  collectionName: string
): Promise<string[]> => {
  try {
    const client = createClientPrismic()
    const itens = await client.getAllByType(collectionName)

    const slugs = itens.map(item =>
      asLink(item, () => `${baseUrl}/${item.uid}`)
    )

    return slugs as string[]
  } catch (err) {
    console.log(err)
  }

  return []
}
