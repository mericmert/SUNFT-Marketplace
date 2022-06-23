import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
          <link href="/dist/output.css" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src="../node_modules/tw-elements/dist/js/index.min.js"></Script>
        <Script src="../node_modules/flowbite/dist/flowbite.js"></Script>
      </body>
    </Html>
  )
}
