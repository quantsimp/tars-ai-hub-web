import Head from 'next/head';

const defaultMeta = {
  title: 'TARS AI Hub - Premier AI Model Aggregator for Web3',
  siteName: 'TARS AI Hub',
  description: 'TARS AI Hub - Premier AI Model Aggregator for Web3',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: 'https://tars.pro',
  type: 'website',
  robots: 'follow, index',
  /**
   * No need to be filled, will be populated with openGraph function
   * If you wish to use a normal image, just specify the path below
   */
  // image: 'https://tars.pro/images/large-og.png',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle ? `${props.templateTitle} | ${meta.siteName}` : meta.title;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content={meta.robots} />
        <meta content={meta.description} name='description' />
        {/* canonical vs og url gerekli */}

        {meta.date && (
          <>
            <meta property='article:published_time' content={meta.date} />
            <meta name='publish_date' property='og:publish_date' content={meta.date} />
            <meta name='author' property='article:author' content='Tars Protocol' />
          </>
        )}

        <meta name='msapplication-TileColor' content='#FF6200' />
        <meta name='theme-color' content='#FF6200' />
      </Head>
    </>
  );
}
