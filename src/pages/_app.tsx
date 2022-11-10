import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"/>
      </Head>

      <Component {...pageProps} />

      <style jsx global>{`
      body {
        font-family: 'Roboto Mono', monospace;
      }`}
      </style>
    </>
  )
}

export default MyApp
