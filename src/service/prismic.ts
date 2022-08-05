import * as prismicNext from '@prismicio/next'
import { createClient, getRepositoryName } from '@prismicio/client'

const prismicURL = process.env.PRISMIC_URL || ''

export const repositoryName = getRepositoryName(prismicURL)

interface CreateClientProps {
  req: any
}

export const prismic = ({ req }: CreateClientProps) => {
  const client = createClient(prismicURL, {
    accessToken: process.env.PRISMIC_TOKEN
  })

  prismicNext.enableAutoPreviews({ client, req })

  return client
}
