import Head from 'next/head';

export const Meta = () => {
  return (
    <>
      <Head>
        <title>The Chakravyuha</title>
        <meta name='description' content='The moloch slayer of Raidguild.' />
        <meta property='og:title' content='The Chakravyuha' />
        <meta
          property='og:description'
          content='The moloch slayer of Raidguild.'
        />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
};
