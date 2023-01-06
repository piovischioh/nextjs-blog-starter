import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';

import Layout from '@/components/Layout';
import metadata from '@/configs/metadata';

import '@/styles/globals.css';
import '@/styles/prism.css';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    <DefaultSeo
      titleTemplate={`%s | ${metadata.title}`}
      defaultTitle={metadata.title}
      description={metadata.description}
      canonical={metadata.fqdn}
      openGraph={{
        title: metadata.title,
        description: metadata.description,
        url: metadata.fqdn,
        images: [
          {
            url: metadata.bannerUrl,
          },
        ],
        site_name: metadata.title,
        type: 'website',
      }}
      twitter={{
        handle: metadata.twitterID,
        site: metadata.twitterID,
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: metadata.logoPath,
        },
      ]}
    />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default App;
