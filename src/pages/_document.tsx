import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
