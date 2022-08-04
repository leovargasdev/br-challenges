import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import 'styles/globals.scss'
import { Layout } from 'components/Layout'

// const MOCK_USER = {
//   image: 'https://avatars.githubusercontent.com/u/11177716?v=4',
//   name: 'Leonardo Vargas',
//   email: 'teste124@!dfjasd.com'
// }

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
