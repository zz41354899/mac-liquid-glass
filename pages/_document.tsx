import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 移除 CDN 引用 */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 