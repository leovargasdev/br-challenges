import type { AppProps } from 'next/app'
import { PrismicPreview } from '@prismicio/next'
import { SessionProvider } from 'next-auth/react'

// import { ToastProvider } from 'hooks'
import { Layout } from 'components'

import 'styles/globals.scss'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <PrismicPreview repositoryName="br-challenges">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PrismicPreview>
  </SessionProvider>
)

export default App
