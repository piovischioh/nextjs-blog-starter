import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@/styles/prism.css';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default App;
