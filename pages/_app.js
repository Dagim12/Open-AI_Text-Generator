import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <link rel='stylesheet' href='../styles/global.css' /> */}
        <link rel='icon' href='../public/favicon.ico' />
        <title>Open AI - Text Generator</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
