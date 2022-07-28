import Head from 'next/head';

export const Meta = () => {
  return (
    <>
      <Head>
        <title>Chakravyuha</title>
        <meta name='description' content='The moloch slayer of Raidguild.' />
        <meta property='og:title' content='The Chakravyuha' />
        <meta
          property='og:description'
          content='The moloch slayer of Raidguild.'
        />
        <meta property='og:image' content='/assets/logos/chakravyuga.webp' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='The Chakravyuha' />
        <meta
          name='twitter:description'
          content='The moloch slayer of Raidguild.'
        />
        <meta name='twitter:image' content='/assets/logos/chakravyuga.webp' />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
};
