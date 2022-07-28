import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Meta } from './Meta';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      <Meta />
      <Flex
        direction='column'
        minH='100vh'
        maxW='80rem'
        justifyContent='space-between'
        alignItems='center'
        mx='auto'
      >
        <Header />
        {windowWidth > 720 && children}
        {windowWidth < 720 && (
          <Text fontFamily='spaceMono' fontSize='lg'>
            Please use a larger screen!
          </Text>
        )}
        <Footer />
      </Flex>
    </>
  );
};
