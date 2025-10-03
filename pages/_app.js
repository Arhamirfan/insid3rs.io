import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/media.css";
import '../src/services/socket/socket'
import { useState, useEffect } from "react";
import Head from "next/head";
import { Toaster } from 'react-hot-toast';
import store from "../src/store/index";
import { Provider } from "react-redux";
import DisconnectModal from "../src/components/Modal/disconnectModal";
import Script from "next/script";
import Icon from "../public/assets/images/insidersAboutTopLogo.svg"
import { GoogleOAuthProvider } from "@react-oauth/google";

function MyApp({ Component, pageProps }) {

  let [online, isOnline] = useState(true);

  const setOnline = () => {
    console.log('We are online!');
    isOnline(true);
  };
  const setOffline = () => {
    console.log('We are offline!');
    isOnline(false);
  };
  useEffect(() => {
    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);

    // cleanup if we unmount
    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
    }
  }, []);
  return (
    <>
      <Head>
        <title>INSID3RS.IO</title>
        <link rel="icon" href={Icon.src} type="image/x-icon"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Toaster />
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <Component {...pageProps} />
          <DisconnectModal show={!online} onHide={() => setModalShow(false)} />
        </Provider>
      </GoogleOAuthProvider>

      {/* ************************************* */}
      <Script
        // strategy="lazyOnLoad"
        id="googleAnalyticsLink"
        src={`https://www.googletagmanager.com/gtag/js?id=G-Y1E6DHRLZH`}
      />
      <Script
        // strategy="lazyOnLoad"
        id="googleAnalyticsLink"
        src={`https://www.googletagmanager.com/gtag/js?id=G-Y1E6DHRLZH`}
      />
      <Script
        id="googleAnalytics"
      // strategy="lazyOnLoad"
      >
        {`
           window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', 'G-Y1E6DHRLZH');
          `}
      </Script>

      <Script
        id="googleTags"
      // strategy="lazyOnLoad"
      >
        {`
           (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
           new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
           })(window,document,'script','dataLayer','GTM-5JFMCJ3');
          `}
      </Script>

      {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5JFMCJ3"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> */}
    </>
  );
}


// <!-- Google tag (gtag.js) -->
// <script async src=""></script>
// <script>
//
// </script>

export default MyApp;
