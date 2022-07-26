import {
  Flex,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button
} from '@chakra-ui/react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useContext } from 'react';

import { AppContext } from '../context/AppContext';
import { useWallet } from '../hooks/useWallet';

const getAccountString = (account) => {
  const len = account.length;
  return `0x${account.substr(2, 3).toUpperCase()}...${account
    .substr(len - 3, len - 1)
    .toUpperCase()}`;
};

const StyledPrimaryButton = styled(Button)`
  min-width: 160px;
  height: 50px;
  text-transform: uppercase;
  color: black;
  border-radius: 2px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Header = () => {
  const context = useContext(AppContext);
  const { connectWallet, disconnect } = useWallet();

  return (
    <Flex
      h='100px'
      w='100%'
      alignItems='center'
      justifyContent='space-between'
      // bg='blackLight'
      px='2rem'
    >
      <Link href='/' passHref>
        <Flex alignItems='center' cursor='pointer'>
          <Image src='/assets/logos/chakravyuga.webp' alt='logo' w='50px' />
          <Text color='red' fontFamily='uncial' fontSize='1.5rem' ml='5px'>
            The Chakravyuha
          </Text>
        </Flex>
      </Link>

      {!context.signerAddress && (
        <StyledPrimaryButton
          bg='red'
          onClick={connectWallet}
          fontFamily='spaceMono'
        >
          CONNECT
        </StyledPrimaryButton>
      )}

      {context.signerAddress && (
        <Flex justify='center' align='center' zIndex={5} fontFamily='jetbrains'>
          <Popover placement='left'>
            <PopoverTrigger>
              <Button
                h='auto'
                fontWeight='normal'
                _hover={{ opacity: '0.8' }}
                p={{ base: 0, md: 3 }}
              >
                <Text px={2} display={{ base: 'none', md: 'flex' }} color='red'>
                  {getAccountString(context.signerAddress)}
                </Text>
              </Button>
            </PopoverTrigger>
            <PopoverContent bg='none' w='auto' border='none'>
              {context.member && (
                <Link href={`/members/${context.member._id}`} passHref>
                  <Button bg='red'>Profile</Button>
                </Link>
              )}
              <Button
                bg='red'
                onClick={() => {
                  disconnect();
                  window.location.reload();
                }}
                mt='5px'
              >
                Disconnect
              </Button>
            </PopoverContent>
          </Popover>
        </Flex>
      )}
    </Flex>
  );
};
