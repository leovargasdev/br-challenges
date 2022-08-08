import type { AppProps } from 'next/app'
import { PrismicPreview } from '@prismicio/next'
import { SessionProvider } from 'next-auth/react'

import { Layout } from 'components/Layout'

import 'styles/globals.scss'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <PrismicPreview repositoryName="br-challenges">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PrismicPreview>
    </SessionProvider>
  )
}

export default MyApp
