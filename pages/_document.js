import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#1A73E8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <meta name="facebook-domain-verification" content="9l446kvu8nbmpown402vgez4uksb5i" />
        </Head>
        <body>
          <Main />
          <NextScript />
         
        </body>
      </Html>
    );
  }
}
