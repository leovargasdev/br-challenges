import Script from 'next/script'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link rel="icon" href="/favicon.ico" />

          <meta charSet="utf-8" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:site_name" content="BR Challenges" />
          <meta name="author" content="Leonardo Luis de Vargas" />
          <meta
            name="keywords"
            content="Frontend, desenvolvimento, programador, desafios de programação, portal de desafios, desafios, desafio para programar, programação, brasil, desafios em português, br, ptbr, desenvolvimento de software"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;900&family=Poppins:wght@500;600;700&display=swap"
            rel="stylesheet"
          />

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-TECCBMJVQH"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-TECCBMJVQH');
            `}
          </Script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
