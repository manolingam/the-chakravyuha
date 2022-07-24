import { ChakraProvider } from '@chakra-ui/react';
import Router from 'next/router';
import nProgress from 'nprogress';

import AppContextProvider from '../context/AppContext';
import { theme } from '../styles/theme';
import { Layout } from '../shared/Layout';
import '../styles/globals.css';

import '../styles/nprogress.css';

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AppContextProvider>
  );
}

export default MyApp;
