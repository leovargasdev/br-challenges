import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  tabName: string
  title: string
  description?: string
}

export const SEO = ({ tabName, title, description = '' }: SEOProps) => {
  const { asPath } = useRouter()

  return (
    <Head>
      <title>{tabName} • BRChallenges</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://brchallenges.com${asPath}`} />

      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  )
}
