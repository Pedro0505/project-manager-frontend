/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import '../styles/app.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
