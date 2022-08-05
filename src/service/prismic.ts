import * as prismicNext from '@prismicio/next'
import { createClient, getRepositoryName } from '@prismicio/client'

const prismicUrl = 'https://app-desafios.prismic.io/api/v2'

export const repositoryName = getRepositoryName(prismicUrl)

interface CreateClientProps {
  req: any
}

export const prismic = ({ req }: CreateClientProps) => {
  const client = createClient(prismicUrl, {
    accessToken:
      'MC5ZdXhQNEJBQUFDY0F4dnIt.77-977-977-977-9E3MDLe-_vT_vv73vv73vv71P77-977-977-977-9ZUfvv73vv73vv73vv71AVxfvv73vv71v77-977-9'
  })

  prismicNext.enableAutoPreviews({ client, req })

  return client
}
