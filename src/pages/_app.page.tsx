import type { AppProps } from 'next/app'
import { PrismicPreview } from '@prismicio/next'
import { SessionProvider } from 'next-auth/react'

// import { ToastProvider } from 'hooks'
import { Layout } from 'components'

import 'styles/globals.scss'
import { ToastProvider } from 'hooks'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
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

export default App
