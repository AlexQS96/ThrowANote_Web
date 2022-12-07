import { Html, Head, Main, NextScript } from 'next/document'

const PaperHoles = () => {  

  return (
    <div data-paper-holes>
      <span/>
      <span/>
      <span/>
    </div>
  )
}

export default function Document() {

  return (
    <Html lang='es'>
      <Head>
        <link rel='shortcut icon' href='favicon.ico'></link>
      </Head>
      <body data-paper-lines>
        <PaperHoles/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}