import type { AppProps } from 'next/app'
import { PrismicPreview } from '@prismicio/next'
import { SessionProvider } from 'next-auth/react'

import { Layout } from 'components/Layout'

import 'styles/globals.scss'
import { ToastProvider } from 'contexts/Toast'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <PrismicPreview repositoryName="br-challenges">
        <ToastProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastProvider>
      </PrismicPreview>
    </SessionProvider>
  )
}

export default MyApp
