import React from 'react';
import Head from 'next/head';
import GlobalStyle from 'src/styles/globalStyle';

// eslint-disable-next-line react/prop-types
const Layout = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>everyboard</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
    <GlobalStyle />
  </>
);

export default Layout;
