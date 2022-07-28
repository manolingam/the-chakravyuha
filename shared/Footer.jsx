import { Flex, Link, Text, Image, Box } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex
      direction={{ base: 'column-reverse', md: 'row', lg: 'row' }}
      alignItems='flex-start'
      justifyContent='space-between'
      w='100%'
    >
      {/* <Link href='https://raidguild.org' isExternal zIndex={5}>
        <Box h='auto' w='150px' mb='1rem'>
          <Image src='/assets/logos/raidguild.webp' alt='built-by-raid-guild' />
        </Box>
      </Link> */}
      <Text
        mb='1rem'
        fontSize='sm'
        fontFamily='jetbrains'
        color='greyLight'
        mx='auto'
      >
        Vyugam - v0.0.1 by{' '}
        <Link
          href='https://twitter.com/saimano1996'
          isExternal
          textDecoration='underline'
        >
          Saimano
        </Link>
      </Text>
    </Flex>
  );
};
